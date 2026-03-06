import { createMetadata } from '@/lib/metadata';
import DiffCheckerClient from './DiffCheckerClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Diff 비교기',
  description:
    '온라인 Diff 비교기 — 두 텍스트의 차이점을 줄 단위로 비교하여 추가, 삭제, 변경 사항을 시각적으로 보여줍니다.',
  path: '/diff-checker',
  keywords: ['Diff 비교기', '텍스트 비교', 'diff checker', 'compare', '차이점', '코드 비교'],
});

const faq = [
  { q: 'Diff 비교기란 무엇인가요?', a: 'Diff 비교기는 두 텍스트 간의 차이점을 줄 단위로 분석하여 추가된 줄, 삭제된 줄, 변경되지 않은 줄을 색상으로 구분하여 보여주는 도구입니다.' },
  { q: '어떤 알고리즘을 사용하나요?', a: 'LCS(Longest Common Subsequence) 알고리즘을 기반으로 두 텍스트의 최장 공통 부분 수열을 찾아 차이점을 계산합니다.' },
];

export default function DiffCheckerPage() {
  return (
    <ToolLayout toolId="diff-checker" faq={faq}>
      <DiffCheckerClient />
    </ToolLayout>
  );
}
