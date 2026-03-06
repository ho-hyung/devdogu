import HomeClient from './HomeClient';

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
          모든 데이터는 브라우저에서만 처리됩니다
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          개발할 때 매일 쓰는
          <br />
          <span className="text-brand-500">도구 모음</span>
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">
          JSON 포매터, Base64 인코더, 정규식 테스터 등
          <br className="hidden sm:block" />
          개발자가 자주 찾는 도구를 빠르고 깔끔하게.
        </p>
      </section>

      <HomeClient />

      {/* Bottom SEO Text */}
      <section className="mt-16 text-center">
        <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
          DevDogu는 개발자를 위한 무료 온라인 도구 모음입니다. 모든 도구는 클라이언트 사이드에서
          동작하므로 데이터가 서버로 전송되지 않으며, 별도의 설치 없이 브라우저에서 바로 사용할 수 있습니다.
        </p>
      </section>
    </main>
  );
}
