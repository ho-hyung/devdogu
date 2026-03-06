export default {
  metadata: {
    title: 'Unix 타임스탬프 변환기',
    description:
      'Unix 타임스탬프(Epoch)와 사람이 읽을 수 있는 날짜/시간을 상호 변환합니다.',
    keywords: ['Unix', '타임스탬프', 'timestamp', 'epoch', '시간 변환', 'converter'],
  },
  faq: [
    {
      q: 'Unix 타임스탬프란?',
      a: 'Unix 타임스탬프(Epoch time)는 1970년 1월 1일 00:00:00 UTC로부터 경과한 초(seconds)의 수입니다. 프로그래밍에서 시간을 다루는 표준적인 방식 중 하나입니다.',
    },
    {
      q: '밀리초와 초의 차이는?',
      a: 'JavaScript의 Date.now()는 밀리초(13자리)를, 대부분의 서버 사이드 언어는 초(10자리)를 사용합니다. 이 도구는 자릿수를 자동 감지하여 변환합니다.',
    },
  ],
  ui: {
    currentTimestamp: '현재 Unix 타임스탬프',
    clickToCopy: '클릭하면 복사됩니다',
    clickToCopyTitle: '클릭하여 복사',
    copied: '✓ 복사됨!',
    timestampToDate: '타임스탬프 → 날짜',
    dateToTimestamp: '날짜 → 타임스탬프',
    convert: '변환',
    timestampPlaceholder: '예: 1709512000',
    datePlaceholder: '예: 2024-03-04 12:00:00',
    invalidNumber: '유효하지 않은 숫자입니다.',
    invalidTimestamp: '유효하지 않은 타임스탬프입니다.',
    invalidDateFormat: '유효하지 않은 날짜 형식입니다.',
    seconds: '초(seconds)',
    milliseconds: '밀리초(ms)',
  },
};
