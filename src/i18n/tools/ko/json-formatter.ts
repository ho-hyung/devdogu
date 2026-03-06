export default {
  metadata: {
    title: 'JSON 포매터 & 검증기',
    description:
      '온라인 JSON 포매터 — JSON 데이터를 보기 좋게 정리하고, 구문 오류를 찾아 검증합니다. 서버 전송 없이 브라우저에서 바로 처리.',
    keywords: ['JSON 포매터', 'JSON 정리', 'JSON 검증', 'JSON formatter', 'JSON validator', 'JSON 뷰어'],
  },
  faq: [
    {
      q: 'JSON 포매터란 무엇인가요?',
      a: 'JSON 포매터는 압축된 JSON 데이터에 들여쓰기와 줄바꿈을 추가하여 사람이 읽기 쉬운 형태로 변환해주는 도구입니다. 디버깅이나 API 응답 확인 시 유용합니다.',
    },
    {
      q: '입력한 JSON 데이터가 서버로 전송되나요?',
      a: '아니요. DevDogu의 모든 도구는 브라우저에서만 동작합니다. 입력한 데이터는 서버로 전송되지 않으며, 페이지를 닫으면 사라집니다.',
    },
    {
      q: 'JSON과 JavaScript 객체의 차이는 무엇인가요?',
      a: 'JSON은 키를 반드시 큰따옴표("")로 감싸야 하며, 후행 쉼표(trailing comma)를 허용하지 않습니다. 또한 함수나 undefined 같은 JavaScript 고유 값은 포함할 수 없습니다.',
    },
  ],
  ui: {
    format: '포맷하기',
    minify: '압축하기',
    clear: '초기화',
    sampleData: '샘플 데이터',
    indent: '들여쓰기:',
    spaces: '칸',
    input: '입력',
    output: '결과',
    copy: '복사하기',
    copied: '✓ 복사됨',
    inputPlaceholder: 'JSON 데이터를 붙여넣으세요... (Ctrl+Enter로 포맷)',
    outputPlaceholder: '포맷된 결과가 여기에 표시됩니다.',
    invalidJson: '유효하지 않은 JSON',
    unknownError: '알 수 없는 오류',
    keys: '키 수',
    depth: '깊이',
    size: '크기',
  },
};
