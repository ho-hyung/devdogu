import { createMetadata } from '@/lib/metadata';
import TimestampClient from './TimestampClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Unix 타임스탬프 변환기',
  description: 'Unix 타임스탬프(Epoch)와 사람이 읽을 수 있는 날짜/시간을 상호 변환합니다.',
  path: '/timestamp',
  keywords: ['Unix', '타임스탬프', 'timestamp', 'epoch', '시간 변환', 'converter'],
});

const faq = [
  {
    q: 'Unix 타임스탬프란?',
    a: 'Unix 타임스탬프(Epoch time)는 1970년 1월 1일 00:00:00 UTC로부터 경과한 초(seconds)의 수입니다. 프로그래밍에서 시간을 다루는 표준적인 방식 중 하나입니다.',
  },
  {
    q: '밀리초와 초의 차이는?',
    a: 'JavaScript의 Date.now()는 밀리초(13자리)를, 대부분의 서버 사이드 언어는 초(10자리)를 사용합니다. 이 도구는 자릿수를 자동 감지하여 변환합니다.',
  },
];

export default function TimestampPage() {
  return (
    <ToolLayout toolId="timestamp" faq={faq}>
      <TimestampClient />
    </ToolLayout>
  );
}
