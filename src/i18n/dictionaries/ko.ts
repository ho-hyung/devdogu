const ko = {
  common: {
    search: '검색',
    copy: '복사하기',
    copied: '복사됨',
    clear: '초기화',
    convert: '변환하기',
    input: '입력',
    output: '결과',
    outputPlaceholder: '결과가 여기에 표시됩니다.',
    noResults: '검색 결과가 없습니다.',
    unknownError: '알 수 없는 오류',
  },
  header: {
    search: '검색',
    more: '더보기 ↓',
    themeToggle: '테마 전환',
    menu: '메뉴',
  },
  footer: {
    copyright: '모든 도구는 무료이며, 데이터는 브라우저에서만 처리됩니다.',
    about: '소개',
    privacy: '개인정보처리방침',
  },
  home: {
    badge: '모든 데이터는 브라우저에서만 처리됩니다',
    heroTitle1: '개발할 때 매일 쓰는',
    heroTitle2: '도구 모음',
    heroDescription: 'JSON 포매터, Base64 인코더, 정규식 테스터 등\n개발자가 자주 찾는 도구를 빠르고 깔끔하게.',
    searchPlaceholder: '도구 검색... (예: JSON, Base64, regex, git, docker)',
    all: '전체',
    toolCount: '{count}개 도구',
    searchLabel: '검색: "{query}"',
    favorites: '즐겨찾기',
    recent: '최근 사용',
    noResultsFor: '"{query}"에 대한 검색 결과가 없습니다.',
    viewAll: '전체 도구 보기',
    moreTools: '더 많은 도구',
    moreToolsDesc: '새로운 도구를 계속 추가하고 있습니다.',
    addFavorite: '즐겨찾기 추가',
    removeFavorite: '즐겨찾기 해제',
    seoText:
      'DevDogu는 개발자를 위한 무료 온라인 도구 모음입니다. 모든 도구는 클라이언트 사이드에서 동작하므로 데이터가 서버로 전송되지 않으며, 별도의 설치 없이 브라우저에서 바로 사용할 수 있습니다.',
  },
  toolLayout: {
    home: '홈',
    faq: '자주 묻는 질문',
    relatedTools: '다른 도구',
    favorite: '즐겨찾기',
  },
  commandPalette: {
    searchPlaceholder: '도구 검색...',
    noResults: '검색 결과가 없습니다.',
    navigate: '이동',
    open: '열기',
    close: '닫기',
  },
  categories: {
    formatter: '포매터 & 검증',
    encoder: '인코딩 & 디코딩',
    generator: '생성기',
    converter: '변환기',
    cheatsheet: '치트시트',
  },
};

export type Dictionary = {
  common: Record<keyof typeof ko.common, string>;
  header: Record<keyof typeof ko.header, string>;
  footer: Record<keyof typeof ko.footer, string>;
  home: Record<keyof typeof ko.home, string>;
  toolLayout: Record<keyof typeof ko.toolLayout, string>;
  commandPalette: Record<keyof typeof ko.commandPalette, string>;
  categories: Record<keyof typeof ko.categories, string>;
};

export default ko as Dictionary;
