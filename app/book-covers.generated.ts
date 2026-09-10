/*
 * FILE ROLE: 개발 단계에서 확정한 Kakao Daum 책 표지 식별자와 URL을 정적으로 제공한다.
 * OWNS: 책 제목별 대표 ISBN과 판본 표지 URL 스냅샷.
 * USES: collect-kakao-book-covers 스크립트가 생성한 공개 Daum 책 메타데이터.
 * MUST NOT: 런타임 API 요청이나 표지 검색을 수행한다.
 */
export type StoredBookCover = {
  isbn?: string;
  coverUrl: string;
  coverUrls: string[];
};

export const BOOK_COVERS: Record<string, StoredBookCover> = {
  "1984": {
    "isbn": "9788937460777",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20260826111033",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20260826111033",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5912874%3Ftimestamp%3D20260531094001",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5416480%3Ftimestamp%3D20260121140825"
    ]
  },
  "데미안": {
    "isbn": "9788937460449",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540810%3Ftimestamp%3D20260826111023",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540810%3Ftimestamp%3D20260826111023",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5449693%3Ftimestamp%3D20260815134554",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6295770%3Ftimestamp%3D20260715124055"
    ]
  },
  "이방인": {
    "isbn": "9788937443848",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5132886%3Ftimestamp%3D20260905114317",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5132886%3Ftimestamp%3D20260905114317",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6846943%3Ftimestamp%3D20260830121209",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5226891%3Ftimestamp%3D20220915005947"
    ]
  },
  "싯다르타": {
    "isbn": "9788937460586",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540824%3Ftimestamp%3D20260826111024",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540824%3Ftimestamp%3D20260826111024",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4849029%3Ftimestamp%3D20260308113209",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6937175%3Ftimestamp%3D20260108152153"
    ]
  },
  "채식주의자": {
    "isbn": "9788936434595",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6042324%3Ftimestamp%3D20260520123045",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6042324%3Ftimestamp%3D20260520123045",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F532403%3Ftimestamp%3D20260531080611",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6761182%3Ftimestamp%3D20260521122933"
    ]
  },
  "코스모스": {
    "isbn": "9788983711540",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1164422%3Ftimestamp%3D20250926110305",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1164422%3Ftimestamp%3D20250926110305",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1164431%3Ftimestamp%3D20260826111032",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7247471%3Ftimestamp%3D20260716123236"
    ]
  },
  "인간실격": {
    "isbn": "9788937461033",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540869%3Ftimestamp%3D20260826111033",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540869%3Ftimestamp%3D20260826111033",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7219943%3Ftimestamp%3D20260528150714",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F644791%3Ftimestamp%3D20220925172606"
    ]
  },
  "날개": {
    "isbn": "9788994353470",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1417390%3Ftimestamp%3D20221011181548",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1417390%3Ftimestamp%3D20221011181548",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7251725%3Ftimestamp%3D20260903150114",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F476766%3Ftimestamp%3D20211014160235"
    ]
  },
  "동물농장": {
    "isbn": "9788937460050",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540771%3Ftimestamp%3D20260826111023",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540771%3Ftimestamp%3D20260826111023",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5416572%3Ftimestamp%3D20251128141127",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5450099%3Ftimestamp%3D20260424140937"
    ]
  },
  "안나 카레니나": {
    "isbn": "9791176337175",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7182677%3Ftimestamp%3D20260321124041",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7182677%3Ftimestamp%3D20260321124041",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7182758%3Ftimestamp%3D20260321124009",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7182727%3Ftimestamp%3D20260321124042"
    ]
  },
  "국부론": {
    "isbn": "9791139716474",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6529836%3Ftimestamp%3D20251004121212",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6529836%3Ftimestamp%3D20251004121212",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6154645%3Ftimestamp%3D20260807154138",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F618021%3Ftimestamp%3D20220410081701"
    ]
  },
  "사피엔스": {
    "isbn": "9788934972464",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20260113110825",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20260113110825",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6259974%3Ftimestamp%3D20241107165004",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5893859%3Ftimestamp%3D20260609120616"
    ]
  },
  "급류": {
    "isbn": "9788937473401",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6252051%3Ftimestamp%3D20251126160850",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6252051%3Ftimestamp%3D20251126160850",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6946789%3Ftimestamp%3D20260823122116",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7086452%3Ftimestamp%3D20260220121605"
    ]
  },
  "구의 증명": {
    "isbn": "9791167372864",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6336669%3Ftimestamp%3D20260822122607",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6336669%3Ftimestamp%3D20260822122607",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F737566%3Ftimestamp%3D20230610165600",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6458863%3Ftimestamp%3D20260904122752"
    ]
  },
  "카네기 인간관계론": {
    "isbn": "9791187142560",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5082004%3Ftimestamp%3D20260612114518",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5082004%3Ftimestamp%3D20260612114518",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6690257%3Ftimestamp%3D20260306123757",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F730728%3Ftimestamp%3D20250221113150"
    ]
  },
  "아토믹 해빗츠": {
    "isbn": "9791162540640",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4881578%3Ftimestamp%3D20260613113059",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4881578%3Ftimestamp%3D20260613113059",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7086598%3Ftimestamp%3D20260127151833",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5038017%3Ftimestamp%3D20251227125359"
    ]
  },
  "역행자": {
    "isbn": "9788901260716",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6079127%3Ftimestamp%3D20231118154505",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6079127%3Ftimestamp%3D20231118154505",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6356276%3Ftimestamp%3D20260724145958",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6365011"
    ]
  },
  "설득의 심리학": {
    "isbn": "9788950950002",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6334139%3Ftimestamp%3D20260531094829",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6334139%3Ftimestamp%3D20260531094829",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F621056%3Ftimestamp%3D20260220110842",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F625459%3Ftimestamp%3D20220420200133"
    ]
  },
  "차라투스트라는 이렇게 말했다": {
    "isbn": "9788937460944",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540860%3Ftimestamp%3D20251205142723",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540860%3Ftimestamp%3D20251205142723",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6978977%3Ftimestamp%3D20260613121207",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6066178%3Ftimestamp%3D20260429145918"
    ]
  },
  "군주론": {
    "isbn": "9791166817878",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5799446%3Ftimestamp%3D20260424143250",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5799446%3Ftimestamp%3D20260424143250",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6462189%3Ftimestamp%3D20260908123627",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1011247%3Ftimestamp%3D20260404110736"
    ]
  },
  "공정하다는 착각": {
    "isbn": "9791164136452",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5506904%3Ftimestamp%3D20251028141153",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5506904%3Ftimestamp%3D20251028141153",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6092609%3Ftimestamp%3D20260807153848",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6007744%3Ftimestamp%3D20240802163610"
    ]
  },
  "죽음의 수용소에서": {
    "isbn": "9788936811549",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5393249%3Ftimestamp%3D20260828121235",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5393249%3Ftimestamp%3D20260828121235",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5383127%3Ftimestamp%3D20260823120122",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7111538%3Ftimestamp%3D20260401124425"
    ]
  },
  "노인과 바다": {
    "isbn": "9788937462788",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F541126%3Ftimestamp%3D20260826111025",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F541126%3Ftimestamp%3D20260826111025",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6846559%3Ftimestamp%3D20260725124359",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F691286%3Ftimestamp%3D20260828111417"
    ]
  },
  "위대한 개츠비": {
    "isbn": "9788937460753",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540841%3Ftimestamp%3D20251204110720",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540841%3Ftimestamp%3D20251204110720",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F690408%3Ftimestamp%3D20260207110832",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6686981%3Ftimestamp%3D20250522155121"
    ]
  },
  "설국": {
    "isbn": "9788937460616",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540827%3Ftimestamp%3D20260826111033",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540827%3Ftimestamp%3D20260826111033",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F362299%3Ftimestamp%3D20260901111234",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6044702%3Ftimestamp%3D20221011170719"
    ]
  },
  "브람스를 좋아하세요...": {
    "isbn": "9788937461798",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540945%3Ftimestamp%3D20260826111025",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540945%3Ftimestamp%3D20260826111025",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5882057%3Ftimestamp%3D20260429144906",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1226477%3Ftimestamp%3D20190127093925"
    ]
  },
  "첫사랑": {
    "isbn": "9788937460807",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540846%3Ftimestamp%3D20260609110725",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540846%3Ftimestamp%3D20260609110725",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7252114%3Ftimestamp%3D20260903150121",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1033411%3Ftimestamp%3D20221025124419"
    ]
  },
  "어린 왕자": {
    "isbn": "9788932917245",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F507587%3Ftimestamp%3D20251119111036",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F507587%3Ftimestamp%3D20251119111036",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5751376%3Ftimestamp%3D20260207142921",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5851207%3Ftimestamp%3D20260501122629"
    ]
  },
  "눈먼 자들의 도시": {
    "isbn": "9788973374939",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1020120%3Ftimestamp%3D20251111110820",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1020120%3Ftimestamp%3D20251111110820",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1020012%3Ftimestamp%3D20221108003111",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F253637%3Ftimestamp%3D20251205140330"
    ]
  },
  "멋진 신세계": {
    "isbn": "9788973814725",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1027553%3Ftimestamp%3D20260905111102",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1027553%3Ftimestamp%3D20260905111102",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6768669%3Ftimestamp%3D20260826144750",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F478524%3Ftimestamp%3D20260319110816"
    ]
  },
  "변신": {
    "isbn": "9788954600200",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F689490%3Ftimestamp%3D20260822111017",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F689490%3Ftimestamp%3D20260822111017",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540770%3Ftimestamp%3D20250919110253",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6846772%3Ftimestamp%3D20260708123758"
    ]
  },
  "수레바퀴 아래서": {
    "isbn": "9788937460500",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540816%3Ftimestamp%3D20241113114441",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540816%3Ftimestamp%3D20241113114441",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1644789%3Ftimestamp%3D20251030110405",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1587494%3Ftimestamp%3D20221025151225"
    ]
  },
  "오만과 편견": {
    "isbn": "9788937460883",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540854%3Ftimestamp%3D20260826111024",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540854%3Ftimestamp%3D20260826111024",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6869076%3Ftimestamp%3D20260225150946",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1037682%3Ftimestamp%3D20200417155758"
    ]
  },
  "호밀밭의 파수꾼": {
    "isbn": "9791155615089",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6628128%3Ftimestamp%3D20250521223646",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6628128%3Ftimestamp%3D20250521223646",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4382499%3Ftimestamp%3D20190228132115",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4431540%3Ftimestamp%3D20190228195652"
    ]
  },
  "젊은 베르테르의 슬픔": {
    "isbn": "9788937460258",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540791%3Ftimestamp%3D20251206110932",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540791%3Ftimestamp%3D20251206110932",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7209412%3Ftimestamp%3D20260719144826",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6856933%3Ftimestamp%3D20260401124332"
    ]
  },
  "도리언 그레이의 초상": {
    "isbn": "9788937429859",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6062691%3Ftimestamp%3D20251217145749",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6062691%3Ftimestamp%3D20251217145749",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6589690%3Ftimestamp%3D20240517160835",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F794196%3Ftimestamp%3D20220915003404"
    ]
  },
  "죄와 벌": {
    "isbn": "9791176844451",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7266282%3Ftimestamp%3D20260723103804",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7266282%3Ftimestamp%3D20260723103804",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7223023%3Ftimestamp%3D20260521123638",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7223371%3Ftimestamp%3D20260521123628"
    ]
  },
  "페스트": {
    "isbn": "9788937462672",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F541101%3Ftimestamp%3D20241128114055",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F541101%3Ftimestamp%3D20241128114055",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7138006%3Ftimestamp%3D20260701151400",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1585287%3Ftimestamp%3D20221108013331"
    ]
  },
  "지킬 박사와 하이드 씨": {
    "isbn": "9788937464638",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6853590%3Ftimestamp%3D20260827124527",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6853590%3Ftimestamp%3D20260827124527",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F615991%3Ftimestamp%3D20260205110832",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F391751%3Ftimestamp%3D20230515150909"
    ]
  },
  "폭풍의 언덕": {
    "isbn": "9788937461187",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540884%3Ftimestamp%3D20260826111024",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540884%3Ftimestamp%3D20260826111024",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6207179%3Ftimestamp%3D20260212121530",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F690908%3Ftimestamp%3D20260831110911"
    ]
  },
  "프랑켄슈타인": {
    "isbn": "9788954618373",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F691137%3Ftimestamp%3D20260307110823",
    "coverUrls": [
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F691137%3Ftimestamp%3D20260307110823",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5690334%3Ftimestamp%3D20260313124117",
      "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5963591%3Ftimestamp%3D20231122155747"
    ]
  }
};
