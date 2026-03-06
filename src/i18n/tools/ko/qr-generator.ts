export default {
  metadata: {
    title: 'QR코드 생성기',
    description:
      '온라인 QR코드 생성기 — 텍스트, URL, 이메일 등을 QR코드로 즉시 변환합니다. PNG 다운로드를 지원합니다.',
    keywords: ['QR코드 생성기', 'QR code generator', 'QR 만들기', '큐알코드', 'URL QR코드'],
  },
  faq: [
    {
      q: 'QR코드란 무엇인가요?',
      a: 'QR(Quick Response)코드는 2차원 바코드의 일종으로, 스마트폰 카메라로 스캔하여 URL, 텍스트, 연락처 등의 정보를 빠르게 읽을 수 있습니다.',
    },
    {
      q: '생성된 QR코드에 유효기간이 있나요?',
      a: '아니요. QR코드 자체에는 유효기간이 없습니다. QR코드는 단순히 데이터를 시각적으로 인코딩한 것이므로, 인코딩된 URL이 유효한 한 계속 작동합니다.',
    },
    {
      q: '오류 복원 수준이란 무엇인가요?',
      a: 'QR코드가 일부 손상되어도 데이터를 복원할 수 있는 수준입니다. L(7%), M(15%), Q(25%), H(30%)로, 높을수록 복원 능력이 좋지만 QR코드가 더 복잡해집니다.',
    },
  ],
  ui: {
    textOrUrl: '텍스트 또는 URL',
    inputPlaceholder: 'QR코드로 변환할 텍스트나 URL을 입력하세요...',
    size: '크기',
    errorCorrection: '오류 복원',
    download: 'PNG 다운로드',
    qrPlaceholder: 'QR코드가 여기에 표시됩니다',
    generateError: 'QR코드를 생성할 수 없습니다. 입력 데이터가 너무 길 수 있습니다.',
  },
};
