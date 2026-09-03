'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BOOK_SENTENCES, TEASER_SENTENCES } from './book-data';

type ReadingLine = {
  id: string;
  text: string;
  section: 'teaser' | 'book';
  number: number;
};

function splitIntoBeats(text: string, maximumGlyphs = 26) {
  const words = text.trim().split(/\s+/);
  const beats: string[] = [];
  let remaining = words;

  while (remaining.join('').length > maximumGlyphs && remaining.length > 1) {
    const totalGlyphs = remaining.join('').length;
    const remainingBeatCount = Math.ceil(totalGlyphs / maximumGlyphs);
    const targetGlyphs = Math.ceil(totalGlyphs / remainingBeatCount);
    let bestIndex = 1;
    let bestScore = Number.POSITIVE_INFINITY;

    for (let index = 1; index < remaining.length; index += 1) {
      const candidateWords = remaining.slice(0, index);
      const candidateLength = candidateWords.join('').length;
      if (candidateLength > maximumGlyphs) break;
      const lastWord = candidateWords[candidateWords.length - 1].replace(/[,.!?]$/, '');
      const connectiveEnding = /(며|고|지만|는데|자|면서|다가|도록|더니|라며|하며)$/.test(lastWord);
      const score = Math.abs(candidateLength - targetGlyphs) - (connectiveEnding ? 4 : 0);
      if (score < bestScore) {
        bestIndex = index;
        bestScore = score;
      }
    }

    beats.push(remaining.slice(0, bestIndex).join(' '));
    remaining = remaining.slice(bestIndex);
  }

  beats.push(remaining.join(' '));
  return beats;
}

export default function Home() {
  const lines = useMemo<ReadingLine[]>(
    () => {
      const bookBeats = BOOK_SENTENCES.flatMap((text) => splitIntoBeats(text));
      return [
        ...TEASER_SENTENCES.map((text, index) => ({ id: `teaser-${index}`, text, section: 'teaser' as const, number: index + 1 })),
        ...bookBeats.map((text, index) => ({ id: `book-${index}`, text, section: 'book' as const, number: index + 1 })),
      ];
    },
    [],
  );

  const bookBeatCount = lines.length - TEASER_SENTENCES.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<'plain' | 'bubble'>('plain');
  const [phoneScale, setPhoneScale] = useState(1);
  const phoneRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wheelDelta = useRef(0);
  const wheelTriggered = useRef(false);
  const wheelResetTimer = useRef<number | null>(null);
  const gesture = useRef<{ x: number; y: number; moved: boolean } | null>(null);
  const suppressTap = useRef(false);

  useEffect(() => {
    const fitPhone = () => {
      const sideGap = window.innerWidth <= 520 ? 12 : 32;
      const verticalGap = window.innerWidth <= 520 ? 12 : 78;
      setPhoneScale(Math.min(
        1,
        Math.max(0.1, (window.innerWidth - sideGap) / 390),
        Math.max(0.1, (window.innerHeight - verticalGap) / 844),
      ));
    };

    fitPhone();
    window.addEventListener('resize', fitPhone);
    return () => window.removeEventListener('resize', fitPhone);
  }, []);

  const move = useCallback(
    (amount: number) => {
      setActiveIndex((current) => Math.max(0, Math.min(lines.length - 1, current + amount)));
    },
    [lines.length],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const rail = railRef.current;
      const target = lineRefs.current[activeIndex];
      if (!rail || !target) return;
      const centeredTop = target.offsetTop - rail.clientHeight / 2 + target.clientHeight / 2;
      rail.scrollTo({ top: centeredTop, behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, mode]);

  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      wheelDelta.current += event.deltaY;

      if (wheelResetTimer.current !== null) window.clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = window.setTimeout(() => {
        wheelDelta.current = 0;
        wheelTriggered.current = false;
        wheelResetTimer.current = null;
      }, 220);

      if (wheelTriggered.current || Math.abs(wheelDelta.current) < 80) return;
      wheelTriggered.current = true;
      move(wheelDelta.current > 0 ? 1 : -1);
    };

    phone.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      phone.removeEventListener('wheel', onWheel);
      if (wheelResetTimer.current !== null) window.clearTimeout(wheelResetTimer.current);
    };
  }, [move]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        move(1);
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        move(-1);
      }
      if (event.key === 'ArrowLeft') setMode('plain');
      if (event.key === 'ArrowRight') setMode('bubble');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [move]);

  const finishGesture = (x: number, y: number) => {
    if (!gesture.current) return;
    const dx = gesture.current.x - x;
    const dy = gesture.current.y - y;
    const horizontalSwipe = Math.abs(dx) > 30 && Math.abs(dx) > Math.abs(dy) * 1.15;
    const verticalSwipe = Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx) * 1.15;

    if (horizontalSwipe) setMode(dx > 0 ? 'bubble' : 'plain');
    else if (verticalSwipe) move(dy > 0 ? 1 : -1);

    if (horizontalSwipe || verticalSwipe || gesture.current.moved) {
      suppressTap.current = true;
      window.requestAnimationFrame(() => {
        suppressTap.current = false;
      });
    }
    gesture.current = null;
  };

  return (
    <main className="prototype-stage">
      <div className="phone-viewport" style={{ width: 390 * phoneScale, height: 844 * phoneScale }}>
        <section
          ref={phoneRef}
          className={`phone phone--${mode}`}
          style={{ transform: `scale(${phoneScale})` }}
          aria-label={`북북 ${mode === 'plain' ? '일반' : '말풍선'} 읽기 화면`}
          tabIndex={0}
          onPointerDown={(event) => {
            gesture.current = { x: event.clientX, y: event.clientY, moved: false };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!gesture.current) return;
            const dx = Math.abs(event.clientX - gesture.current.x);
            const dy = Math.abs(event.clientY - gesture.current.y);
            if (Math.max(dx, dy) > 8) gesture.current.moved = true;
          }}
          onPointerUp={(event) => {
            finishGesture(event.clientX, event.clientY);
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={() => {
            gesture.current = null;
          }}
        >
          <span className="speaker" aria-hidden="true" />
          <div className="phone-screen">
            <div className="sentence-rail" ref={railRef} aria-live="polite">
              {lines.map((line, index) => {
                const isActive = index === activeIndex;
                const counter = line.section === 'teaser' ? `${line.number}/3` : `${line.number}/${bookBeatCount}`;
                const glyphCount = line.text.replace(/\s/g, '').length;
                const fitClass = glyphCount > 42
                  ? 'reading-line--fit-tight'
                  : glyphCount > 29
                    ? 'reading-line--fit-medium'
                    : 'reading-line--fit-short';
                return (
                  <div
                    key={line.id}
                    ref={(node) => { lineRefs.current[index] = node; }}
                    className={`reading-line ${fitClass} ${isActive ? 'reading-line--active' : ''}`}
                    aria-current={isActive ? 'step' : undefined}
                    onClick={() => {
                      if (suppressTap.current) return;
                      setActiveIndex(index);
                    }}
                  >
                    {isActive && <span className="counter">{counter}</span>}
                    <p>{line.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <p className="desktop-note" aria-hidden="true">세로로 문장 이동 · 가로로 읽기 방식 전환</p>
    </main>
  );
}
