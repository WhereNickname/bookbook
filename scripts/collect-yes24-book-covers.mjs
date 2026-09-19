/*
 * FILE ROLE: 하드코딩된 카탈로그를 YES24 상품 검색에서 한 번 조회해 정적 표지 매핑을 생성한다.
 * OWNS: 제목과 저자 기준 대표 판본 선택, 표지·ISBN·상품 링크 스냅샷 출력.
 * USES: YES24_API_KEY 환경변수와 YES24 Goods 상품 검색 API.
 * MUST NOT: 앱 런타임에서 실행되거나 API 키를 출력·저장한다.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'app', 'book-catalog.ts');
const outputPath = path.join(root, 'app', 'book-covers.generated.ts');
const apiKey = process.env.YES24_API_KEY;

if (!apiKey) {
  throw new Error('YES24_API_KEY가 필요합니다. .env.local에 설정하세요.');
}

const catalogSource = await fs.readFile(catalogPath, 'utf8');
const entryPattern = /title:\s*'([^']+)',\s*author:\s*'([^']+)'|"title":"([^"]+)","author":"([^"]+)"/gu;
const books = [...catalogSource.matchAll(entryPattern)].map((match) => ({
  title: match[1] ?? match[3],
  author: match[2] ?? match[4],
}));
const searchAliases = {
  '아토믹 해빗츠': '아주 작은 습관의 힘',
};

const normalize = (value = '') => value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
const scoreCandidate = (candidate, searchTitle, author) => {
  const candidateTitle = normalize(candidate.title);
  const candidateAuthor = normalize(candidate.author);
  const normalizedTitle = normalize(searchTitle);
  const normalizedAuthor = normalize(author);
  let score = 0;

  if (candidateTitle === normalizedTitle) score += 100;
  else if (candidateTitle.startsWith(normalizedTitle)) score += 80;
  else if (candidateTitle.includes(normalizedTitle)) score += 60;
  else if (normalizedTitle.includes(candidateTitle)) score += 35;

  if (candidateAuthor.includes(normalizedAuthor) || normalizedAuthor.includes(candidateAuthor)) score += 45;
  if (normalize(candidate.author).includes(normalize(`${author} 저`))) score += 25;
  if (/\b원저\b|\b글\b|\b그림\b|편역|각색|축약|다이제스트|초등|어린이/iu.test(candidate.author ?? '')) score -= 35;
  if (/어린이|초등|청소년|만화|그래픽노블/iu.test(candidate.title ?? '')) score -= 30;
  if (candidate.goodsType === '국내도서') score += 5;
  if (candidate.itemStatus === '판매중') score += 3;
  return score;
};

const stored = {};
for (const book of books) {
  const searchTitle = searchAliases[book.title] ?? book.title;
  const query = new URLSearchParams({
    query: searchTitle,
    category: 'BOOK',
    sort: 'RELATION',
    page: '1',
    pageSize: '100',
  });
  const response = await fetch(`https://apis.yes24.com/v1/goods/itemList?${query}`, {
    headers: { 'X-Api-Key': apiKey },
  });
  if (!response.ok) throw new Error(`${book.title}: YES24 상품 검색 ${response.status}`);
  const payload = await response.json();
  const candidates = (payload.data?.items ?? []).filter((item) => item.cover && item.link);
  const ranked = candidates
    .map((candidate) => ({ candidate, score: scoreCandidate(candidate, searchTitle, book.author) }))
    .sort((left, right) => right.score - left.score || left.candidate.sortOrder - right.candidate.sortOrder);
  const selected = ranked[0];

  if (!selected || selected.score < 60) {
    console.warn(`표지 없음: ${book.title} / ${book.author}`);
    continue;
  }

  stored[book.title] = {
    itemId: selected.candidate.itemId,
    ...(selected.candidate.isbn13 ? { isbn: selected.candidate.isbn13 } : {}),
    coverUrl: selected.candidate.cover.replace(/^http:/u, 'https:'),
    coverUrls: [selected.candidate.cover.replace(/^http:/u, 'https:')],
    productUrl: selected.candidate.link.replace(/^http:/u, 'https:'),
  };
  console.log(`표지 확보: ${book.title} ← ${selected.candidate.title} / ${selected.candidate.author}`);
}

const output = `/*
 * FILE ROLE: 개발 단계에서 확정한 YES24 책 표지 식별자와 상품 링크를 정적으로 제공한다.
 * OWNS: 책 제목별 대표 상품 번호, ISBN, 표지 URL과 YES24 상품 URL 스냅샷.
 * USES: collect-yes24-book-covers 스크립트가 생성한 YES24 공개 상품 메타데이터.
 * MUST NOT: 런타임 API 요청이나 표지 검색을 수행한다.
 */
export type StoredBookCover = {
  itemId: number;
  isbn?: string;
  coverUrl: string;
  coverUrls: string[];
  productUrl: string;
};

export const BOOK_COVERS: Record<string, StoredBookCover> = ${JSON.stringify(stored, null, 2)};
`;
await fs.writeFile(outputPath, output, 'utf8');
console.log(`${Object.keys(stored).length}/${books.length}권 YES24 표지 저장 완료`);
