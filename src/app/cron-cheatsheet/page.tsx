import { createMetadata } from '@/lib/metadata';
import CronCheatsheetClient from './CronCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Cron 표현식 가이드 치트시트',
  description:
    'Cron 표현식 치트시트 — 크론탭 문법, 필드 범위, 특수 문자(*, /, -, #), 자주 쓰는 스케줄 예제를 정리한 가이드. 매일, 매시, 매주, 매월 실행 설정을 복사해서 바로 사용하세요.',
  path: '/cron-cheatsheet',
  keywords: [
    'Cron 표현식', 'crontab', '크론탭 설정', 'cron 매일 실행', 'cron schedule',
    'cron 표현식 예제', '크론 문법', 'crontab 사용법', 'cron 매 5분',
    'cron 평일', 'cron 주기적 실행', '리눅스 cron', 'cron job',
  ],
});

const faq = [
  { q: 'Cron 표현식이란 무엇인가요?', a: 'Cron 표현식은 작업(Job)을 특정 시간이나 주기로 자동 실행하기 위한 스케줄링 문법입니다. Linux/Unix의 crontab, Jenkins, GitHub Actions, AWS CloudWatch 등에서 널리 사용됩니다. 기본적으로 5개의 필드(분, 시, 일, 월, 요일)로 구성됩니다.' },
  { q: 'Cron에서 * 와 */5의 차이는 무엇인가요?', a: '*는 해당 필드의 모든 값을 의미합니다. */5는 "매 5단위마다"를 의미합니다. 예를 들어 분 필드에 *는 매분, */5는 0, 5, 10, 15... 분에 실행됩니다. */5는 0/5와 동일합니다.' },
  { q: 'Cron 표현식에서 요일은 어떻게 지정하나요?', a: '요일 필드에 0-6(일요일=0, 토요일=6) 또는 SUN-SAT으로 지정합니다. 1-5는 월~금(평일), 0,6은 주말입니다. 시스템에 따라 7도 일요일로 인식됩니다.' },
  { q: '매월 마지막 날에 실행하려면 어떻게 하나요?', a: '일 필드에 L을 사용합니다. "0 0 L * *"은 매월 마지막 날 자정에 실행됩니다. L은 Last를 의미하며, 월별로 28일, 29일, 30일, 31일을 자동으로 처리합니다.' },
  { q: 'Cron 표현식 5개 필드와 6개 필드의 차이는 무엇인가요?', a: '표준 crontab은 5개 필드(분 시 일 월 요일)를 사용합니다. Spring이나 Quartz 같은 프레임워크는 초(seconds) 필드를 추가한 6개 필드를 사용합니다. 환경에 따라 확인이 필요합니다.' },
  { q: 'crontab을 편집하고 로그를 확인하려면 어떻게 하나요?', a: 'crontab -e로 편집하고 crontab -l로 목록을 확인합니다. 로그는 보통 /var/log/syslog나 /var/log/cron에 기록됩니다. 명령어 출력을 파일로 리다이렉트(>> /tmp/cron.log 2>&1)하면 디버깅에 유용합니다.' },
];

export default function CronCheatsheetPage() {
  return (
    <ToolLayout toolId="cron-cheatsheet" faq={faq}>
      <CronCheatsheetClient />
    </ToolLayout>
  );
}
