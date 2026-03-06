import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: '소개',
  description: 'DevDogu는 개발자를 위한 무료 온라인 도구 모음입니다.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">DevDogu 소개</h1>
      
      <div className="prose dark:prose-invert max-w-none space-y-6 text-[var(--color-text-secondary)] leading-relaxed">
        <p>
          DevDogu는 개발자가 매일 사용하는 온라인 도구를 한 곳에 모아놓은 무료 서비스입니다.
          JSON 포매터, Base64 인코더, 정규식 테스터 등 자주 쓰는 도구를 빠르고 깔끔한 인터페이스로 제공합니다.
        </p>

        <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8">핵심 원칙</h2>
        
        <div className="space-y-4">
          <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <h3 className="font-semibold text-[var(--color-text)] mb-1">🔒 프라이버시 우선</h3>
            <p className="text-sm">모든 도구는 브라우저에서만 동작합니다. 입력한 데이터가 서버로 전송되지 않습니다.</p>
          </div>
          <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <h3 className="font-semibold text-[var(--color-text)] mb-1">⚡ 빠르고 가벼운</h3>
            <p className="text-sm">불필요한 기능 없이 핵심에 집중합니다. 페이지 로딩 시간을 최소화했습니다.</p>
          </div>
          <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <h3 className="font-semibold text-[var(--color-text)] mb-1">🌙 다크모드 기본</h3>
            <p className="text-sm">개발자의 눈을 보호합니다. 라이트/다크 모드를 자유롭게 전환할 수 있습니다.</p>
          </div>
          <div className="p-4 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg">
            <h3 className="font-semibold text-[var(--color-text)] mb-1">🇰🇷 한국어 지원</h3>
            <p className="text-sm">한국 개발자를 위해 한국어 UI와 설명을 제공합니다.</p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-[var(--color-text)] mt-8">문의</h2>
        <p>
          버그 리포트, 기능 제안, 기타 문의사항이 있으시면 
          GitHub Issues를 통해 알려주세요.
        </p>
      </div>
    </main>
  );
}
