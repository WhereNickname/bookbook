'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, ChevronDown, Library, X } from 'lucide-react';

type Book = { id: string; title: string; author: string; hook: string; meta: string; active?: boolean; color: string };

const books: Book[] = [
  { id: 'stranger', title: '이방인', author: '알베르 카뮈', hook: '그는 왜, 아무렇지도 않았을까?', meta: '약 7분 · 100문장', active: true, color: '#df5b37' },
  { id: 'human', title: '인간 실격', author: '다자이 오사무', hook: '웃음 뒤에 숨긴 한 사람의 고백', meta: '곧 만나요', color: '#163c42' },
  { id: 'metamorphosis', title: '변신', author: '프란츠 카프카', hook: '어느 날, 내가 내가 아니게 된다면', meta: '곧 만나요', color: '#574a3f' },
  { id: 'demian', title: '데미안', author: '헤르만 헤세', hook: '껍질을 깨는 일은 왜 아플까?', meta: '곧 만나요', color: '#554f86' },
];

const sentences = [
  { text: '태양 때문이었다고, 그는 말했다.', kind: 'teaser' },
  { text: '사람들은 그의 슬픔보다 태도를 심판했다.', kind: 'teaser' },
  { text: '그리고 마지막에야, 그는 세계를 사랑하게 된다.', kind: 'teaser' },
  { text: '어머니가 세상을 떠났다는 전보가 도착했다.', kind: 'story' },
  { text: '뫼르소는 장례를 위해 양로원으로 향했다.', kind: 'story' },
  { text: '그는 울지 않았고, 피곤함과 더위만을 느꼈다.', kind: 'story' },
  { text: '사람들은 그의 침묵을 오래 기억했다.', kind: 'story' },
  { text: '다음 날, 그는 바다에서 마리를 만났다.', kind: 'story' },
  { text: '두 사람은 웃었고, 함께 영화를 보았다.', kind: 'story' },
  { text: '마리는 사랑하느냐고 물었다.', kind: 'story' },
  { text: '그는 아마 사랑하지 않는 것 같다고 답했다.', kind: 'story' },
  { text: '하지만 결혼은 원한다면 해도 좋다고 말했다.', kind: 'story' },
  { text: '세상은 언제나 이유를 원했지만, 그는 이유를 꾸미지 않았다.', kind: 'story' },
  { text: '그러던 어느 날, 뜨거운 해변에서 모든 것이 달라졌다.', kind: 'story' },
];

function BookCover({ book, small = false }: { book: Book; small?: boolean }) {
  return (
    <div className={`book-cover ${small ? 'book-cover--small' : ''}`} style={{ '--cover-color': book.color } as React.CSSProperties} aria-hidden="true">
      <span className="cover-mark">북북</span>
      <div><span className="cover-author">{book.author}</span><strong>{book.title}</strong></div>
      <span className="cover-edition">BOOKBOOK EDITION</span>
    </div>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<'library' | 'reader'>('library');
  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<'focus' | 'bubble'>('focus');
  const [saved, setSaved] = useState(false);
  const wheelLocked = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const move = useCallback((delta: number) => setIndex((current) => Math.max(0, Math.min(sentences.length - 1, current + delta))), []);
  const changeMode = useCallback((direction: number) => setMode((current) => direction > 0 ? 'bubble' : direction < 0 ? 'focus' : current === 'focus' ? 'bubble' : 'focus'), []);

  useEffect(() => {
    if (screen !== 'reader') return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') move(1);
      if (event.key === 'ArrowUp' || event.key === 'PageUp') move(-1);
      if (event.key === 'ArrowRight') changeMode(1);
      if (event.key === 'ArrowLeft') changeMode(-1);
      if (event.key === 'Escape') setScreen('library');
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [changeMode, move, screen]);

  const openBook = () => { setIndex(0); setMode('focus'); setScreen('reader'); };
  const onWheel = (event: React.WheelEvent) => {
    if (wheelLocked.current || Math.abs(event.deltaY) < 18) return;
    wheelLocked.current = true;
    move(event.deltaY > 0 ? 1 : -1);
    window.setTimeout(() => (wheelLocked.current = false), 520);
  };
  const onTouchEnd = (event: React.TouchEvent) => {
    const start = touchStart.current;
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = start.x - touch.clientX;
    const dy = start.y - touch.clientY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 42) changeMode(dx > 0 ? 1 : -1);
    else if (Math.abs(dy) > 42) move(dy > 0 ? 1 : -1);
    touchStart.current = null;
  };

  if (screen === 'library') return (
    <main className="library-screen">
      <nav className="topbar">
        <a className="wordmark" href="/" aria-label="북북 홈">북북<span>.</span></a>
        <div className="topbar-actions"><button className="text-button" type="button">내 서재</button><button className="avatar" type="button" aria-label="프로필">B</button></div>
      </nav>
      <section className="library-intro">
        <p className="eyebrow">오늘의 책 한 입</p>
        <h1>한 권을 읽고 싶어지는<br />가장 짧은 방법.</h1>
        <p>완벽한 요약 대신, 다음 문장이 궁금해지는 순간을 만나봐.</p>
      </section>
      <section className="shelf" aria-labelledby="shelf-title">
        <div className="section-heading"><div><span className="section-kicker">CURATED FOR YOU</span><h2 id="shelf-title">지금 넘겨볼 책</h2></div><span className="swipe-hint">옆으로 둘러보기 <ArrowRight size={16} /></span></div>
        <div className="book-list">
          {books.map((book) => (
            <article className={`book-card ${book.active ? 'book-card--active' : ''}`} key={book.id}>
              <button type="button" onClick={book.active ? openBook : undefined} aria-label={`${book.title} 읽기`}>
                <BookCover book={book} />
                <div className="book-copy"><span>{book.author}</span><h3>{book.title}</h3><p>{book.hook}</p><small>{book.meta}</small></div>
                {book.active && <span className="start-badge">시작하기 <ArrowRight size={15} /></span>}
              </button>
            </article>
          ))}
        </div>
      </section>
      <footer className="library-footer"><Library size={15} /> 책을 끝내는 앱이 아니라, 시작하게 하는 앱</footer>
    </main>
  );

  const previous = sentences[index - 1];
  const current = sentences[index];
  const next = sentences[index + 1];
  const isTeaser = current.kind === 'teaser';
  const visibleNumber = isTeaser ? index + 1 : index - 2;

  return (
    <main className={`reader-screen reader-screen--${mode}`} onWheel={onWheel}
      onTouchStart={(event) => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }} onTouchEnd={onTouchEnd}>
      <header className="reader-header">
        <button type="button" className="icon-button" onClick={() => setScreen('library')} aria-label="책 선택으로 돌아가기"><X size={21} strokeWidth={1.7} /></button>
        <div className="reader-book"><BookCover book={books[0]} small /><div><strong>이방인</strong><span>알베르 카뮈</span></div></div>
        <button type="button" className={`icon-button ${saved ? 'is-saved' : ''}`} onClick={() => setSaved(!saved)} aria-label="책갈피"><Bookmark size={20} fill={saved ? 'currentColor' : 'none'} strokeWidth={1.7} /></button>
      </header>
      <div className="mode-tabs" role="tablist" aria-label="읽기 방식">
        <button role="tab" aria-selected={mode === 'focus'} onClick={() => setMode('focus')}>집중</button>
        <button role="tab" aria-selected={mode === 'bubble'} onClick={() => setMode('bubble')}>말풍선</button>
        <span className={`tab-indicator tab-indicator--${mode}`} />
      </div>
      <section className="reader-stage" aria-live="polite">
        <p className="reader-phase">{isTeaser ? '먼저, 세 문장' : '이야기의 시작'}</p>
        <div className="sentence-stack" key={`${mode}-${index}`}>
          <button className="sentence sentence--previous" type="button" onClick={() => move(-1)} disabled={!previous}>{previous?.text ?? ''}</button>
          <div className="current-wrap"><span className="counter">{isTeaser ? `${visibleNumber}/3` : `${visibleNumber}/100`}</span><p className="sentence sentence--current">{current.text}</p></div>
          <button className="sentence sentence--next" type="button" onClick={() => move(1)} disabled={!next}>{next?.text ?? '이 다음은, 책에서 계속됩니다.'}</button>
        </div>
      </section>
      <div className="reader-controls">
        <button type="button" onClick={() => changeMode(mode === 'focus' ? 1 : -1)} className="mode-guide"><ArrowLeft size={14} /> {mode === 'focus' ? '옆으로 넘겨 말풍선으로' : '옆으로 넘겨 집중 모드로'} <ArrowRight size={14} /></button>
        <button type="button" onClick={() => move(1)} disabled={!next} className="down-button" aria-label="다음 문장"><ChevronDown size={22} /></button>
      </div>
      <div className="progress-line"><span style={{ width: `${((index + 1) / sentences.length) * 100}%` }} /></div>
    </main>
  );
}
