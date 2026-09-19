# Bookbook 프로토타입

41권의 분위기를 짧은 문장 단위로 먼저 만나고, 일반 리더나 전자책 형식으로 읽어보는 Bookbook 샘플이다.

## 처음 한 번만: Node.js 설치

이 프로젝트를 실행하려면 Node.js가 필요하다. [Node.js 공식 다운로드 페이지](https://nodejs.org/ko/download)에서 **LTS(권장) 버전**의 Windows Installer(`.msi`)를 내려받아 설치한다. 설치 과정은 기본 옵션 그대로 진행하면 된다.

설치가 끝나면 열려 있던 PowerShell 또는 터미널을 닫았다가 다시 열고, 아래 명령으로 설치를 확인한다.

```bash
node -v
npm -v
```

두 명령 모두 버전 숫자가 나오면 준비 완료다. Node.js는 22.13 이상이 필요하다.

## 실행 방법

압축을 푼 `bookbook-prototype` 폴더를 열고, 폴더 안에서 PowerShell 또는 터미널을 연 뒤 아래 명령을 순서대로 실행한다.

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

- `app/page.tsx`: 책 탐색·소개·리더 화면, 제스처와 화면 설정
- `app/book-catalog.ts`: 탐색 화면에 사용하는 41권의 서지·분류 정보
- `app/book-data.ts`: 책 콘텐츠 조회 API
- `app/content-*.ts`: 프롤로그와 장면 중심 미리보기 원고
- `app/globals.css`: 레이아웃·서체·애니메이션 스타일
- `scripts/check-content.mjs`: 41권 구성과 콘텐츠 규칙 검사
- `docs/BOOK_CONTENT_REVIEW.md`: 현재 앱 원고에서 자동 생성한 전체 검수본

## 콘텐츠 확인

```bash
npm run check:content
npm run generate:review
```

원고는 `app/content-*.ts`에서 수정한다. 검수본은 직접 고치지 않고 `generate:review`로 다시 만든다.
