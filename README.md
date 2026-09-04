# Bookbook 프로토타입

짧은 문장 단위로 책을 넘겨 읽는 Bookbook 샘플이다.

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

- `app/page.tsx`: 화면, 제스처, 문체 선택 메뉴
- `app/book-data.ts`: 프롤로그와 본문 문장 데이터
- `app/globals.css`: 레이아웃·서체·애니메이션 스타일
