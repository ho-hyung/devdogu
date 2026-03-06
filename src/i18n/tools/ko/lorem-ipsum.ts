export default {
  metadata: {
    title: 'Lorem Ipsum 생성기',
    description:
      '온라인 Lorem Ipsum 생성기 — 문단, 문장, 단어 단위로 더미 텍스트를 즉시 생성합니다. 서버 전송 없이 브라우저에서 바로 처리.',
    keywords: ['Lorem Ipsum', '로렘 입숨', '더미 텍스트', 'placeholder text', '샘플 텍스트', '텍스트 생성기'],
  },
  faq: [
    {
      q: 'Lorem Ipsum이란 무엇인가요?',
      a: 'Lorem Ipsum은 인쇄 및 조판 업계에서 사용되는 표준 더미 텍스트입니다. 1500년대부터 사용되어 왔으며, 실제 콘텐츠가 준비되기 전에 레이아웃과 디자인을 미리 확인하는 용도로 활용됩니다.',
    },
    {
      q: '왜 Lorem Ipsum을 사용하나요?',
      a: '일반 텍스트 대신 Lorem Ipsum을 사용하면, 읽는 사람이 내용에 집중하지 않고 디자인과 레이아웃 자체에 집중할 수 있습니다. 실제 콘텐츠와 비슷한 글자 분포를 가지고 있어 더 현실적인 미리보기를 제공합니다.',
    },
    {
      q: '문단, 문장, 단어 모드의 차이는 무엇인가요?',
      a: '문단 모드는 여러 문장으로 구성된 완전한 문단을 생성하고, 문장 모드는 개별 문장을 생성합니다. 단어 모드는 지정한 개수만큼의 단어를 연속으로 생성합니다. 용도에 따라 적절한 모드를 선택하세요.',
    },
    {
      q: '"Lorem ipsum dolor sit amet..."으로 시작 옵션은 무엇인가요?',
      a: '이 옵션을 활성화하면 생성된 텍스트가 전통적인 "Lorem ipsum dolor sit amet, consectetur adipiscing elit." 문구로 시작합니다. 클래식한 Lorem Ipsum 스타일을 원할 때 사용합니다.',
    },
    {
      q: '생성된 텍스트가 서버로 전송되나요?',
      a: '아니요. 모든 텍스트는 브라우저에서 클라이언트 사이드로 생성됩니다. 서버로 전송되는 데이터는 없습니다.',
    },
    {
      q: '최대 몇 개까지 생성할 수 있나요?',
      a: '문단은 최대 100개, 문장은 최대 500개, 단어는 최대 5000개까지 생성할 수 있습니다. 일반적인 디자인 작업에 충분한 양입니다.',
    },
  ],
  ui: {
    paragraphs: '문단',
    sentences: '문장',
    words: '단어',
    generate: '생성하기',
    count: '개수',
    startWithClassic: '"Lorem ipsum dolor sit amet..."으로 시작',
    result: '생성 결과',
    copy: '복사',
    copied: '복사됨',
    wordCount: '단어 수',
    charCount: '글자 수',
  },
};
