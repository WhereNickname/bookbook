/*
 * FILE ROLE: 편집된 책 콘텐츠를 제목으로 조회하는 단일 진입점을 제공한다.
 * OWNS: 전체 콘텐츠 목록과 조회 인덱스.
 * USES: 기존 책, 비문학, 문학, 추가 선정 콘텐츠 모듈.
 * MUST NOT: 문장을 마침표로 재분할하거나 UI 상태를 관리한다.
 */
import { EXISTING_CONTENT } from './content-existing';
import { NONFICTION_CONTENT } from './content-nonfiction';
import { LITERATURE_CONTENT } from './content-literature';
import { ADDITIONAL_CONTENT } from './content-additional';

export const ALL_CONTENT = [...EXISTING_CONTENT, ...NONFICTION_CONTENT, ...LITERATURE_CONTENT, ...ADDITIONAL_CONTENT];
const contentByTitle = new Map(ALL_CONTENT.map((book) => [book.title, book]));

export function getBookContent(title: string) {
  const book = contentByTitle.get(title);
  if (!book) throw new Error(`읽기 콘텐츠가 없는 책: ${title}`);
  return book;
}
