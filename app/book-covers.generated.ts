/*
 * FILE ROLE: 개발 단계에서 확정한 YES24 책 표지 식별자와 상품 링크를 정적으로 제공한다.
 * OWNS: 책 제목별 대표 상품 번호, ISBN, 표지 URL과 YES24 상품 URL 스냅샷.
 * USES: collect-yes24-book-covers 스크립트가 생성한 YES24 공개 상품 메타데이터.
 * MUST NOT: 런타임 API 요청이나 표지 검색을 수행한다.
 */
export type StoredBookCover = {
  itemId: number;
  isbn?: string;
  coverUrl: string;
  coverUrls: string[];
  productUrl: string;
};

export const BOOK_COVERS: Record<string, StoredBookCover> = {
  "1984": {
    "itemId": 372300,
    "isbn": "9788937460777",
    "coverUrl": "https://image.yes24.com/goods/372300/L",
    "coverUrls": [
      "https://image.yes24.com/goods/372300/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/372300"
  },
  "데미안": {
    "itemId": 196550398,
    "isbn": "9791197844386",
    "coverUrl": "https://image.yes24.com/goods/196550398/L",
    "coverUrls": [
      "https://image.yes24.com/goods/196550398/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/196550398"
  },
  "이방인": {
    "itemId": 4827613,
    "isbn": "9788937443848",
    "coverUrl": "https://image.yes24.com/goods/4827613/L",
    "coverUrls": [
      "https://image.yes24.com/goods/4827613/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/4827613"
  },
  "싯다르타": {
    "itemId": 257435,
    "isbn": "9788937460586",
    "coverUrl": "https://image.yes24.com/goods/257435/L",
    "coverUrls": [
      "https://image.yes24.com/goods/257435/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/257435"
  },
  "채식주의자": {
    "itemId": 108422348,
    "isbn": "9788936434595",
    "coverUrl": "https://image.yes24.com/goods/108422348/L",
    "coverUrls": [
      "https://image.yes24.com/goods/108422348/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/108422348"
  },
  "코스모스": {
    "itemId": 2312211,
    "isbn": "9788983711892",
    "coverUrl": "https://image.yes24.com/goods/2312211/L",
    "coverUrls": [
      "https://image.yes24.com/goods/2312211/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/2312211"
  },
  "인간실격": {
    "itemId": 196285741,
    "isbn": "9791165086787",
    "coverUrl": "https://image.yes24.com/goods/196285741/L",
    "coverUrls": [
      "https://image.yes24.com/goods/196285741/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/196285741"
  },
  "날개": {
    "itemId": 192873544,
    "isbn": "9791175910935",
    "coverUrl": "https://image.yes24.com/goods/192873544/L",
    "coverUrls": [
      "https://image.yes24.com/goods/192873544/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/192873544"
  },
  "동물농장": {
    "itemId": 17352,
    "isbn": "9788937460050",
    "coverUrl": "https://image.yes24.com/goods/17352/L",
    "coverUrls": [
      "https://image.yes24.com/goods/17352/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/17352"
  },
  "안나 카레니나": {
    "itemId": 102789832,
    "isbn": "9791157956012",
    "coverUrl": "https://image.yes24.com/goods/102789832/L",
    "coverUrls": [
      "https://image.yes24.com/goods/102789832/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/102789832"
  },
  "국부론": {
    "itemId": 2159123,
    "isbn": "9788992295086",
    "coverUrl": "https://image.yes24.com/goods/2159123/L",
    "coverUrls": [
      "https://image.yes24.com/goods/2159123/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/2159123"
  },
  "사피엔스": {
    "itemId": 23030284,
    "isbn": "9788934972464",
    "coverUrl": "https://image.yes24.com/goods/23030284/L",
    "coverUrls": [
      "https://image.yes24.com/goods/23030284/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/23030284"
  },
  "급류": {
    "itemId": 116586303,
    "isbn": "9788937473401",
    "coverUrl": "https://image.yes24.com/goods/116586303/L",
    "coverUrls": [
      "https://image.yes24.com/goods/116586303/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/116586303"
  },
  "구의 증명": {
    "itemId": 118578901,
    "isbn": "9791167372864",
    "coverUrl": "https://image.yes24.com/goods/118578901/L",
    "coverUrls": [
      "https://image.yes24.com/goods/118578901/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/118578901"
  },
  "카네기 인간관계론": {
    "itemId": 67479474,
    "isbn": "9791189503383",
    "coverUrl": "https://image.yes24.com/goods/67479474/L",
    "coverUrls": [
      "https://image.yes24.com/goods/67479474/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/67479474"
  },
  "아토믹 해빗츠": {
    "itemId": 69655504,
    "isbn": "9791162540640",
    "coverUrl": "https://image.yes24.com/goods/69655504/L",
    "coverUrls": [
      "https://image.yes24.com/goods/69655504/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/69655504"
  },
  "역행자": {
    "itemId": 109705390,
    "isbn": "9788901260716",
    "coverUrl": "https://image.yes24.com/goods/109705390/L",
    "coverUrls": [
      "https://image.yes24.com/goods/109705390/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/109705390"
  },
  "설득의 심리학": {
    "itemId": 9230172,
    "isbn": "9788950949150",
    "coverUrl": "https://image.yes24.com/goods/9230172/L",
    "coverUrls": [
      "https://image.yes24.com/goods/9230172/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/9230172"
  },
  "차라투스트라는 이렇게 말했다": {
    "itemId": 426994,
    "isbn": "9788937460944",
    "coverUrl": "https://image.yes24.com/goods/426994/L",
    "coverUrls": [
      "https://image.yes24.com/goods/426994/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/426994"
  },
  "군주론": {
    "itemId": 102832804,
    "isbn": "9791166817878",
    "coverUrl": "https://image.yes24.com/goods/102832804/L",
    "coverUrls": [
      "https://image.yes24.com/goods/102832804/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/102832804"
  },
  "공정하다는 착각": {
    "itemId": 94489333,
    "isbn": "9791164136452",
    "coverUrl": "https://image.yes24.com/goods/94489333/L",
    "coverUrls": [
      "https://image.yes24.com/goods/94489333/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/94489333"
  },
  "죽음의 수용소에서": {
    "itemId": 57619338,
    "isbn": "9788936811143",
    "coverUrl": "https://image.yes24.com/goods/57619338/L",
    "coverUrls": [
      "https://image.yes24.com/goods/57619338/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/57619338"
  },
  "노인과 바다": {
    "itemId": 6157159,
    "isbn": "9788937462788",
    "coverUrl": "https://image.yes24.com/goods/6157159/L",
    "coverUrls": [
      "https://image.yes24.com/goods/6157159/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/6157159"
  },
  "위대한 개츠비": {
    "itemId": 370331,
    "isbn": "9788937460753",
    "coverUrl": "https://image.yes24.com/goods/370331/L",
    "coverUrls": [
      "https://image.yes24.com/goods/370331/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/370331"
  },
  "설국": {
    "itemId": 252513,
    "isbn": "9788937460616",
    "coverUrl": "https://image.yes24.com/goods/252513/L",
    "coverUrls": [
      "https://image.yes24.com/goods/252513/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/252513"
  },
  "브람스를 좋아하세요...": {
    "itemId": 2950700,
    "isbn": "9788937461798",
    "coverUrl": "https://image.yes24.com/goods/2950700/L",
    "coverUrls": [
      "https://image.yes24.com/goods/2950700/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/2950700"
  },
  "첫사랑": {
    "itemId": 192873534,
    "isbn": "9791175910928",
    "coverUrl": "https://image.yes24.com/goods/192873534/L",
    "coverUrls": [
      "https://image.yes24.com/goods/192873534/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/192873534"
  },
  "어린 왕자": {
    "itemId": 22431294,
    "isbn": "9788932917245",
    "coverUrl": "https://image.yes24.com/goods/22431294/L",
    "coverUrls": [
      "https://image.yes24.com/goods/22431294/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/22431294"
  },
  "눈먼 자들의 도시": {
    "itemId": 318766,
    "isbn": "9788973374939",
    "coverUrl": "https://image.yes24.com/goods/318766/L",
    "coverUrls": [
      "https://image.yes24.com/goods/318766/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/318766"
  },
  "멋진 신세계": {
    "itemId": 18360997,
    "isbn": "9788973814725",
    "coverUrl": "https://image.yes24.com/goods/18360997/L",
    "coverUrls": [
      "https://image.yes24.com/goods/18360997/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/18360997"
  },
  "변신": {
    "itemId": 1525142,
    "isbn": "9788954600200",
    "coverUrl": "https://image.yes24.com/goods/1525142/L",
    "coverUrls": [
      "https://image.yes24.com/goods/1525142/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/1525142"
  },
  "수레바퀴 아래서": {
    "itemId": 221158,
    "isbn": "9788937460500",
    "coverUrl": "https://image.yes24.com/goods/221158/L",
    "coverUrls": [
      "https://image.yes24.com/goods/221158/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/221158"
  },
  "오만과 편견": {
    "itemId": 402246,
    "isbn": "9788937460883",
    "coverUrl": "https://image.yes24.com/goods/402246/L",
    "coverUrls": [
      "https://image.yes24.com/goods/402246/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/402246"
  },
  "호밀밭의 파수꾼": {
    "itemId": 3833193,
    "isbn": "9788992024235",
    "coverUrl": "https://image.yes24.com/goods/3833193/L",
    "coverUrls": [
      "https://image.yes24.com/goods/3833193/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/3833193"
  },
  "젊은 베르테르의 슬픔": {
    "itemId": 17386,
    "isbn": "9788937460258",
    "coverUrl": "https://image.yes24.com/goods/17386/L",
    "coverUrls": [
      "https://image.yes24.com/goods/17386/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/17386"
  },
  "도리언 그레이의 초상": {
    "itemId": 125542912,
    "isbn": "9788932924014",
    "coverUrl": "https://image.yes24.com/goods/125542912/L",
    "coverUrls": [
      "https://image.yes24.com/goods/125542912/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/125542912"
  },
  "죄와 벌": {
    "itemId": 93602664,
    "isbn": "9791170360421",
    "coverUrl": "https://image.yes24.com/goods/93602664/L",
    "coverUrls": [
      "https://image.yes24.com/goods/93602664/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/93602664"
  },
  "페스트": {
    "itemId": 4827619,
    "isbn": "9788937462672",
    "coverUrl": "https://image.yes24.com/goods/4827619/L",
    "coverUrls": [
      "https://image.yes24.com/goods/4827619/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/4827619"
  },
  "지킬 박사와 하이드 씨": {
    "itemId": 126159378,
    "isbn": "9791139716832",
    "coverUrl": "https://image.yes24.com/goods/126159378/L",
    "coverUrls": [
      "https://image.yes24.com/goods/126159378/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/126159378"
  },
  "폭풍의 언덕": {
    "itemId": 1470060,
    "isbn": "9788937461187",
    "coverUrl": "https://image.yes24.com/goods/1470060/L",
    "coverUrls": [
      "https://image.yes24.com/goods/1470060/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/1470060"
  },
  "프랑켄슈타인": {
    "itemId": 7178617,
    "isbn": "9788954618373",
    "coverUrl": "https://image.yes24.com/goods/7178617/L",
    "coverUrls": [
      "https://image.yes24.com/goods/7178617/L"
    ],
    "productUrl": "https://www.yes24.com/product/goods/7178617"
  }
};
