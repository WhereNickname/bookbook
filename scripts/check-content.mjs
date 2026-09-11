/*
 * FILE ROLE: 실제 콘텐츠와 카탈로그 사이의 출판 규칙을 검사한다.
 * OWNS: 누락·중복·15~25문장 상한·상징 검사와 실패 종료 코드.
 * USES: TypeScript 변환기와 읽기 전용 로컬 콘텐츠 모듈.
 * MUST NOT: 콘텐츠를 자동 수정하거나 앱을 실행한다.
 */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = new Map();
function load(file) {
  const absolute = path.resolve(root, file);
  if (cache.has(absolute)) return cache.get(absolute);
  const moduleRecord = { exports: {} };
  cache.set(absolute, moduleRecord.exports);
  const code = ts.transpileModule(fs.readFileSync(absolute, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  // oxlint-disable-next-line typescript/no-implied-eval -- 격리된 로컬 TypeScript 콘텐츠만 CommonJS로 평가한다.
  new Function('require', 'module', 'exports', code)((specifier) => {
    if (!specifier.startsWith('.')) throw new Error('Only local content imports are allowed');
    return load(path.resolve(path.dirname(absolute), `${specifier}.ts`));
  }, moduleRecord, moduleRecord.exports);
  return moduleRecord.exports;
}

const { ALL_CONTENT, getBookContent } = load('app/book-data.ts');
const { FEED_BOOKS } = load('app/book-catalog.ts');
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };
check(ALL_CONTENT.length === 41 && FEED_BOOKS.length === 41, '전체 41권이어야 함');
check(new Set(ALL_CONTENT.map((b) => b.title)).size === ALL_CONTENT.length, '콘텐츠 중복');
check(new Set(FEED_BOOKS.map((b) => b.title)).size === FEED_BOOKS.length, '카탈로그 중복');
for (const book of ALL_CONTENT) {
  check(book.prologue.length >= 2 && book.prologue.length <= 3, `${book.title}: 프롤로그 수`);
  check(book.sentences.length >= 15 && book.sentences.length <= 25, `${book.title}: 본문 수`);
  check(book.sentences.some((s) => s.includes(book.symbol)), `${book.title}: 상징 누락 ${book.symbol}`);
  check(book.quoteSource.length > 0, `${book.title}: 프롤로그 출처 메모 누락`);
}
for (const book of FEED_BOOKS) {
  const content = getBookContent(book.title);
  check(book.quote === content.prologue.join('\n'), `${book.title}: 피드 프롤로그 불일치`);
  check(book.genres.includes('문학') !== book.genres.includes('비문학'), `${book.title}: 대분류 오류`);
}
if (process.argv.includes('--json')) console.log(JSON.stringify(ALL_CONTENT));
else if (errors.length) console.error(errors.join('\n'));
else console.log(`PASS: ${ALL_CONTENT.length}권, 프롤로그 ${ALL_CONTENT.reduce((n,b)=>n+b.prologue.length,0)}줄, 본문 ${ALL_CONTENT.reduce((n,b)=>n+b.sentences.length,0)}줄`);
if (errors.length) process.exitCode = 1;
