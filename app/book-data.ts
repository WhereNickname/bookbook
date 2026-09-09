/*
 * FILE ROLE: 북북의 책별 콘텐츠 조회 API를 공개한다.
 * OWNS: 외부에서 사용하는 콘텐츠 진입점.
 * USES: book-content의 통합 목록과 조회 함수.
 * MUST NOT: 콘텐츠를 중복 보관하거나 화면 상태를 관리한다.
 */
export { ALL_CONTENT, getBookContent } from './book-content';
