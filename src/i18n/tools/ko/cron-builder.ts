export default {
  metadata: {
    title: 'Cron 표현식 빌더',
    description:
      'Cron 표현식을 시각적으로 조합하고 다음 실행 시간을 확인합니다. 클릭만으로 쉽게 Cron 스케줄을 만들 수 있습니다.',
    keywords: [
      'cron', '크론', 'crontab', '스케줄', 'schedule',
      '표현식', 'builder', '빌더', '크론탭', '주기 실행',
    ],
  },
  faq: [
    {
      q: 'Cron 표현식이란 무엇인가요?',
      a: 'Cron 표현식은 작업을 반복 실행할 시간을 정의하는 문자열입니다. 분, 시, 일, 월, 요일의 5개 필드로 구성되며, Linux의 crontab이나 CI/CD 파이프라인 등에서 널리 사용됩니다.',
    },
    {
      q: '각 필드에 사용할 수 있는 값은 무엇인가요?',
      a: '분(0-59), 시(0-23), 일(1-31), 월(1-12), 요일(0-6, 0=일요일)입니다. 모든 값을 의미하는 *, 범위를 나타내는 -(예: 1-5), 간격을 나타내는 /(예: */5) 등의 특수문자를 사용할 수 있습니다.',
    },
    {
      q: '*/5 * * * * 은 무슨 뜻인가요?',
      a: '매 5분마다 실행한다는 의미입니다. */5는 "0부터 시작하여 5 간격으로"를 뜻하므로 0, 5, 10, 15... 분에 실행됩니다.',
    },
    {
      q: '요일 필드에서 0과 7의 차이는?',
      a: '전통적인 Unix cron에서 0은 일요일, 1-6은 월-토요일입니다. 일부 시스템에서는 7도 일요일로 허용하지만, 호환성을 위해 0을 사용하는 것을 권장합니다.',
    },
    {
      q: '한 필드에 여러 값을 지정할 수 있나요?',
      a: '네, 쉼표(,)로 구분하여 여러 값을 지정할 수 있습니다. 예를 들어 요일 필드에 1,3,5를 입력하면 월, 수, 금요일에만 실행됩니다.',
    },
    {
      q: 'Cron 표현식 빌더와 Cron 치트시트의 차이는?',
      a: '빌더는 시각적으로 클릭하여 Cron 표현식을 조합하고 다음 실행 시간을 미리 볼 수 있는 도구입니다. 치트시트는 Cron 문법과 주요 예제를 정리한 참고 자료입니다.',
    },
    {
      q: '생성된 Cron 표현식은 어디에서 사용할 수 있나요?',
      a: 'Linux crontab, GitHub Actions, GitLab CI/CD, AWS CloudWatch Events, Kubernetes CronJob, Spring @Scheduled 등 대부분의 스케줄링 시스템에서 사용할 수 있습니다.',
    },
  ],
  ui: {
    cronExpression: 'Cron 표현식',
    copy: '복사',
    copied: '복사됨',
    fieldMinute: '분',
    fieldHour: '시',
    fieldDay: '일',
    fieldMonth: '월',
    fieldWeekday: '요일',
    presetEveryMinute: '매분',
    presetEveryHour: '매시간',
    presetMidnight: '매일 자정',
    presetWeeklyMonday: '매주 월요일',
    presetMonthlyFirst: '매월 1일',
    modeEvery: '모든 값 (*)',
    modeSpecific: '특정 값',
    modeRange: '범위',
    modeInterval: '간격 (*/)',
    rangeFrom: '부터',
    rangeTo: '까지',
    intervalEvery: '매',
    intervalMinute: '분마다',
    intervalHour: '시간마다',
    intervalDay: '일마다',
    intervalMonth: '개월마다',
    intervalWeekday: '요일마다',
    next5Executions: '다음 5회 실행 시간',
    noExecutionsInYear: '1년 내 실행 일정이 없습니다.',
    cronGuideLink: 'Cron 표현식 문법 가이드 보기 →',
    monthLabels: ['', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    weekdayLabels: ['일', '월', '화', '수', '목', '금', '토'],
  },
};
