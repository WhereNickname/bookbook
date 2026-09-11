/*
 * FILE ROLE: 하드코딩된 카탈로그를 Daum 책 검색에서 한 번 조회해 정적 표지 매핑을 생성한다.
 * OWNS: 제목과 저자 기준 대표 판본 검색, 중복 제거, book-covers.generated.ts 출력.
 * USES: KAKAO_REST_API_KEY 환경변수와 Kakao Daum 책 검색 REST API.
 * MUST NOT: 앱 런타임에서 실행되거나 REST API 키를 출력·저장한다.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const catalogPath = path.join(root, 'app', 'book-catalog.ts');
const outputPath = path.join(root, 'app', 'book-covers.generated.ts');
const apiKey = process.env.KAKAO_REST_API_KEY;

if (!apiKey) {
  throw new Error('KAKAO_REST_API_KEY가 필요합니다. .env.local에 설정하세요.');
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

const normalize = (value) => value.toLocaleLowerCase().replace(/[\s.…·:,'"-]/gu, '');
const selectIsbn = (value = '') => {
  const identifiers = value.split(/\s+/u).filter(Boolean);
  return identifiers.find((identifier) => identifier.length === 13)
    ?? identifiers.find((identifier) => identifier.length === 10);
};

const stored = {};
for (const book of books) {
  const searchTitle = searchAliases[book.title] ?? book.title;
  const query = new URLSearchParams({
    query: searchTitle,
    target: 'title',
    sort: 'accuracy',
    size: '50',
  });
  const response = await fetch(`https://dapi.kakao.com/v3/search/book?${query}`, {
    headers: { Authorization: `KakaoAK ${apiKey}` },
  });
  if (!response.ok) throw new Error(`${book.title}: Kakao Daum 책 검색 ${response.status}`);
  const payload = await response.json();
  const title = normalize(searchTitle);
  const author = normalize(book.author);
  const candidates = (payload.documents ?? []).filter((item) => item.thumbnail);
  const matchingCandidates = candidates.filter((item) => {
    const candidateTitle = normalize(item.title ?? '');
    const candidateAuthors = normalize((item.authors ?? []).join(' '));
    return candidateTitle.includes(title) && (candidateAuthors.includes(author) || author.includes(candidateAuthors));
  });
  const titleCandidates = candidates.filter((item) => normalize(item.title ?? '').includes(title));
  const orderedCandidates = [...matchingCandidates, ...titleCandidates];
  const uniqueCandidates = [...new Map(orderedCandidates.map((item) => [item.thumbnail, item])).values()].slice(0, 1);

  if (uniqueCandidates.length === 0) {
    console.warn(`표지 없음: ${book.title}`);
    continue;
  }

  const covers = uniqueCandidates.map((candidate) => {
    const isbn = selectIsbn(candidate.isbn);
    return {
      ...(isbn ? { isbn } : {}),
      coverUrl: candidate.thumbnail.replace(/^http:/u, 'https:'),
    };
  });
  stored[book.title] = {
    ...covers[0],
    coverUrls: covers.map((cover) => cover.coverUrl),
  };
  console.log(`표지 확보: ${book.title} (${covers.length}종)`);
}

const output = `/*
 * FILE ROLE: 개발 단계에서 확정한 Kakao Daum 책 표지 식별자와 URL을 정적으로 제공한다.
 * OWNS: 책 제목별 대표 ISBN과 판본 표지 URL 스냅샷.
 * USES: collect-kakao-book-covers 스크립트가 생성한 공개 Daum 책 메타데이터.
 * MUST NOT: 런타임 API 요청이나 표지 검색을 수행한다.
 */
export type StoredBookCover = {
  isbn?: string;
  coverUrl: string;
  coverUrls: string[];
};

export const BOOK_COVERS: Record<string, StoredBookCover> = ${JSON.stringify(stored, null, 2)};
`;
await fs.writeFile(outputPath, output, 'utf8');
console.log(`${Object.keys(stored).length}/${books.length}권 표지 저장 완료`);
