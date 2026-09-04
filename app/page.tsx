'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bookmark, BookOpen, House } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BOOK_SENTENCES, TEASER_SENTENCES } from './book-data';

type ReadingLine = {
  id: string;
  text: string;
  section: 'teaser' | 'book';
  number: number;
};

type GestureStart = { x: number; y: number; moved: boolean };
type ReadingMode = 'plain' | 'ebook';

function splitIntoBeats(text: string, maximumGlyphs = 24) {
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
  const ebookParagraphs = useMemo(
    () => Array.from(
      { length: Math.ceil(BOOK_SENTENCES.length / 5) },
      (_, index) => BOOK_SENTENCES.slice(index * 5, index * 5 + 5).join(' '),
    ),
    [],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<ReadingMode>('plain');
  const [saved, setSaved] = useState(false);
  const [phoneScale, setPhoneScale] = useState(1);
  const phoneRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const ebookRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const wheelDelta = useRef(0);
  const wheelDirection = useRef(0);
  const wheelTriggered = useRef(false);
  const wheelResetTimer = useRef<number | null>(null);
  const scrollAnimation = useRef<number | null>(null);
  const hasPositionedRail = useRef(false);
  const activeIndexRef = useRef(0);
  const gesture = useRef<GestureStart | null>(null);
  const touchGesture = useRef<GestureStart | null>(null);
  const suppressTapUntil = useRef(0);

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

  const selectMode = useCallback((nextMode: ReadingMode) => {
    hasPositionedRail.current = false;
    setMode(nextMode);
  }, []);

  const move = useCallback((amount: number) => {
    const current = activeIndexRef.current;
    const target = Math.max(0, Math.min(lines.length - 1, current + amount));
    if (target === current) return;

    activeIndexRef.current = target;
    setActiveIndex(target);
  }, [lines.length]);

  useEffect(() => {
    if (scrollAnimation.current !== null) {
      window.cancelAnimationFrame(scrollAnimation.current);
      scrollAnimation.current = null;
    }

    if (mode !== 'plain') return;

    const layoutFrame = window.requestAnimationFrame(() => {
      const rail = railRef.current;
      const target = lineRefs.current[activeIndex];
      if (!rail || !target) return;
      const anchor = rail.clientHeight * .35;
      const targetTop = target.offsetTop - anchor + target.clientHeight / 2;
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!hasPositionedRail.current || reducedMotion) {
        rail.scrollTop = targetTop;
        hasPositionedRail.current = true;
        return;
      }

      const startTop = rail.scrollTop;
      const distance = targetTop - startTop;
      const duration = 460;
      const startedAt = window.performance.now();

      const animate = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        rail.scrollTop = startTop + distance * eased;

        if (progress < 1) scrollAnimation.current = window.requestAnimationFrame(animate);
        else scrollAnimation.current = null;
      };

      scrollAnimation.current = window.requestAnimationFrame(animate);
    });

    return () => {
      window.cancelAnimationFrame(layoutFrame);
      if (scrollAnimation.current !== null) {
        window.cancelAnimationFrame(scrollAnimation.current);
        scrollAnimation.current = null;
      }
    };
  }, [activeIndex, mode]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (mode !== 'plain') return;
      event.preventDefault();
      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      if (wheelDirection.current !== 0 && wheelDirection.current !== direction) {
        wheelDelta.current = 0;
        wheelTriggered.current = false;
      }

      wheelDirection.current = direction;
      wheelDelta.current += event.deltaY;

      if (wheelResetTimer.current !== null) window.clearTimeout(wheelResetTimer.current);
      wheelResetTimer.current = window.setTimeout(() => {
        wheelDelta.current = 0;
        wheelDirection.current = 0;
        wheelTriggered.current = false;
        wheelResetTimer.current = null;
      }, 240);

      if (wheelTriggered.current || Math.abs(wheelDelta.current) < 48) return;
      wheelTriggered.current = true;
      move(direction > 0 ? 1 : -1);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', onWheel);
      if (wheelResetTimer.current !== null) window.clearTimeout(wheelResetTimer.current);
    };
  }, [mode, move]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (mode === 'plain' && (event.key === 'ArrowDown' || event.key === 'PageDown')) {
        event.preventDefault();
        move(1);
      }
      if (mode === 'plain' && (event.key === 'ArrowUp' || event.key === 'PageUp')) {
        event.preventDefault();
        move(-1);
      }
      if (event.key === 'ArrowLeft') selectMode('plain');
      if (event.key === 'ArrowRight') selectMode('ebook');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [move, selectMode]);

  const finishGesture = (start: GestureStart, x: number, y: number) => {
    const dx = start.x - x;
    const dy = start.y - y;
    const horizontalSwipe = Math.abs(dx) > 22 && Math.abs(dx) > Math.abs(dy) * 1.08;
    const verticalSwipe = Math.abs(dy) > 30 && Math.abs(dy) > Math.abs(dx) * 1.15;

    if (horizontalSwipe) {
      selectMode(mode === 'plain' ? 'ebook' : 'plain');
    }
    else if (verticalSwipe && mode === 'plain') move(dy > 0 ? 1 : -1);

    if (horizontalSwipe || verticalSwipe || start.moved) {
      suppressTapUntil.current = Date.now() + 450;
    }
  };

  return (
    <main className="prototype-stage">
      <div className="phone-viewport" style={{ width: 390 * phoneScale, height: 844 * phoneScale }}>
        <section
          ref={phoneRef}
          className={`phone phone--${mode}`}
          style={{ transform: `scale(${phoneScale})` }}
          aria-label={`북북 ${mode === 'plain' ? '일반' : '전자책'} 읽기 화면`}
          tabIndex={0}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') return;
            gesture.current = { x: event.clientX, y: event.clientY, moved: false };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (event.pointerType === 'touch') return;
            if (!gesture.current) return;
            const dx = Math.abs(event.clientX - gesture.current.x);
            const dy = Math.abs(event.clientY - gesture.current.y);
            if (Math.max(dx, dy) > 8) gesture.current.moved = true;
          }}
          onPointerUp={(event) => {
            if (event.pointerType === 'touch' || !gesture.current) return;
            finishGesture(gesture.current, event.clientX, event.clientY);
            gesture.current = null;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
          }}
          onPointerCancel={(event) => {
            if (event.pointerType === 'touch') return;
            gesture.current = null;
          }}
          onTouchStart={(event) => {
            if (event.touches.length !== 1) return;
            const touch = event.touches[0];
            touchGesture.current = { x: touch.clientX, y: touch.clientY, moved: false };
          }}
          onTouchMove={(event) => {
            if (!touchGesture.current || event.touches.length !== 1) return;
            const touch = event.touches[0];
            const dx = Math.abs(touch.clientX - touchGesture.current.x);
            const dy = Math.abs(touch.clientY - touchGesture.current.y);
            if (Math.max(dx, dy) > 6) touchGesture.current.moved = true;
          }}
          onTouchEnd={(event) => {
            if (!touchGesture.current || event.changedTouches.length === 0) return;
            const touch = event.changedTouches[0];
            finishGesture(touchGesture.current, touch.clientX, touch.clientY);
            touchGesture.current = null;
          }}
          onTouchCancel={() => {
            touchGesture.current = null;
          }}
        >
          <span className="speaker" aria-hidden="true" />
          <div className="phone-screen">
            <Tabs
              value={mode}
              onValueChange={(value) => {
                if (value === 'plain' || value === 'ebook') selectMode(value);
              }}
              className="mode-tabs"
              aria-label="읽기 형식"
            >
              <TabsList className="mode-tabs__list">
                <TabsTrigger value="plain" className="mode-tabs__trigger">일반</TabsTrigger>
                <span className="mode-tabs__divider" aria-hidden="true" />
                <TabsTrigger value="ebook" className="mode-tabs__trigger">전자책</TabsTrigger>
              </TabsList>
            </Tabs>
            {mode === 'plain' ? (
              <div className="sentence-rail" ref={railRef} aria-live="polite">
                {lines.map((line, index) => {
                  const isActive = index === activeIndex;
                  const counter = line.section === 'teaser' ? `${line.number}/3` : `${line.number}/${bookBeatCount}`;
                  return (
                    <div
                      key={line.id}
                      ref={(node) => { lineRefs.current[index] = node; }}
                      className={`reading-line ${isActive ? 'reading-line--active' : ''}`}
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => {
                        if (Date.now() < suppressTapUntil.current) return;
                        if (index !== activeIndexRef.current) move(index > activeIndexRef.current ? 1 : -1);
                      }}
                    >
                      {isActive && <span className="counter">{counter}</span>}
                      <p>{line.text}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="ebook-reader" ref={ebookRef}>
                <article className="ebook-content">
                  <header className="ebook-header">
                    <span>알베르 카뮈</span>
                    <h1>이방인</h1>
                  </header>
                  {ebookParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </article>
              </div>
            )}
            <nav className="bottom-tabbar" aria-label="하단 메뉴">
              <button
                type="button"
                className="bottom-tabbar__item"
                onClick={() => {
                  activeIndexRef.current = 0;
                  setActiveIndex(0);
                  ebookRef.current?.scrollTo({ top: 0 });
                }}
                aria-label="처음으로"
              >
                <House aria-hidden="true" />
                <span>처음</span>
              </button>
              <button type="button" className="bottom-tabbar__item bottom-tabbar__item--active" aria-current="page">
                <BookOpen aria-hidden="true" />
                <span>읽기</span>
              </button>
              <button
                type="button"
                className={`bottom-tabbar__item ${saved ? 'bottom-tabbar__item--saved' : ''}`}
                onClick={() => setSaved((current) => !current)}
                aria-pressed={saved}
              >
                <Bookmark aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
                <span>저장</span>
              </button>
            </nav>
          </div>
        </section>
      </div>
      <p className="desktop-note" aria-hidden="true">세로로 문장 이동 · 가로로 일반/전자책 전환</p>
    </main>
  );
}
