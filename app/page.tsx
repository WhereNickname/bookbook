'use client';

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookOpen, Clock3, House, Menu, X } from 'lucide-react';
import { BOOK_SENTENCES, TEASER_SENTENCES } from './book-data';

type ReadingLine = {
  id: string;
  text: string;
  section: 'teaser' | 'book';
  number: number;
};

type GestureStart = { x: number; y: number; moved: boolean };
type ReadingMode = 'plain' | 'ebook';

function getActiveLineSize(text: string) {
  const characterCount = text.replace(/\s/g, '').length;
  if (characterCount > 34) return 'reading-line--dense';
  if (characterCount > 25) return 'reading-line--compact';
  return '';
}

function startsSupportParagraph(line: ReadingLine) {
  // 작은 글은 세 문장 안팎으로만 살짝 묶어, 문장마다 문단이 갈라져 보이지 않게 한다.
  return line.number === 1 || (line.number - 1) % 3 === 0;
}

type Genre = '전체' | '고전문학' | '로맨스' | '한국' | '해외' | '영어원문' | '자기개발';

type FeedBook = {
  title: string;
  author: string;
  category: string;
  genres: Genre[];
  coverStyle: string;
  coverMark: string;
  coverData: string;
  quote: string;
  color: string;
  foreground: string;
  description: string;
};

const FEED_BOOKS: FeedBook[] = [
  { title: '데미안', author: '헤르만 헤세', category: '성장 소설', genres: ['고전문학', '해외'], coverStyle: 'demian', coverMark: '½', coverData: 'LIGHT / SHADOW', quote: '새는 알에서 나오려고\n투쟁한다.', color: '#ff5b35', foreground: '#20130e', description: '선과 악의 경계를 넘어 자기 자신에게 도달하려는 한 소년의 내면을 따라가는 성장 소설.' },
  { title: '이방인', author: '알베르 카뮈', category: '고전 소설', genres: ['고전문학', '해외'], coverStyle: 'stranger', coverMark: '●', coverData: '12:00 / ALGER', quote: '오늘 엄마가 죽었다.\n아니, 어쩌면 어제. 모르겠다.', color: '#e6fb63', foreground: '#161616', description: '세상의 규칙과 감정에서 비껴난 한 남자. 무심한 문장 사이로 삶의 부조리를 마주하게 되는 소설.' },
  { title: '싯다르타', author: '헤르만 헤세', category: '고전 소설', genres: ['고전문학', '해외'], coverStyle: 'siddhartha', coverMark: '≈', coverData: 'RIVER / SELF', quote: '강은 어디에나 있으면서\n언제나 현재에만 있었다.', color: '#39b8a6', foreground: '#102f2d', description: '배움과 방황을 지나 흐르는 강 앞에서 삶과 자아의 의미를 발견하는 구도의 이야기.' },
  { title: '채식주의자', author: '한강', category: '한국 소설', genres: ['한국'], coverStyle: 'vegetarian', coverMark: 'Y', coverData: 'ROOT / BODY', quote: '나는 이제\n고기를 먹지 않아요.', color: '#d2e8c5', foreground: '#31542f', description: '한 사람의 조용한 거부가 평범했던 일상을 흔들며 만들어내는 낯설고 강렬한 균열.' },
  { title: '코스모스', author: '칼 세이건', category: '과학 교양', genres: ['해외', '영어원문'], coverStyle: 'cosmos', coverMark: '∞', coverData: '13.8 BY / 10²⁴', quote: '우리는 모두\n별의 물질로 이루어졌다.', color: '#17152d', foreground: '#eee9ff', description: '우주의 탄생에서 인간의 질문까지, 광대한 시공간 속 우리의 위치를 아름답게 설명한다.' },
  { title: '인간실격', author: '다자이 오사무', category: '고전 소설', genres: ['고전문학', '해외'], coverStyle: 'disqualified', coverMark: '失格', coverData: 'HUMAN / NULL', quote: '부끄럼 많은 생애를\n보냈습니다.', color: '#d8d5ce', foreground: '#1a1918', description: '타인의 세계에 섞이지 못한 한 인간의 고백을 통해 불안과 소외의 가장 깊은 곳을 바라본다.' },
  { title: '날개', author: '이상', category: '한국 고전', genres: ['고전문학', '한국'], coverStyle: 'wings', coverMark: '翼', coverData: '0m → ∞', quote: '날개야 다시 돋아라.\n한 번만 더 날아보자.', color: '#7d6cff', foreground: '#151126', description: '닫힌 방과 무기력한 일상을 빠져나가려는 의식의 움직임을 실험적인 문장으로 그린 작품.' },
  { title: '동물농장', author: '조지 오웰', category: '풍자 소설', genres: ['고전문학', '해외', '영어원문'], coverStyle: 'animal-farm', coverMark: '4=2', coverData: 'POWER / RULE', quote: '모든 동물은 평등하다.\n그러나 어떤 동물은 더 평등하다.', color: '#ffde39', foreground: '#2d1710', description: '혁명의 이상이 권력의 언어로 변질되는 과정을 농장의 우화로 날카롭게 보여준다.' },
  { title: '1984', author: '조지 오웰', category: '디스토피아', genres: ['고전문학', '해외', '영어원문'], coverStyle: 'nineteen', coverMark: '◎', coverData: 'BIG BROTHER / 24·7', quote: '누군가는 언제나\n당신을 보고 있다.', color: '#ef3138', foreground: '#19090a', description: '기억과 언어까지 통제하는 사회에서 한 개인이 진실과 자유를 붙잡으려는 디스토피아 소설.' },
  { title: '안나 카레니나', author: '레프 톨스토이', category: '고전 로맨스', genres: ['고전문학', '로맨스', '해외'], coverStyle: 'anna', coverMark: 'A↔V', coverData: 'LOVE / SOCIETY', quote: '사랑은 한 사람의 삶을\n어디까지 바꿀 수 있을까.', color: '#8d1736', foreground: '#fff0df', description: '사랑과 결혼, 욕망과 사회적 시선이 충돌하는 삶을 거대한 인물 군상 속에 담아낸 소설.' },
  { title: '국부론', author: '애덤 스미스', category: '경제 고전', genres: ['고전문학', '해외', '영어원문', '자기개발'], coverStyle: 'wealth', coverMark: '∑', coverData: 'LABOR × MARKET', quote: '부는 금고가 아니라\n사람들의 노동에서 시작된다.', color: '#153f34', foreground: '#f1d36e', description: '분업과 교환, 시장의 작동 원리를 통해 국가와 사회의 부가 어디에서 오는지 탐구한다.' },
  { title: '사피엔스', author: '유발 하라리', category: '역사 교양', genres: ['해외', '자기개발'], coverStyle: 'sapiens', coverMark: '70K', coverData: 'HOMO / STORY', quote: '인간은 함께 믿는 이야기로\n세상을 바꾸었다.', color: '#eadbc0', foreground: '#352716', description: '인지혁명부터 현대까지 인류가 협력하고 문명을 만든 과정을 거대한 시간축으로 압축한다.' },
  { title: '급류', author: '정대건', category: '한국 로맨스', genres: ['한국', '로맨스'], coverStyle: 'rapids', coverMark: '≋', coverData: 'FLOW / IMPACT', quote: '우리는 서로에게\n휩쓸리고 있었다.', color: '#1479e8', foreground: '#f3fbff', description: '상처를 품은 두 사람이 거센 물살 같은 시간 속에서 다시 서로에게 향하는 이야기.' },
  { title: '구의 증명', author: '최진영', category: '한국 소설', genres: ['한국', '로맨스'], coverStyle: 'sphere', coverMark: '○', coverData: 'G ↔ D / ∞', quote: '사라진 뒤에도\n사랑은 몸에 남는다.', color: '#101010', foreground: '#f3eee3', description: '상실한 사람을 기억하고 사랑한다는 일이 얼마나 육체적이고 절실한지 밀도 높게 보여준다.' },
];

const GENRES: Genre[] = ['전체', '고전문학', '로맨스', '한국', '해외', '영어원문', '자기개발'];

export default function Home() {
  const [isReading, setIsReading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<FeedBook | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  if (isReading) return <Reader animationsEnabled={animationsEnabled} onAnimationsChange={setAnimationsEnabled} onExit={() => { setIsReading(false); setSelectedBook(null); }} />;
  if (selectedBook) {
    return <BookEntry book={selectedBook} animationsEnabled={animationsEnabled} onBack={() => setSelectedBook(null)} onStartReading={() => setIsReading(true)} />;
  }
  return (
    <DiscoverFeed
      animationsEnabled={animationsEnabled}
      isWelcomeOpen={isWelcomeOpen}
      onCloseWelcome={() => setIsWelcomeOpen(false)}
      onSelectBook={setSelectedBook}
    />
  );
}

type PhoneFrameProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'> & {
  children: ReactNode;
  className?: string;
  phoneRef?: Ref<HTMLElement>;
  ariaLabel: string;
  note: string;
};

function PhoneFrame({ children, className = '', phoneRef, ariaLabel, note, style, ...phoneProps }: PhoneFrameProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fitPhone = () => {
      const sideGap = window.innerWidth <= 520 ? 12 : 32;
      const verticalGap = window.innerWidth <= 520 ? 12 : 78;
      setScale(Math.min(
        1,
        Math.max(0.1, (window.innerWidth - sideGap) / 390),
        Math.max(0.1, (window.innerHeight - verticalGap) / 844),
      ));
    };

    fitPhone();
    window.addEventListener('resize', fitPhone);
    return () => window.removeEventListener('resize', fitPhone);
  }, []);

  return (
    <main className="prototype-stage">
      <div className="phone-viewport" style={{ width: 390 * scale, height: 844 * scale }}>
        <section
          {...phoneProps}
          ref={phoneRef}
          className={`phone ${className}`.trim()}
          style={{ ...style, transform: `scale(${scale})` }}
          aria-label={ariaLabel}
        >
          <span className="speaker" aria-hidden="true" />
          <div className="phone-screen">{children}</div>
        </section>
      </div>
      <p className="desktop-note" aria-hidden="true">{note}</p>
    </main>
  );
}

function Reader({ animationsEnabled, onAnimationsChange, onExit }: { animationsEnabled: boolean; onAnimationsChange: (enabled: boolean) => void; onExit: () => void }) {
  const lines = useMemo<ReadingLine[]>(
    () => {
      return [
        ...TEASER_SENTENCES.map((text, index) => ({ id: `teaser-${index}`, text, section: 'teaser' as const, number: index + 1 })),
        ...BOOK_SENTENCES.map((text, index) => ({ id: `book-${index}`, text, section: 'book' as const, number: index + 1 })),
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
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

  const selectMode = useCallback((nextMode: ReadingMode) => {
    hasPositionedRail.current = false;
    setMode(nextMode);
    if (nextMode === 'plain') setHasReachedEnd(activeIndexRef.current === lines.length - 1);
  }, []);

  const move = useCallback((amount: number) => {
    const current = activeIndexRef.current;
    const target = Math.max(0, Math.min(lines.length - 1, current + amount));
    if (target === current) return;

    activeIndexRef.current = target;
    setActiveIndex(target);
    setHasReachedEnd(target === lines.length - 1);
  }, [lines.length]);

  const jumpTo = useCallback((index: number) => {
    const target = Math.max(0, Math.min(lines.length - 1, index));
    if (target === activeIndexRef.current) return;

    // 문장 목록을 눌렀을 때는 중간 문장들을 훑지 않고 바로 해당 위치로 보낸다.
    hasPositionedRail.current = false;
    activeIndexRef.current = target;
    setActiveIndex(target);
    setHasReachedEnd(target === lines.length - 1);
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
      const reducedMotion = !animationsEnabled || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  }, [activeIndex, animationsEnabled, mode]);

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
    <PhoneFrame
          phoneRef={phoneRef}
          className={`phone--${mode} ${animationsEnabled ? 'phone--screen-enter' : 'phone--no-motion'}`}
          ariaLabel={`북북 ${mode === 'plain' ? '일반' : '전자책'} 읽기 화면`}
          note="세로로 문장 이동 · 가로로 일반/전자책 전환"
          tabIndex={0}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') return;
            if ((event.target as HTMLElement).closest('.mode-tabs, .type-menu, .bottom-tabbar, .continue-cta')) return;
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
            if ((event.target as HTMLElement).closest('.mode-tabs, .type-menu, .bottom-tabbar, .continue-cta')) return;
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
            <div className="type-menu">
              <button
                type="button"
                className="type-menu__toggle"
                aria-label="화면 설정 열기"
                aria-expanded={isSettingsOpen}
                onPointerDown={(event) => event.stopPropagation()}
                onTouchStart={(event) => event.stopPropagation()}
                onClick={() => setIsSettingsOpen((current) => !current)}
              >
                {isSettingsOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
              </button>
              {isSettingsOpen && (
                <div className="type-menu__panel" role="menu" aria-label="화면 설정">
                  <div className="motion-setting">
                    <div>
                      <strong>GUI 애니메이션</strong>
                      <span>{animationsEnabled ? '켜짐' : '꺼짐'}</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={animationsEnabled}
                      className={animationsEnabled ? 'motion-setting__switch--active' : ''}
                      onPointerDown={(event) => event.stopPropagation()}
                      onTouchStart={(event) => event.stopPropagation()}
                      onClick={() => onAnimationsChange(!animationsEnabled)}
                    >
                      <span />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="mode-tabs" role="tablist" aria-label="읽기 형식">
              <div className="mode-tabs__list">
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'plain'}
                  className={`mode-tabs__trigger ${mode === 'plain' ? 'mode-tabs__trigger--active' : ''}`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onTouchStart={(event) => event.stopPropagation()}
                  onClick={() => selectMode('plain')}
                >
                  일반
                </button>
                <span className="mode-tabs__divider" aria-hidden="true" />
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'ebook'}
                  className={`mode-tabs__trigger ${mode === 'ebook' ? 'mode-tabs__trigger--active' : ''}`}
                  onPointerDown={(event) => event.stopPropagation()}
                  onTouchStart={(event) => event.stopPropagation()}
                  onClick={() => selectMode('ebook')}
                >
                  전자책
                </button>
              </div>
            </div>
            {mode === 'plain' ? (
              <div className="sentence-rail" ref={railRef} aria-live="polite">
                {lines.map((line, index) => {
                  const isActive = index === activeIndex;
                  const counter = line.section === 'teaser' ? '프롤로그' : `${line.number}/${bookBeatCount}`;
                  return (
                    <div
                      key={line.id}
                      ref={(node) => { lineRefs.current[index] = node; }}
                      className={`reading-line ${isActive ? `reading-line--active ${getActiveLineSize(line.text)}` : ''} ${!isActive && startsSupportParagraph(line) ? 'reading-line--paragraph-start' : ''}`}
                      aria-current={isActive ? 'step' : undefined}
                      onPointerDown={(event) => {
                        // 데스크톱 클릭은 바깥 제스처 캡처보다 먼저 문장 선택으로 처리한다.
                        if (event.pointerType === 'touch') return;
                        event.stopPropagation();
                        if (Date.now() >= suppressTapUntil.current) jumpTo(index);
                      }}
                      onTouchEnd={(event) => {
                        const started = touchGesture.current;
                        if (!started || event.changedTouches.length === 0) return;

                        const touch = event.changedTouches[0];
                        const moved = Math.max(
                          Math.abs(touch.clientX - started.x),
                          Math.abs(touch.clientY - started.y),
                        ) > 10;

                        if (!moved && Date.now() >= suppressTapUntil.current) jumpTo(index);
                      }}
                      onClick={() => {
                        if (Date.now() < suppressTapUntil.current) return;
                        jumpTo(index);
                      }}
                    >
                      {isActive && <span className="counter">{counter}</span>}
                      <p>{line.text}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="ebook-reader"
                ref={ebookRef}
                onScroll={(event) => {
                  const reader = event.currentTarget;
                  setHasReachedEnd(reader.scrollTop + reader.clientHeight >= reader.scrollHeight - 12);
                }}
              >
                <article className="ebook-content">
                  <header className="ebook-header">
                    <span>알베르 카뮈</span>
                    <h1>이방인</h1>
                  </header>
                  {ebookParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <button type="button" className="ebook-continue">이어서 읽기</button>
                </article>
              </div>
            )}
            {mode === 'plain' && hasReachedEnd && (
              <button type="button" className="continue-cta">이어서 읽기</button>
            )}
            <nav className="bottom-tabbar" aria-label="하단 메뉴">
              <button
                type="button"
                className="bottom-tabbar__item"
                onPointerDown={(event) => event.stopPropagation()}
                onTouchStart={(event) => event.stopPropagation()}
                onClick={() => {
                  activeIndexRef.current = 0;
                  setActiveIndex(0);
                  setHasReachedEnd(false);
                  ebookRef.current?.scrollTo({ top: 0 });
                  onExit();
                }}
                aria-label="책 탐색으로 돌아가기"
              >
                <House aria-hidden="true" />
                <span>탐색</span>
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
    </PhoneFrame>
  );
}

function BookEntry({
  book,
  animationsEnabled,
  onBack,
  onStartReading,
}: {
  book: FeedBook;
  animationsEnabled: boolean;
  onBack: () => void;
  onStartReading: () => void;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <PhoneFrame className={`phone--entry ${animationsEnabled ? 'phone--screen-enter' : 'phone--no-motion'}`} ariaLabel={`${book.title} 책 소개`} note="책의 분위기를 보고 3분 미리보기를 시작해봐">
      <div
        className="book-entry"
        style={{ '--card-color': book.color, '--card-foreground': book.foreground } as CSSProperties}
      >
        <header className="book-entry__header">
          <button type="button" onClick={onBack} aria-label="탐색으로 돌아가기"><ArrowLeft aria-hidden="true" /></button>
          <span>{book.category}</span>
          <button type="button" onClick={() => setSaved((current) => !current)} aria-label="책 저장" aria-pressed={saved}>
            <Bookmark aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </header>
        <section className="book-entry__hero">
          <BookCoverArtwork book={book} />
          <p className="book-entry__quote">{book.quote}</p>
        </section>
        <section className="book-entry__sheet">
          <div className="book-entry__title">
            <div><h1>{book.title}</h1><p>{book.author}</p></div>
            <span><Clock3 aria-hidden="true" /> 약 3분</span>
          </div>
          <p className="book-entry__description">{book.description}</p>
          <button type="button" className="book-entry__start" onClick={onStartReading}>
            3분 미리보기 시작 <ArrowRight aria-hidden="true" />
          </button>
          <small>스크롤하며 이 책의 분위기를 먼저 만나봐</small>
        </section>
      </div>
    </PhoneFrame>
  );
}

function BookCoverArtwork({ book }: { book: FeedBook }) {
  return (
    <div className={`book-entry__cover cover--${book.coverStyle}`} aria-label={`${book.title} 표지`}>
      <div className="cover-art" aria-hidden="true">
        <b>{book.coverMark}</b>
        <span>{book.coverData}</span>
      </div>
      <div className="cover-label"><span>{book.author}</span><strong>{book.title}</strong></div>
    </div>
  );
}

function DiscoverFeed({
  animationsEnabled,
  isWelcomeOpen,
  onCloseWelcome,
  onSelectBook,
}: {
  animationsEnabled: boolean;
  isWelcomeOpen: boolean;
  onCloseWelcome: () => void;
  onSelectBook: (book: FeedBook) => void;
}) {
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<Genre>('전체');
  const feedRef = useRef<HTMLDivElement>(null);
  const visibleBooks = selectedGenre === '전체'
    ? FEED_BOOKS
    : FEED_BOOKS.filter((book) => book.genres.includes(selectedGenre));

  const selectGenre = (genre: Genre) => {
    setSelectedGenre(genre);
    setIsGenreMenuOpen(false);
    window.requestAnimationFrame(() => feedRef.current?.scrollTo({ top: 0 }));
  };

  return (
    <PhoneFrame
      className={`phone--discover ${animationsEnabled ? 'phone--screen-enter' : 'phone--no-motion'}`}
      ariaLabel="스북 책 탐색 화면"
      note="책의 첫 문장을 따라 천천히 내려가봐"
    >
        <header className="discover-header">
          <strong>스북 <small>{selectedGenre}</small></strong>
          <button
            type="button"
            aria-label="장르 메뉴"
            aria-expanded={isGenreMenuOpen}
            onClick={() => setIsGenreMenuOpen((current) => !current)}
          >
            {isGenreMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </header>
        {isGenreMenuOpen && (
          <div className="genre-menu" role="menu" aria-label="책 장르 선택">
            <p>어떤 책을 볼까?</p>
            <div>
              {GENRES.map((genre) => (
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={selectedGenre === genre}
                  className={selectedGenre === genre ? 'genre-menu__item--active' : ''}
                  onClick={() => selectGenre(genre)}
                  key={genre}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="discover-feed" ref={feedRef}>
          {visibleBooks.map((book, index) => (
            <article
              key={book.title}
              className="discover-card"
              style={{ '--card-color': book.color, '--card-foreground': book.foreground } as CSSProperties}
            >
              <div className="discover-card__meta">
                <span>{book.category}</span>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              <button type="button" className="discover-card__quote" onClick={() => onSelectBook(book)}>
                <p>{book.quote}</p>
                <span aria-hidden="true">“</span>
              </button>
              <footer className="discover-card__footer">
                <div>
                  <h1>{book.title}</h1>
                  <p>{book.author}</p>
                </div>
                <button type="button" className="discover-card__open" onClick={() => onSelectBook(book)} aria-label={`${book.title} 살펴보기`}>
                  <ArrowRight aria-hidden="true" />
                </button>
              </footer>
            </article>
          ))}
          {visibleBooks.length === 0 && (
            <div className="discover-empty">
              <span>{selectedGenre}</span>
              <strong>아직 준비 중이야</strong>
              <p>다른 장르에서 마음에 드는 문장을 찾아봐.</p>
              <button type="button" onClick={() => selectGenre('전체')}>전체 책 보기</button>
            </div>
          )}
        </div>
        {visibleBooks.length > 1 && <p className="discover-hint">아래로 넘겨, 다음 문장을 만나봐</p>}
        {isWelcomeOpen && (
          <button
            type="button"
            className="welcome-overlay"
            onClick={onCloseWelcome}
            aria-label="시작 안내 닫기"
          >
            <strong>미리보기 문장들을 찾아서<br />직접 읽고싶은 책을 고르세요</strong>
            <span>아무 곳이나 클릭해서 닫기</span>
          </button>
        )}
    </PhoneFrame>
  );
}
