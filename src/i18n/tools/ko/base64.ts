export default {
  metadata: {
    title: 'Base64 인코더/디코더',
    description: '온라인 Base64 인코딩 & 디코딩 도구. 텍스트를 Base64로 변환하거나 Base64를 원래 텍스트로 복원합니다.',
    keywords: ['Base64', '인코딩', '디코딩', 'encode', 'decode', '변환'],
  },
  faq: [
    {
      q: 'Base64 인코딩이란 무엇인가요?',
      a: 'Base64는 바이너리 데이터를 ASCII 문자열로 변환하는 인코딩 방식입니다. 이메일 첨부파일, 데이터 URI, JWT 토큰 등에서 널리 사용됩니다.',
    },
    {
      q: 'Base64는 암호화인가요?',
      a: '아니요. Base64는 암호화가 아닌 인코딩입니다. 누구나 쉽게 디코딩할 수 있으므로 민감한 데이터를 보호하는 용도로는 사용하면 안 됩니다.',
    },
  ],
  ui: {
    encode: '인코딩',
    decode: '디코딩',
    convert: '변환하기',
    swap: '⇄ 바꾸기',
    originalText: '원본 텍스트',
    base64String: 'Base64 문자열',
    base64Result: 'Base64 결과',
    decodeResult: '디코딩 결과',
    encodePlaceholder: '인코딩할 텍스트를 입력하세요...',
    decodePlaceholder: 'Base64 문자열을 입력하세요...',
    outputPlaceholder: '결과가 여기에 표시됩니다.',
    copy: '복사하기',
    copied: '✓ 복사됨',
    encodeError: '인코딩할 수 없는 문자가 포함되어 있습니다.',
    decodeError: '유효하지 않은 Base64 문자열입니다.',
  },
};
