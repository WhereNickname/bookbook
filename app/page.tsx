/*
 * FILE ROLE: 북북의 탐색, 책 소개, 샘플 읽기 화면을 조합하고 화면 간 상태를 이어준다.
 * OWNS: 현재 선택한 책, 탐색 장르와 복귀 위치, 리더 표시 모드와 기기 보기 모드, 화면 전환 상태.
 * USES: book-data의 편집 콘텐츠, book-catalog의 서지 정보와 공통 PhoneFrame UI.
 * MUST NOT: 책 요약 원문을 직접 소유하거나 서버 저장과 계정 동기화를 수행한다.
 */

'use client';

import {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ArrowLeft, ArrowRight, Bookmark, BookOpen, Clock3, House, Menu, Monitor, Smartphone, X } from 'lucide-react';
import { getBookContent } from './book-data';
import { FEED_BOOKS, GENRES, type FeedBook, type Genre } from './book-catalog';
import './book-covers.css';

type ReadingLine = {
  id: string;
  text: string;
  section: 'teaser' | 'book';
  number: number;
};

type GestureStart = { x: number; y: number; moved: boolean };
type ReadingMode = 'plain' | 'ebook';
type ViewMode = 'phone' | 'desktop';
type ReadingDirection = 'forward' | 'backward';


type DiscoveryPair = {
  left: string;
  right: string;
  prompt: string;
};

type DiscoveryPairGroup = {
  books: FeedBook[];
  prompt: string;
};

const EDITORIAL_PAIRS: DiscoveryPair[] = [
  { left: '데미안', right: '인간실격', prompt: '나를 찾아 나설까, 사람들 속에 나를 숨길까' },
  { left: '이방인', right: '죽음의 수용소에서', prompt: '의미가 없는 세계와, 의미를 끝까지 붙드는 사람' },
  { left: '싯다르타', right: '차라투스트라는 이렇게 말했다', prompt: '안으로 깊어지는 길과, 자신을 넘어서는 길' },
  { left: '채식주의자', right: '카네기 인간관계론', prompt: '세상과 거리를 두기와, 사람에게 가까이 가기' },
  { left: '코스모스', right: '사피엔스', prompt: '우주에서 인간을 볼까, 인간에서 세계를 볼까' },
  { left: '날개', right: '수레바퀴 아래서', prompt: '밖으로 날아가려는 사람과, 기대 아래 눌리는 사람' },
  { left: '동물농장', right: '군주론', prompt: '권력이 망가지는 과정과, 권력을 지키는 방법' },
  { left: '1984', right: '멋진 신세계', prompt: '두려움으로 통제할까, 행복으로 통제할까' },
  { left: '안나 카레니나', right: '오만과 편견', prompt: '사랑이 사회와 충돌할 때, 관계는 어디로 갈까' },
  { left: '국부론', right: '공정하다는 착각', prompt: '부가 만들어지는 원리와, 성공이 정당한가라는 질문' },
  { left: '급류', right: '설국', prompt: '휩쓸리는 마음과, 얼어붙은 거리 사이' },
  { left: '구의 증명', right: '브람스를 좋아하세요...', prompt: '남겨진 사랑과, 다시 선택해야 하는 사랑' },
  { left: '아토믹 해빗츠', right: '역행자', prompt: '작게 반복할까, 익숙한 방향부터 뒤집을까' },
  { left: '설득의 심리학', right: '어린 왕자', prompt: '사람을 움직이는 법과, 사람을 이해하는 법' },
  { left: '노인과 바다', right: '호밀밭의 파수꾼', prompt: '끝까지 버티는 사람과, 벗어나려는 사람' },
  { left: '위대한 개츠비', right: '젊은 베르테르의 슬픔', prompt: '지나간 사랑을 기다릴까, 사랑에 온몸을 던질까' },
  { left: '첫사랑', right: '폭풍의 언덕', prompt: '처음 스친 사랑과, 세대를 붙드는 사랑' },
  { left: '눈먼 자들의 도시', right: '페스트', prompt: '무너지는 도시와, 버티는 도시를 바라보기' },
  { left: '변신', right: '프랑켄슈타인', prompt: '괴물이 되어버린 사람과, 괴물을 만들어버린 사람' },
  { left: '지킬 박사와 하이드 씨', right: '도리언 그레이의 초상', prompt: '갈라진 내면과, 감춰진 얼굴' },
];

function getDiscoveryLine(book: FeedBook) {
  return book.quote.split('\n').find((line) => line.trim().length > 0) ?? book.description;
}

function getEditorialPair(book: FeedBook) {
  return EDITORIAL_PAIRS.find((pair) => pair.left === book.title || pair.right === book.title);
}

function getBookQuestion(book: FeedBook) {
  return getEditorialPair(book)?.prompt ?? '이 책 다음에는 어떤 방향이 기다리고 있을까';
}

function getNextBook(book: FeedBook) {
  const pair = getEditorialPair(book);
  if (pair) {
    const pairedTitle = pair.left === book.title ? pair.right : pair.left;
    const pairedBook = FEED_BOOKS.find((candidate) => candidate.title === pairedTitle);
    if (pairedBook) return pairedBook;
  }

  const currentIndex = FEED_BOOKS.findIndex((candidate) => candidate.title === book.title);
  if (currentIndex < 0) return FEED_BOOKS[0];
  return FEED_BOOKS[(currentIndex + 1) % FEED_BOOKS.length];
}

function buildDiscoveryPairs(books: FeedBook[], useEditorialOrder: boolean): DiscoveryPairGroup[] {
  const byTitle = new Map(books.map((book) => [book.title, book]));
  const used = new Set<string>();
  const groups: DiscoveryPairGroup[] = [];

  if (useEditorialOrder) {
    EDITORIAL_PAIRS.forEach((pair) => {
      const left = byTitle.get(pair.left);
      const right = byTitle.get(pair.right);
      if (!left || !right) return;
      used.add(left.title);
      used.add(right.title);
      groups.push({ books: [left, right], prompt: pair.prompt });
    });
  }

  const remaining = books.filter((book) => !used.has(book.title));
  for (let index = 0; index < remaining.length; index += 2) {
    const pairBooks = remaining.slice(index, index + 2);
    groups.push({
      books: pairBooks,
      prompt: pairBooks.length === 2 ? '같은 서가에서 전혀 다른 방향을 골라봐' : '마지막 한 권은 어떤 문장으로 시작할까',
    });
  }

  return groups;
}

function getActiveLineSize(text: string) {
  const characterCount = text.replace(/\s/g, '').length;
  if (characterCount > 30) return 'reading-line--dense';
  if (characterCount > 21) return 'reading-line--compact';
  return '';
}

function startsSupportParagraph(line: ReadingLine) {
  // 작은 글은 세 문장 안팎으로만 살짝 묶어, 문장마다 문단이 갈라져 보이지 않게 한다.
  return line.number === 1 || (line.number - 1) % 3 === 0;
}




export default function Home() {
  const [isReading, setIsReading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<FeedBook | null>(null);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState<Genre>('전체');
  const [discoverScrollTop, setDiscoverScrollTop] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('phone');

  if (isReading && selectedBook) {
    return (
      <Reader
        key={selectedBook.title}
        book={selectedBook}
        animationsEnabled={animationsEnabled}
        onAnimationsChange={setAnimationsEnabled}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNextBook={(nextBook) => {
          setSelectedBook(nextBook);
          setIsReading(true);
        }}
        onExit={() => {
          setIsReading(false);
          setSelectedBook(null);
        }}
      />
    );
  }
  if (selectedBook) {
    return <BookEntry book={selectedBook} animationsEnabled={animationsEnabled} viewMode={viewMode} onBack={() => setSelectedBook(null)} onStartReading={() => setIsReading(true)} />;
  }
  return (
    <DiscoverFeed
      animationsEnabled={animationsEnabled}
      selectedGenre={selectedGenre}
      viewMode={viewMode}
      initialScrollTop={discoverScrollTop}
      onGenreChange={setSelectedGenre}
      onViewModeChange={setViewMode}
      onSelectBook={(book, scrollTop) => {
        setDiscoverScrollTop(scrollTop);
        setSelectedBook(book);
      }}
    />
  );
}

type PhoneFrameProps = Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'> & {
  children: ReactNode;
  className?: string;
  phoneRef?: Ref<HTMLElement>;
  ariaLabel: string;
  note: string;
  viewMode: ViewMode;
};

function PhoneFrame({ children, className = '', phoneRef, ariaLabel, note, viewMode, style, ...phoneProps }: PhoneFrameProps) {
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    if (viewMode === 'desktop') {
      return;
    }

    const fitPhone = () => {
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const sideGap = viewportWidth <= 520 ? 12 : 32;
      const verticalGap = viewportWidth <= 520 ? 12 : 78;
      setScale(Math.min(
        1,
        Math.max(0.1, (viewportWidth - sideGap) / 390),
        Math.max(0.1, (viewportHeight - verticalGap) / 844),
      ));
    };

    fitPhone();
    window.addEventListener('resize', fitPhone);
    window.visualViewport?.addEventListener('resize', fitPhone);
    return () => {
      window.removeEventListener('resize', fitPhone);
      window.visualViewport?.removeEventListener('resize', fitPhone);
    };
  }, [viewMode]);

  const isDesktop = viewMode === 'desktop';

  return (
    <main className={`prototype-stage ${isDesktop ? 'prototype-stage--desktop' : ''}`}>
      <div className={`phone-viewport ${isDesktop ? 'phone-viewport--desktop' : ''}`} style={isDesktop ? undefined : { width: 390 * scale, height: 844 * scale }}>
        <section
          {...phoneProps}
          ref={phoneRef}
          className={`phone ${isDesktop ? 'phone--desktop' : ''} ${className}`.trim()}
          style={{ ...style, transform: isDesktop ? 'none' : `scale(${scale})` }}
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

function ViewModeSetting({ viewMode, onChange }: { viewMode: ViewMode; onChange: (mode: ViewMode) => void }) {
  return (
    <fieldset className="view-mode-setting">
      <legend>화면 보기</legend>
      <div>
        <button type="button" className={viewMode === 'phone' ? 'view-mode-setting__active' : ''} aria-pressed={viewMode === 'phone'} onClick={() => onChange('phone')}>
          <Smartphone aria-hidden="true" /> 핸드폰
        </button>
        <button type="button" className={viewMode === 'desktop' ? 'view-mode-setting__active' : ''} aria-pressed={viewMode === 'desktop'} onClick={() => onChange('desktop')}>
          <Monitor aria-hidden="true" /> 전체화면
        </button>
      </div>
    </fieldset>
  );
}

function Reader({
  book,
  animationsEnabled,
  onAnimationsChange,
  viewMode,
  onViewModeChange,
  onNextBook,
  onExit,
}: {
  book: FeedBook;
  animationsEnabled: boolean;
  onAnimationsChange: (enabled: boolean) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNextBook: (book: FeedBook) => void;
  onExit: () => void;
}) {
  const content = getBookContent(book.title);
  const nextBook = getNextBook(book);
  const teaserSentences = content.prologue;
  const bookSentences = content.sentences;
  const lines = useMemo<ReadingLine[]>(
    () => {
      return [
        ...teaserSentences.map((text, index) => ({ id: `teaser-${index}`, text, section: 'teaser' as const, number: index + 1 })),
        ...bookSentences.map((text, index) => ({ id: `book-${index}`, text, section: 'book' as const, number: index + 1 })),
      ];
    },
    [bookSentences, teaserSentences],
  );

  const bookBeatCount = bookSentences.length;
  const ebookParagraphs = useMemo(
    () => Array.from(
      { length: Math.ceil(bookSentences.length / 5) },
      (_, index) => bookSentences.slice(index * 5, index * 5 + 5).join(' '),
    ),
    [bookSentences],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [readingDirection, setReadingDirection] = useState<ReadingDirection>('forward');
  const [mode, setMode] = useState<ReadingMode>('plain');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const changeViewMode = (mode: ViewMode) => {
    setIsSettingsOpen(false);
    onViewModeChange(mode);
  };
  const [saved, setSaved] = useState(false);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const phoneRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const ebookRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLButtonElement | null>>([]);
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
  }, [lines.length]);

  const move = useCallback((amount: number) => {
    const current = activeIndexRef.current;
    const target = Math.max(0, Math.min(lines.length - 1, current + amount));
    if (target === current) return;

    setReadingDirection(target > current ? 'forward' : 'backward');
    activeIndexRef.current = target;
    setActiveIndex(target);
    setHasReachedEnd(target === lines.length - 1);
  }, [lines.length]);

  const jumpTo = useCallback((index: number) => {
    const target = Math.max(0, Math.min(lines.length - 1, index));
    if (target === activeIndexRef.current) return;

    // 문장 목록을 눌렀을 때는 중간 문장들을 훑지 않고 바로 해당 위치로 보낸다.
    hasPositionedRail.current = false;
    setReadingDirection(target > activeIndexRef.current ? 'forward' : 'backward');
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
      const duration = 480;
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
  }, [mode, move, selectMode]);

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
      viewMode={viewMode}
      phoneRef={phoneRef}
      className={`phone--${mode} ${animationsEnabled ? 'phone--screen-enter' : 'phone--no-motion'}`}
      ariaLabel={`북북 ${mode === 'plain' ? '일반' : '전자책'} 읽기 화면`}
          note="세로로 문장 이동 · 가로로 일반/전자책 전환"
          tabIndex={0}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') return;
            if ((event.target as HTMLElement).closest('.mode-tabs, .type-menu, .bottom-tabbar, .reading-next-card')) return;
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
            if ((event.target as HTMLElement).closest('.mode-tabs, .type-menu, .bottom-tabbar, .reading-next-card')) return;
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
                  <ViewModeSetting viewMode={viewMode} onChange={changeViewMode} />
                  <div className="motion-setting">
                    <div>
                      <strong>GUI 애니메이션</strong>
                      <span>{animationsEnabled ? '켜짐' : '꺼짐'}</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-label="GUI 애니메이션"
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
                    <button
                      type="button"
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
                      <span className={`reading-line__focus reading-line__focus--${readingDirection}`}>
                        {isActive && <span className="counter">{counter}</span>}
                        <span className="reading-line__text">{line.text}</span>
                      </span>
                    </button>
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
                    <span>{book.author}</span>
                    <h1>{book.title}</h1>
                  </header>
                  <section className="ebook-prologue" aria-label="프롤로그">
                    <h2>프롤로그</h2>
                    {teaserSentences.map((sentence, index) => <p key={index}>{sentence}</p>)}
                  </section>
                  {ebookParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  <section className="ebook-next" aria-label="다음 책">
                    <span>NEXT</span>
                    <strong>{nextBook.title}</strong>
                    <p>{getDiscoveryLine(nextBook)}</p>
                    <button type="button" onClick={() => onNextBook(nextBook)}>
                      다음 책 10초 보기 <ArrowRight aria-hidden="true" />
                    </button>
                  </section>
                </article>
              </div>
            )}
            {mode === 'plain' && hasReachedEnd && (
              <section className="reading-next-card" aria-label="다음 책">
                <div>
                  <span>NEXT · 반대편 책</span>
                  <strong>{nextBook.title}</strong>
                  <p>{getDiscoveryLine(nextBook)}</p>
                </div>
                <button
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onTouchStart={(event) => event.stopPropagation()}
                  onClick={() => onNextBook(nextBook)}
                >
                  10초 보기 <ArrowRight aria-hidden="true" />
                </button>
              </section>
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
  viewMode,
  onBack,
  onStartReading,
}: {
  book: FeedBook;
  animationsEnabled: boolean;
  viewMode: ViewMode;
  onBack: () => void;
  onStartReading: () => void;
}) {
  const [savedBooks, setSavedBooks] = useState<Set<string>>(() => new Set());
  const saved = savedBooks.has(book.title);
  const bookQuestion = getBookQuestion(book);

  const toggleSaved = () => {
    setSavedBooks((current) => {
      const next = new Set(current);
      if (next.has(book.title)) next.delete(book.title);
      else next.add(book.title);
      return next;
    });
  };

  return (
    <PhoneFrame
      viewMode={viewMode}
      className={`phone--entry ${animationsEnabled ? 'phone--screen-enter' : 'phone--no-motion'}`}
      ariaLabel={`${book.title} 책 소개`}
      note="책의 분위기를 보고 1분 미리보기를 시작해봐"
      style={{ '--card-color': book.color, '--card-foreground': book.foreground } as CSSProperties}
    >
      <div
        className="book-entry"
      >
        <header className="book-entry__header">
          <button type="button" onClick={onBack} aria-label="탐색으로 돌아가기"><ArrowLeft aria-hidden="true" /></button>
          <span>{book.category}</span>
          <button type="button" onClick={toggleSaved} aria-label="책 저장" aria-pressed={saved}>
            <Bookmark aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
          </button>
        </header>
        <section className="book-entry__hero">
          <div className="book-entry__cover-rail" aria-label={`${book.title} 대표 표지`}>
            <div className="book-entry__cover-slide book-entry__cover-slide--active">
              <BookCoverArtwork book={book} />
            </div>
          </div>
          <p className="book-entry__quote" aria-live="polite">{book.quote}</p>
        </section>
        <section className="book-entry__sheet">
          <div className="book-entry__title">
            <div><h1>{book.title}</h1><p>{book.author}</p></div>
            <span><Clock3 aria-hidden="true" /> 약 1분</span>
          </div>
          <div className="book-entry__question">
            <span>이 책에서 만나게 될 질문</span>
            <strong>{bookQuestion}</strong>
          </div>
          <p className="book-entry__description">{book.description}</p>
          <button type="button" className="book-entry__start" onClick={onStartReading}>
            1분만 들어가보기 <ArrowRight aria-hidden="true" />
          </button>
          <small>
            약 1분 동안 이 책의 문장을 먼저 만나봐
            {book.productUrl && <> · <a href={book.productUrl} target="_blank" rel="noreferrer">YES24 상품 보기</a></>}
          </small>
        </section>
      </div>
    </PhoneFrame>
  );
}

function BookCoverArtwork({ book, coverUrl = book.coverUrl }: { book: FeedBook; coverUrl?: string }) {
  const [hasCoverError, setHasCoverError] = useState(false);

  return (
    <div className={`book-entry__cover cover--${book.coverStyle} ${book.coverPattern ? `cover-pattern--${book.coverPattern}` : ''}`}
      style={{ '--cover-color': book.color, '--cover-ink': book.foreground } as CSSProperties} aria-label={`${book.title} 표지`}>
      {coverUrl && !hasCoverError && (
        // oxlint-disable-next-line next/no-img-element -- 정적 YES24 책 표지 URL을 쓰는 Vite MVP다.
        <img
          className="book-entry__cover-image"
          src={coverUrl}
          alt=""
          aria-hidden="true"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasCoverError(true)}
        />
      )}
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
  selectedGenre,
  viewMode,
  initialScrollTop,
  onGenreChange,
  onViewModeChange,
  onSelectBook,
}: {
  animationsEnabled: boolean;
  selectedGenre: Genre;
  viewMode: ViewMode;
  initialScrollTop: number;
  onGenreChange: (genre: Genre) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onSelectBook: (book: FeedBook, scrollTop: number) => void;
}) {
  const [isGenreMenuOpen, setIsGenreMenuOpen] = useState(false);
  const feedRef = useRef<HTMLDivElement>(null);
  const visibleBooks = selectedGenre === '전체'
    ? FEED_BOOKS
    : FEED_BOOKS.filter((book) => book.genres.includes(selectedGenre));
  const discoveryPairs = buildDiscoveryPairs(visibleBooks, selectedGenre === '전체');

  const selectGenre = (genre: Genre) => {
    onGenreChange(genre);
    setIsGenreMenuOpen(false);
    window.requestAnimationFrame(() => feedRef.current?.scrollTo({ top: 0 }));
  };

  const changeViewMode = (mode: ViewMode) => {
    setIsGenreMenuOpen(false);
    onViewModeChange(mode);
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (feedRef.current) feedRef.current.scrollTop = initialScrollTop;
    });
    return () => window.cancelAnimationFrame(frame);
  }, [initialScrollTop]);

  const selectBook = (book: FeedBook) => {
    onSelectBook(book, feedRef.current?.scrollTop ?? 0);
  };

  return (
    <PhoneFrame
      viewMode={viewMode}
      className={`phone--discover ${animationsEnabled ? 'phone--screen-enter' : 'phone--no-motion'}`}
      ariaLabel="북북 책 탐색 화면"
      note="표지를 둘러보고 오늘 펼칠 책을 골라봐"
    >
        <header className="discover-header">
          <strong>북북 <small>BOOKBOOK</small></strong>
          <button
            type="button"
            aria-label="장르 메뉴"
            aria-expanded={isGenreMenuOpen}
            onClick={() => setIsGenreMenuOpen((current) => !current)}
          >
            {isGenreMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </header>
        {isGenreMenuOpen && viewMode === 'desktop' && (
          <button
            type="button"
            className="genre-menu-backdrop"
            aria-label="메뉴 닫기"
            onClick={() => setIsGenreMenuOpen(false)}
          />
        )}
        {isGenreMenuOpen && (
          <div className={`genre-menu ${viewMode === 'desktop' ? 'genre-menu--desktop' : ''}`} role="menu" aria-label="책 장르 선택">
            {viewMode === 'desktop' ? (
              <>
                <div className="genre-mega__top">
                  <div>
                    <span>BOOKBOOK MENU</span>
                    <strong>오늘은 어떤 방향으로 읽어볼까?</strong>
                    <p>표지보다 먼저, 읽고 싶은 감각부터 골라봐.</p>
                  </div>
                  <ViewModeSetting viewMode={viewMode} onChange={changeViewMode} />
                </div>
                <div className="genre-mega__groups">
                  <section>
                    <span>이야기로 들어가기</span>
                    <strong>서사와 감정이 먼저라면</strong>
                    <p>인물과 사건을 따라가며 빠르게 빠져드는 책들.</p>
                    <div>
                      {(['문학', '고전문학', '로맨스'] as Genre[]).map((genre) => (
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
                  </section>
                  <section>
                    <span>생각으로 들어가기</span>
                    <strong>질문이 먼저 떠오른다면</strong>
                    <p>정보, 관점, 생각거리를 중심으로 고르는 책들.</p>
                    <div>
                      {(['비문학', '자기개발'] as Genre[]).map((genre) => (
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
                  </section>
                  <section>
                    <span>배경으로 고르기</span>
                    <strong>익숙함과 낯섦 사이에서</strong>
                    <p>작품의 언어와 문화권을 기준으로 둘러봐.</p>
                    <div>
                      {(['한국', '해외', '영어원문'] as Genre[]).map((genre) => (
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
                  </section>
                  <section className="genre-mega__all">
                    <span>처음부터 둘러보기</span>
                    <strong>아직 정하지 않았다면</strong>
                    <p>지금 준비된 책 41권을 한 번에 이어서 탐색해.</p>
                    <div>
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={selectedGenre === '전체'}
                        className={selectedGenre === '전체' ? 'genre-menu__item--active' : ''}
                        onClick={() => selectGenre('전체')}
                      >
                        전체 책 보기
                      </button>
                    </div>
                  </section>
                </div>
              </>
            ) : (
              <>
                <ViewModeSetting viewMode={viewMode} onChange={changeViewMode} />
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
              </>
            )}
          </div>
        )}
        <div className="discover-feed" ref={feedRef}>
          <div className="discover-feed__intro">
            <div>
              <span>{selectedGenre === '전체' ? '오늘의 첫 질문' : selectedGenre}</span>
              <strong>둘 중 하나만<br />먼저 펼친다면?</strong>
            </div>
            <p>{visibleBooks.length}권 · 계속 이어짐</p>
          </div>
          <div className="discover-pairs">
            {discoveryPairs.map((pair, pairIndex) => (
              <section
                className={`discover-pair ${pair.books.length === 1 ? 'discover-pair--single' : ''}`}
                key={pair.books.map((book) => book.title).join('::')}
                aria-label={pair.prompt}
              >
                <header className="discover-pair__header">
                  <span>{String(pairIndex + 1).padStart(2, '0')} · {pairIndex === 0 && selectedGenre === '전체' ? '오늘의 두 갈래' : '다음 갈래'}</span>
                  <strong>{pair.prompt}</strong>
                </header>
                <div className="discover-pair__books">
                  {pair.books.map((book, bookIndex) => (
                    <article
                      key={book.title}
                      className="discover-card"
                      style={{ '--card-color': book.color, '--card-foreground': book.foreground } as CSSProperties}
                    >
                      <button type="button" className="discover-card__cover" onClick={() => selectBook(book)} aria-label={`${book.title} 살펴보기`}>
                        <BookCoverArtwork book={book} />
                        {pair.books.length === 2 && <span>{bookIndex === 0 ? 'A' : 'B'}</span>}
                      </button>
                      <button type="button" className="discover-card__info" onClick={() => selectBook(book)}>
                        <strong>{book.title}</strong>
                        <span>{book.author}</span>
                        <p>{getDiscoveryLine(book)}</p>
                      </button>
                    </article>
                  ))}
                </div>
                {discoveryPairs[pairIndex + 1] && (
                  <div className="discover-pair__next" aria-hidden="true">
                    <span>NEXT</span>
                    <strong>{discoveryPairs[pairIndex + 1].prompt}</strong>
                    <ArrowRight aria-hidden="true" />
                  </div>
                )}
              </section>
            ))}
          </div>
          {visibleBooks.length === 0 && (
            <div className="discover-empty">
              <span>{selectedGenre}</span>
              <strong>아직 준비 중이야</strong>
              <p>다른 장르에서 마음에 드는 문장을 찾아봐.</p>
              <button type="button" onClick={() => selectGenre('전체')}>전체 책 보기</button>
            </div>
          )}
          <div className="discover-feed__future-action-space" aria-hidden="true" />
        </div>
    </PhoneFrame>
  );
}
