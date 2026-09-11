/*
 * FILE ROLE: 책 콘텐츠의 편집 단위와 공통 계약을 정의한다.
 * OWNS: 콘텐츠 타입, 원작 분량 구간, 줄 단위 파서.
 * USES: 콘텐츠 모듈이 작성한 문자열.
 * MUST NOT: 문장부호로 장면을 재분할하거나 UI 상태를 관리한다.
 */
export type BookLength = 'short' | 'novella' | 'medium' | 'long' | 'epic';
export type BookContent = {
  title: string;
  length: BookLength;
  prologue: readonly string[];
  sentences: readonly string[];
  symbol: string;
  quoteSource: string;
};

// 줄바꿈이 편집자가 정한 장면 경계다. 한 줄 안의 마침표는 리듬으로 남긴다.
export function lines(text: string): string[] {
  return text.trim().split('\n').map((line) => line.trim()).filter(Boolean);
}
