export default {
  metadata: {
    title: 'URL 인코더/디코더',
    description:
      '온라인 URL 인코딩 & 디코딩 도구. URL에 포함된 특수문자를 퍼센트 인코딩하거나 원래 문자로 복원합니다.',
    keywords: ['URL 인코딩', 'URL 디코딩', 'percent encoding', 'URL encode', 'URL decode'],
  },
  faq: [
    {
      q: 'URL 인코딩은 왜 필요한가요?',
      a: 'URL에는 영문, 숫자, 일부 특수문자만 직접 사용할 수 있습니다. 한글이나 공백 등은 %XX 형태의 퍼센트 인코딩으로 변환해야 브라우저와 서버가 올바르게 처리할 수 있습니다.',
    },
  ],
  ui: {
    encode: '인코딩',
    decode: '디코딩',
    convert: '변환하기',
    input: '입력',
    output: '결과',
    copy: '복사하기',
    copied: '✓ 복사됨',
    encodePlaceholder: 'URL 인코딩할 문자열을 입력하세요...',
    decodePlaceholder: '디코딩할 URL 문자열을 입력하세요...',
    outputPlaceholder: '결과가 여기에 표시됩니다.',
    invalidInput: '유효하지 않은 입력입니다.',
  },
};
