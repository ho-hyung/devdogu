export default {
  metadata: {
    title: 'JWT 디코더',
    description:
      'JWT(JSON Web Token) 토큰을 디코딩하여 Header와 Payload를 확인합니다. 서버 전송 없이 브라우저에서 처리.',
    keywords: ['JWT', '디코더', 'JSON Web Token', 'token', '토큰', 'decode'],
  },
  faq: [
    {
      q: 'JWT 토큰이란?',
      a: 'JWT(JSON Web Token)는 두 당사자 간에 안전하게 정보를 전달하기 위한 JSON 기반 표준입니다. Header, Payload, Signature 세 부분으로 구성되며 점(.)으로 구분됩니다.',
    },
    {
      q: 'JWT를 디코딩하면 보안 위험이 있나요?',
      a: 'JWT의 Header와 Payload는 단순 Base64 인코딩이므로 누구나 디코딩할 수 있습니다. 따라서 민감한 정보를 Payload에 넣으면 안 됩니다. 보안은 Signature 검증을 통해 보장됩니다.',
    },
  ],
  ui: {
    sampleToken: '샘플 토큰',
    clear: '초기화',
    jwtToken: 'JWT 토큰',
    tokenPlaceholder: 'eyJhbGciOiJIUzI1NiIs...',
    invalidParts: 'JWT는 점(.)으로 구분된 3개 부분이 필요합니다.',
    invalidFormat: '유효하지 않은 JWT 형식입니다.',
    expired: '만료됨',
    valid: '유효',
    timeInfo: '시간 정보',
    copy: '복사',
    copied: '✓ 복사됨',
  },
};
