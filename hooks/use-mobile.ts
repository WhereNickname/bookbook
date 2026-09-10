/*
 * FILE ROLE: 현재 브라우저 화면이 모바일 기준 너비인지 React 상태로 제공한다.
 * OWNS: 미디어 쿼리 구독과 모바일 여부 스냅샷.
 * USES: 브라우저 matchMedia API와 React 상태 수명주기.
 * MUST NOT: 레이아웃을 직접 변경하거나 전역 resize 이벤트를 소유한다.
 */
import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}
