/*
 * FILE ROLE: 개발 단계에서 확정한 Kakao Daum 책 표지 식별자와 URL을 정적으로 제공한다.
 * OWNS: 책 제목별 ISBN과 표지 URL 스냅샷.
 * USES: collect-kakao-book-covers 스크립트가 생성한 공개 Daum 책 메타데이터.
 * MUST NOT: 런타임 API 요청이나 표지 검색을 수행한다.
 */
export type StoredBookCover = {
  isbn?: string;
  coverUrl: string;
};

export const BOOK_COVERS: Record<string, StoredBookCover> = {
  "1984": {
    "isbn": "9788937460777",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540843%3Ftimestamp%3D20260826111033"
  },
  "데미안": {
    "isbn": "9788937460449",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540810%3Ftimestamp%3D20260826111023"
  },
  "이방인": {
    "isbn": "9788937443848",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5132886%3Ftimestamp%3D20260905114317"
  },
  "싯다르타": {
    "isbn": "9788937460586",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540824%3Ftimestamp%3D20260826111024"
  },
  "채식주의자": {
    "isbn": "9788936434595",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6042324%3Ftimestamp%3D20260520123045"
  },
  "코스모스": {
    "isbn": "9788983711540",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1164422%3Ftimestamp%3D20250926110305"
  },
  "인간실격": {
    "isbn": "9788937461033",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540869%3Ftimestamp%3D20260826111033"
  },
  "날개": {
    "isbn": "9788994353470",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1417390%3Ftimestamp%3D20221011181548"
  },
  "동물농장": {
    "isbn": "9788937460050",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540771%3Ftimestamp%3D20260826111023"
  },
  "안나 카레니나": {
    "isbn": "9791176337175",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7182677%3Ftimestamp%3D20260321124041"
  },
  "국부론": {
    "isbn": "9791139716474",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6529836%3Ftimestamp%3D20251004121212"
  },
  "사피엔스": {
    "isbn": "9788934972464",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F521598%3Ftimestamp%3D20260113110825"
  },
  "급류": {
    "isbn": "9788937473401",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6252051%3Ftimestamp%3D20251126160850"
  },
  "구의 증명": {
    "isbn": "9791167372864",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6336669%3Ftimestamp%3D20260822122607"
  },
  "카네기 인간관계론": {
    "isbn": "9791187142560",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5082004%3Ftimestamp%3D20260612114518"
  },
  "아토믹 해빗츠": {
    "isbn": "9791162540640",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4881578%3Ftimestamp%3D20260613113059"
  },
  "역행자": {
    "isbn": "9788901260716",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6079127%3Ftimestamp%3D20231118154505"
  },
  "설득의 심리학": {
    "isbn": "9788950950002",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6334139%3Ftimestamp%3D20260531094829"
  },
  "차라투스트라는 이렇게 말했다": {
    "isbn": "9788937460944",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540860%3Ftimestamp%3D20251205142723"
  },
  "군주론": {
    "isbn": "9791166817878",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5799446%3Ftimestamp%3D20260424143250"
  },
  "공정하다는 착각": {
    "isbn": "9791164136452",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5506904%3Ftimestamp%3D20251028141153"
  },
  "죽음의 수용소에서": {
    "isbn": "9788936811549",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5393249%3Ftimestamp%3D20260828121235"
  },
  "노인과 바다": {
    "isbn": "9788937462788",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F541126%3Ftimestamp%3D20260826111025"
  },
  "위대한 개츠비": {
    "isbn": "9788937460753",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540841%3Ftimestamp%3D20251204110720"
  },
  "설국": {
    "isbn": "9788937460616",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540827%3Ftimestamp%3D20260826111033"
  },
  "브람스를 좋아하세요...": {
    "isbn": "9788937461798",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540945%3Ftimestamp%3D20260826111025"
  },
  "첫사랑": {
    "isbn": "9788937460807",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540846%3Ftimestamp%3D20260609110725"
  },
  "어린 왕자": {
    "isbn": "9788932917245",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F507587%3Ftimestamp%3D20251119111036"
  },
  "눈먼 자들의 도시": {
    "isbn": "9788973374939",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1020120%3Ftimestamp%3D20251111110820"
  },
  "멋진 신세계": {
    "isbn": "9788973814725",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1027553%3Ftimestamp%3D20260905111102"
  },
  "변신": {
    "isbn": "9788954600200",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F689490%3Ftimestamp%3D20260822111017"
  },
  "수레바퀴 아래서": {
    "isbn": "9788937460500",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540816%3Ftimestamp%3D20241113114441"
  },
  "오만과 편견": {
    "isbn": "9788937460883",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540854%3Ftimestamp%3D20260826111024"
  },
  "호밀밭의 파수꾼": {
    "isbn": "9791155615089",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6628128%3Ftimestamp%3D20250521223646"
  },
  "젊은 베르테르의 슬픔": {
    "isbn": "9788937460258",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540791%3Ftimestamp%3D20251206110932"
  },
  "도리언 그레이의 초상": {
    "isbn": "9788937429859",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6062691%3Ftimestamp%3D20251217145749"
  },
  "죄와 벌": {
    "isbn": "9791176844451",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F7266282%3Ftimestamp%3D20260723103804"
  },
  "페스트": {
    "isbn": "9788937462672",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F541101%3Ftimestamp%3D20241128114055"
  },
  "지킬 박사와 하이드 씨": {
    "isbn": "9788937464638",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6853590%3Ftimestamp%3D20260827124527"
  },
  "폭풍의 언덕": {
    "isbn": "9788937461187",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F540884%3Ftimestamp%3D20260826111024"
  },
  "프랑켄슈타인": {
    "isbn": "9788954618373",
    "coverUrl": "https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F691137%3Ftimestamp%3D20260307110823"
  }
};
