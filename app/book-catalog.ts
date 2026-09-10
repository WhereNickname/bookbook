/*
 * FILE ROLE: 탐색 피드의 서지 정보와 표지 구성을 제공한다.
 * OWNS: 책 목록 순서, 장르, 소개 문구, 표지 색상과 상징.
 * USES: book-data의 프롤로그와 개발 단계에서 저장한 Kakao Daum 책 표지 매핑.
 * MUST NOT: 본문 요약이나 읽기 상태를 중복 소유한다.
 */
import { getBookContent } from './book-data';
import { BOOK_COVERS } from './book-covers.generated';
export type Genre = '전체' | '문학' | '비문학' | '고전문학' | '로맨스' | '한국' | '해외' | '영어원문' | '자기개발';
export type FeedBook = {
  title: string; author: string; category: string; genres: Genre[];
  coverStyle: string; coverMark: string; coverData: string;
  quote: string; color: string; foreground: string; description: string;
  isbn?: string; coverUrl?: string; coverUrls?: string[];
  coverPattern?: 'wave' | 'orbit' | 'grid' | 'split';
};
const ORIGINAL_BOOKS: FeedBook[] = [
  { title: '데미안', author: '헤르만 헤세', category: '성장 소설', genres: ['고전문학', '해외'], coverStyle: 'demian', coverMark: '½', coverData: 'LIGHT / SHADOW', quote: '새는 알에서 나오려고\n투쟁한다.', color: '#ff5b35', foreground: '#20130e', description: '선과 악의 경계를 넘어 자기 자신에게 도달하려는 한 소년의 내면을 따라가는 성장 소설.' },
  { title: '이방인', author: '알베르 카뮈', category: '고전 소설', genres: ['고전문학', '해외'], coverStyle: 'stranger', coverMark: '●', coverData: '12:00 / ALGER', quote: '오늘 엄마가 죽었다.\n아니, 어쩌면 어제. 모르겠다.', color: '#e6fb63', foreground: '#161616', description: '세상의 규칙과 감정에서 비껴난 한 남자. 무심한 문장 사이로 삶의 부조리를 마주하게 되는 소설.' },
  { title: '싯다르타', author: '헤르만 헤세', category: '고전 소설', genres: ['고전문학', '해외'], coverStyle: 'siddhartha', coverMark: '≈', coverData: 'RIVER / SELF', quote: '강은 어디에나 있으면서\n언제나 현재에만 있었다.', color: '#39b8a6', foreground: '#102f2d', description: '배움과 방황을 지나 흐르는 강 앞에서 삶과 자아의 의미를 발견하는 구도의 이야기.' },
  { title: '채식주의자', author: '한강', category: '한국 소설', genres: ['한국'], coverStyle: 'vegetarian', coverMark: 'Y', coverData: 'ROOT / BODY', quote: '나는 이제\n고기를 먹지 않아요.', color: '#d2e8c5', foreground: '#31542f', description: '한 사람의 조용한 거부가 평범했던 일상을 흔들며 만들어내는 낯설고 강렬한 균열.' },
  { title: '코스모스', author: '칼 세이건', category: '과학 교양', genres: ['해외', '영어원문'], coverStyle: 'cosmos', coverMark: '∞', coverData: '13.8 BY / 10²⁴', quote: '우리는 모두\n별의 물질로 이루어졌다.', color: '#17152d', foreground: '#eee9ff', description: '우주의 탄생에서 인간의 질문까지, 광대한 시공간 속 우리의 위치를 아름답게 설명한다.' },
  { title: '인간실격', author: '다자이 오사무', category: '고전 소설', genres: ['고전문학', '해외'], coverStyle: 'disqualified', coverMark: '失格', coverData: 'HUMAN / NULL', quote: '부끄럼 많은 생애를\n보냈습니다.', color: '#d8d5ce', foreground: '#1a1918', description: '타인의 세계에 섞이지 못한 한 인간의 고백을 통해 불안과 소외의 가장 깊은 곳을 바라본다.' },
  { title: '날개', author: '이상', category: '한국 고전', genres: ['고전문학', '한국'], coverStyle: 'wings', coverMark: '翼', coverData: '0m → ∞', quote: '날개야 다시 돋아라.\n한 번만 더 날아보자.', color: '#7d6cff', foreground: '#151126', description: '닫힌 방과 무기력한 일상을 빠져나가려는 의식의 움직임을 실험적인 문장으로 그린 작품.' },
  { title: '동물농장', author: '조지 오웰', category: '풍자 소설', genres: ['고전문학', '해외', '영어원문'], coverStyle: 'animal-farm', coverMark: '4=2', coverData: 'POWER / RULE', quote: '모든 동물은 평등하다.\n그러나 어떤 동물은 더 평등하다.', color: '#ffde39', foreground: '#2d1710', description: '혁명의 이상이 권력의 언어로 변질되는 과정을 농장의 우화로 날카롭게 보여준다.' },
  { title: '1984', author: '조지 오웰', category: '디스토피아', genres: ['고전문학', '해외', '영어원문'], coverStyle: 'nineteen', coverMark: '◎', coverData: 'BIG BROTHER / 24·7', quote: '누군가는 언제나\n당신을 보고 있다.', color: '#ef3138', foreground: '#19090a', description: '기억과 언어까지 통제하는 사회에서 한 개인이 진실과 자유를 붙잡으려는 디스토피아 소설.' },
  { title: '안나 카레니나', author: '레프 톨스토이', category: '고전 로맨스', genres: ['고전문학', '로맨스', '해외'], coverStyle: 'anna', coverMark: 'A↔V', coverData: 'LOVE / SOCIETY', quote: '사랑은 한 사람의 삶을\n어디까지 바꿀 수 있을까.', color: '#8d1736', foreground: '#fff0df', description: '사랑과 결혼, 욕망과 사회적 시선이 충돌하는 삶을 거대한 인물 군상 속에 담아낸 소설.' },
  { title: '국부론', author: '애덤 스미스', category: '경제 고전', genres: ['고전문학', '해외', '영어원문', '자기개발'], coverStyle: 'wealth', coverMark: '∑', coverData: 'LABOR × MARKET', quote: '부는 금고가 아니라\n사람들의 노동에서 시작된다.', color: '#153f34', foreground: '#f1d36e', description: '분업과 교환, 시장의 작동 원리를 통해 국가와 사회의 부가 어디에서 오는지 탐구한다.' },
  { title: '사피엔스', author: '유발 하라리', category: '역사 교양', genres: ['해외', '자기개발'], coverStyle: 'sapiens', coverMark: '70K', coverData: 'HOMO / STORY', quote: '인간은 함께 믿는 이야기로\n세상을 바꾸었다.', color: '#eadbc0', foreground: '#352716', description: '인지혁명부터 현대까지 인류가 협력하고 문명을 만든 과정을 거대한 시간축으로 압축한다.' },
  { title: '급류', author: '정대건', category: '한국 로맨스', genres: ['한국', '로맨스'], coverStyle: 'rapids', coverMark: '≋', coverData: 'FLOW / IMPACT', quote: '우리는 서로에게\n휩쓸리고 있었다.', color: '#1479e8', foreground: '#f3fbff', description: '상처를 품은 두 사람이 거센 물살 같은 시간 속에서 다시 서로에게 향하는 이야기.' },
  { title: '구의 증명', author: '최진영', category: '한국 소설', genres: ['한국', '로맨스'], coverStyle: 'sphere', coverMark: '○', coverData: 'G ↔ D / ∞', quote: '사라진 뒤에도\n사랑은 몸에 남는다.', color: '#101010', foreground: '#f3eee3', description: '상실한 사람을 기억하고 사랑한다는 일이 얼마나 육체적이고 절실한지 밀도 높게 보여준다.' },
];

const ADDED_BOOKS: FeedBook[] = [
  {"title":"카네기 인간관계론","author":"데일 카네기","category":"자기계발","genres":["비문학","자기개발","해외"],"coverStyle":"relations","coverMark":"↔","coverData":"LISTEN / NAME","color":"#e8b77a","foreground":"#362418","description":"상대의 이름을 부르고 이야기를 듣는 자리에서 시작하는 관계의 기술.","coverPattern":"grid","quote":""},
  {"title":"아토믹 해빗츠","author":"제임스 클리어","category":"자기계발","genres":["비문학","자기개발","해외"],"coverStyle":"atomic","coverMark":"1%","coverData":"CUE / REPEAT","color":"#f2e8d6","foreground":"#262b25","description":"작은 행동이 매일 반복되는 환경과 시스템을 만드는 이야기.","coverPattern":"orbit","quote":""},
  {"title":"역행자","author":"자청","category":"자기계발","genres":["비문학","한국","자기개발"],"coverStyle":"reverse","coverMark":"↶","coverData":"READ / WRITE","color":"#e94b32","foreground":"#201510","description":"익숙한 선택을 돌아보고 읽기와 실행으로 다른 경로를 만드는 일.","coverPattern":"split","quote":""},
  {"title":"설득의 심리학","author":"로버트 치알디니","category":"심리 교양","genres":["비문학","자기개발","해외"],"coverStyle":"influence","coverMark":"YES","coverData":"CLICK / WHIRR","color":"#68369d","foreground":"#fff5e7","description":"선물과 권위와 희소성이 승낙을 이끌어내는 순간을 살핀다.","coverPattern":"orbit","quote":""},
  {"title":"차라투스트라는 이렇게 말했다","author":"프리드리히 니체","category":"철학","genres":["비문학","고전문학","해외"],"coverStyle":"zarathustra","coverMark":"↑","coverData":"SUN / RETURN","color":"#f4bd42","foreground":"#33240b","description":"산에서 내려온 한 사람이 초인과 영원회귀를 말한다.","coverPattern":"split","quote":""},
  {"title":"군주론","author":"니콜로 마키아벨리","category":"정치 철학","genres":["비문학","고전문학","해외"],"coverStyle":"prince","coverMark":"♜","coverData":"FOX / LION","color":"#392d43","foreground":"#f9dfaa","description":"권력을 얻은 뒤 그것을 지키는 군주의 얼굴을 들여다본다.","coverPattern":"grid","quote":""},
  {"title":"공정하다는 착각","author":"마이클 샌델","category":"사회 철학","genres":["비문학","해외"],"coverStyle":"merit","coverMark":"≠","coverData":"MERIT / LUCK","color":"#164d64","foreground":"#e9eddb","description":"합격과 성공을 가르는 선 앞에서 노력과 운의 몫을 묻는다.","coverPattern":"split","quote":""},
  {"title":"죽음의 수용소에서","author":"빅터 프랭클","category":"회고·심리","genres":["비문학","해외"],"coverStyle":"meaning","coverMark":"✦","coverData":"LIFE / MEANING","color":"#414449","foreground":"#f5ead5","description":"모든 것을 빼앗긴 곳에서 삶이 남긴 질문을 붙잡은 기록.","coverPattern":"grid","quote":""},
  {"title":"노인과 바다","author":"어니스트 헤밍웨이","category":"고전 소설","genres":["문학","고전문학","해외"],"coverStyle":"old-sea","coverMark":"↗","coverData":"MARLIN / SEA","color":"#155b83","foreground":"#f5e6c5","description":"혼자 먼바다로 나간 노인과 거대한 청새치의 며칠.","coverPattern":"wave","quote":""},
  {"title":"위대한 개츠비","author":"F. 스콧 피츠제럴드","category":"고전 소설","genres":["문학","고전문학","해외"],"coverStyle":"gatsby","coverMark":"●","coverData":"GREEN / LIGHT","color":"#162f38","foreground":"#94e0ac","description":"파티의 불빛 뒤에서 지나간 사랑을 기다리는 남자.","coverPattern":"orbit","quote":""},
  {"title":"설국","author":"가와바타 야스나리","category":"고전 소설","genres":["문학","고전문학","해외"],"coverStyle":"snow","coverMark":"雪","coverData":"TUNNEL / NIGHT","color":"#e5edf2","foreground":"#263a50","description":"터널 너머 눈의 마을에서 가까워졌다 멀어지는 사람들.","coverPattern":"wave","quote":""},
  {"title":"브람스를 좋아하세요...","author":"프랑수아즈 사강","category":"프랑스 소설","genres":["문학","로맨스","해외"],"coverStyle":"brahms","coverMark":"♬","coverData":"PAULE / SIMON","color":"#632f49","foreground":"#f5d8cd","description":"서로 다른 두 사랑 사이에서 울리는 오래된 질문.","coverPattern":"grid","quote":""},
  {"title":"첫사랑","author":"이반 투르게네프","category":"고전 소설","genres":["문학","로맨스","해외"],"coverStyle":"first-love","coverMark":"Ⅰ","coverData":"SUMMER / WINDOW","color":"#e0b1ad","foreground":"#462b36","description":"별장의 여름과 한 소년이 뒤늦게 알아본 얼굴.","coverPattern":"split","quote":""},
  {"title":"어린 왕자","author":"앙투안 드 생텍쥐페리","category":"철학 동화","genres":["문학","고전문학","해외"],"coverStyle":"little-prince","coverMark":"✧","coverData":"ROSE / B612","color":"#254277","foreground":"#ffe09a","description":"작은 별을 떠난 아이가 장미와 여우와 사막을 만난다.","coverPattern":"orbit","quote":""},
  {"title":"눈먼 자들의 도시","author":"주제 사라마구","category":"디스토피아","genres":["문학","해외"],"coverStyle":"blindness","coverMark":"○","coverData":"WHITE / SIGHT","color":"#d6ded4","foreground":"#263a33","description":"흰빛 속에 갇힌 도시에서 한 사람만 길을 본다.","coverPattern":"orbit","quote":""},
  {"title":"멋진 신세계","author":"올더스 헉슬리","category":"디스토피아","genres":["문학","고전문학","해외"],"coverStyle":"brave","coverMark":"≡","coverData":"SOMA / WORLD","color":"#36747a","foreground":"#f5e9c8","description":"병 속에서 태어난 사람들이 행복하도록 설계된 세계.","coverPattern":"grid","quote":""},
  {"title":"변신","author":"프란츠 카프카","category":"고전 소설","genres":["문학","고전문학","해외"],"coverStyle":"metamorphosis","coverMark":"Ж","coverData":"ROOM / APPLE","color":"#733b29","foreground":"#f3ddbb","description":"아침에 달라진 몸과 방문 밖에서 기다리는 가족.","coverPattern":"split","quote":""},
  {"title":"수레바퀴 아래서","author":"헤르만 헤세","category":"성장 소설","genres":["문학","고전문학","해외"],"coverStyle":"wheel","coverMark":"⊗","coverData":"EXAM / RIVER","color":"#435d4b","foreground":"#e9e2bd","description":"기대받던 소년의 책상에서 강가까지 이어지는 길.","coverPattern":"orbit","quote":""},
  {"title":"오만과 편견","author":"제인 오스틴","category":"고전 로맨스","genres":["문학","로맨스","해외"],"coverStyle":"pride","coverMark":"&","coverData":"LETTER / PRIDE","color":"#d4d7b7","foreground":"#384332","description":"무도회의 첫인상과 한 통의 편지가 바꾸는 관계.","coverPattern":"grid","quote":""},
  {"title":"호밀밭의 파수꾼","author":"J. D. 샐린저","category":"성장 소설","genres":["문학","고전문학","해외"],"coverStyle":"catcher","coverMark":"〰","coverData":"RYE / CLIFF","color":"#d19b40","foreground":"#342918","description":"학교를 떠난 소년이 뉴욕을 걷고 동생을 찾아간다.","coverPattern":"wave","quote":""},
  {"title":"젊은 베르테르의 슬픔","author":"요한 볼프강 폰 괴테","category":"고전 로맨스","genres":["문학","로맨스","해외"],"coverStyle":"werther","coverMark":"✉","coverData":"LOTTE / LETTER","color":"#78968b","foreground":"#152f2b","description":"한 청년의 편지에 쌓이는 여름과 닫힌 문.","coverPattern":"grid","quote":""},
  {"title":"도리언 그레이의 초상","author":"오스카 와일드","category":"고딕 소설","genres":["문학","고전문학","해외"],"coverStyle":"dorian","coverMark":"◇","coverData":"PORTRAIT / YOUTH","color":"#342e50","foreground":"#e0c3a0","description":"얼굴은 젊게 남고 잠긴 방의 초상만 달라진다.","coverPattern":"split","quote":""},
  {"title":"죄와 벌","author":"표도르 도스토옙스키","category":"고전 소설","genres":["문학","고전문학","해외"],"coverStyle":"crime","coverMark":"†","coverData":"AXE / SILENCE","color":"#742b2e","foreground":"#f0d7b1","description":"도끼를 든 청년과 그가 끝내 건너야 하는 문턱.","coverPattern":"split","quote":""},
  {"title":"페스트","author":"알베르 카뮈","category":"고전 소설","genres":["문학","고전문학","해외"],"coverStyle":"plague","coverMark":"×","coverData":"ORAN / GATES","color":"#d2bd57","foreground":"#282a1d","description":"성문이 닫힌 도시에서 매일 환자를 찾아가는 사람들.","coverPattern":"grid","quote":""},
  {"title":"지킬 박사와 하이드 씨","author":"로버트 루이스 스티븐슨","category":"고딕 소설","genres":["문학","고전문학","해외"],"coverStyle":"jekyll","coverMark":"½","coverData":"ONE / TWO","color":"#364f4c","foreground":"#dce8c4","description":"같은 실험실의 문으로 드나드는 두 이름.","coverPattern":"split","quote":""},
  {"title":"폭풍의 언덕","author":"에밀리 브론테","category":"고전 로맨스","genres":["문학","로맨스","해외"],"coverStyle":"wuthering","coverMark":"≋","coverData":"MOOR / WIND","color":"#586075","foreground":"#eee4d0","description":"황야의 두 집을 지나 두 세대로 이어지는 사랑과 복수.","coverPattern":"wave","quote":""},
  {"title":"프랑켄슈타인","author":"메리 셸리","category":"고딕·과학 소설","genres":["문학","고전문학","해외"],"coverStyle":"frankenstein","coverMark":"ϟ","coverData":"LIFE / ICE","color":"#2f5845","foreground":"#dcebc1","description":"생명을 만든 사람과 이름 없이 남겨진 존재의 추격.","coverPattern":"split","quote":""},
];
const originalNonfiction = new Set(['코스모스', '국부론', '사피엔스']);
export const FEED_BOOKS: FeedBook[] = [...ORIGINAL_BOOKS, ...ADDED_BOOKS].map((book) => ({
  ...book,
  ...BOOK_COVERS[book.title],
  genres: [...new Set<Genre>([originalNonfiction.has(book.title) ? '비문학' : book.genres.includes('비문학') ? '비문학' : '문학', ...book.genres])],
  quote: getBookContent(book.title).prologue.join('\n'),
}));
export const GENRES: Genre[] = ['전체', '문학', '비문학', '고전문학', '로맨스', '한국', '해외', '영어원문', '자기개발'];
