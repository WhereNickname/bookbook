# Bookbook 프로토타입

짧은 문장 단위로 책을 넘겨 읽는 Bookbook 샘플이다.

## 실행 방법

Node.js 22.13 이상을 설치한 뒤, 압축을 푼 폴더에서 아래 명령을 실행한다.

```bash
npm ci
npm run dev
```

터미널에 표시되는 주소(보통 `http://localhost:5173`)를 브라우저에서 열면 된다.

## 배포용 빌드 확인

```bash
npm run build
npm run start
```

이 프로젝트는 별도 환경 변수나 데이터베이스 설정 없이 실행된다. 폰트는 웹폰트로 자동 로드된다.

## 주요 파일

- `app/page.tsx`: 화면, 제스처, 문체 선택 메뉴
- `app/book-data.ts`: 프롤로그와 본문 문장 데이터
- `app/globals.css`: 레이아웃·서체·애니메이션 스타일
