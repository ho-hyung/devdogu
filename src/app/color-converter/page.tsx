import { createMetadata } from '@/lib/metadata';
import ColorConverterClient from './ColorConverterClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Color 변환기 (HEX/RGB/HSL)',
  description:
    '온라인 색상 변환기 — HEX, RGB, HSL 색상 값을 실시간으로 상호 변환합니다. 컬러 피커와 CSS 코드를 함께 제공합니다.',
  path: '/color-converter',
  keywords: ['색상 변환기', 'HEX to RGB', 'RGB to HSL', 'color converter', '컬러 피커', 'CSS 색상'],
});

const faq = [
  { q: 'HEX, RGB, HSL의 차이는 무엇인가요?', a: 'HEX는 16진수 표기법(#FF0000), RGB는 빨강/초록/파랑 값(rgb(255,0,0)), HSL은 색조/채도/명도(hsl(0,100%,50%))로 색상을 표현합니다.' },
  { q: 'CSS에서 어떤 색상 형식을 사용해야 하나요?', a: 'CSS에서는 세 가지 형식 모두 사용 가능합니다. HEX는 간결하고, RGB는 투명도(rgba) 적용이 쉬우며, HSL은 색상 조정이 직관적입니다.' },
];

export default function ColorConverterPage() {
  return (
    <ToolLayout toolId="color-converter" faq={faq}>
      <ColorConverterClient />
    </ToolLayout>
  );
}
