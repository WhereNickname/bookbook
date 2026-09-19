/*
 * FILE ROLE: 현재 앱 콘텐츠에서 사람이 읽을 수 있는 전체 검수본을 생성한다.
 * OWNS: 검수본의 제목, 작품별 번호 매김, 메타데이터 표기 형식.
 * USES: check-content의 JSON 출력과 docs/BOOK_CONTENT_REVIEW.md.
 * MUST NOT: 앱 콘텐츠를 수정하거나 작품 문장을 재작성한다.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const checker = path.join(root, 'scripts', 'check-content.mjs');
const output = path.join(root, 'docs', 'BOOK_CONTENT_REVIEW.md');
const books = JSON.parse(execFileSync(process.execPath, [checker, '--json'], { encoding: 'utf8' }));

const numberLines = (lines) => lines.map((line, index) => `${index + 1}. ${line}`).join('\n');
const prologueCount = books.reduce((total, book) => total + book.prologue.length, 0);
const sentenceCount = books.reduce((total, book) => total + book.sentences.length, 0);

const sections = books.map((book) => `## ${book.title}

- 분량 분류: ${book.length}
- 상징: ${book.symbol}
- 출처 및 편집 메모: ${book.quoteSource}

### 프롤로그 (${book.prologue.length}줄)

${numberLines(book.prologue)}

### 본문 (${book.sentences.length}줄)

${numberLines(book.sentences)}`);

const markdown = `# 북북 전체 콘텐츠 검수본

이 문서는 현재 앱이 실제로 사용하는 콘텐츠에서 자동 생성한다. 줄바꿈 하나가 일반 리더의 문장 한 장면이며, 프롤로그와 본문 번호는 별개다.

- 전체: ${books.length}권
- 프롤로그: ${prologueCount}줄
- 본문: ${sentenceCount}줄
- 생성 명령: \`npm run generate:review\`
- 검증 명령: \`npm run check:content\`

문장 수정은 이 문서가 아니라 \`app/content-*.ts\`에서 한다. 이 문서는 검수용 결과물이므로 직접 편집하지 않는다.

${sections.join('\n\n')}
`;

fs.writeFileSync(output, markdown, 'utf8');
console.log(`WROTE: ${path.relative(root, output)} (${books.length}권, 프롤로그 ${prologueCount}줄, 본문 ${sentenceCount}줄)`);
