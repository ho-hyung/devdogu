import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: '개인정보처리방침',
  description: 'DevDogu 개인정보처리방침',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-6">개인정보처리방침</h1>
      <p className="text-sm text-[var(--color-text-secondary)] mb-8">최종 업데이트: 2026년 3월</p>

      <div className="space-y-8 text-[var(--color-text-secondary)] leading-relaxed text-sm">
        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">1. 개요</h2>
          <p>
            DevDogu(이하 &quot;서비스&quot;)는 이용자의 개인정보를 중요시하며, 
            관련 법률을 준수합니다. 본 개인정보처리방침은 서비스가 어떤 정보를 수집하고 
            어떻게 활용하는지 설명합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">2. 수집하는 정보</h2>
          <p className="mb-3">
            DevDogu의 모든 도구는 클라이언트(브라우저)에서 동작하며, 사용자가 입력한 데이터는 
            서버로 전송되지 않습니다.
          </p>
          <p>
            다만, 서비스 개선 및 광고 제공을 위해 다음과 같은 정보가 자동으로 수집될 수 있습니다:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>방문 페이지 URL</li>
            <li>브라우저 종류 및 운영체제</li>
            <li>접속 일시</li>
            <li>쿠키 정보</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">3. 제3자 서비스</h2>
          <p className="mb-3">본 서비스는 다음과 같은 제3자 서비스를 이용하며, 각 서비스는 쿠키를 사용할 수 있습니다:</p>
          <ul className="space-y-3">
            <li>
              <span className="text-[var(--color-text)] font-medium">Google Analytics:</span>{' '}
              사이트 이용 통계 분석 목적 (익명 데이터만 수집)
            </li>
            <li>
              <span className="text-[var(--color-text)] font-medium">Google AdSense:</span>{' '}
              광고 게재 및 광고 성과 측정 목적. Google은 쿠키를 사용하여 이전 방문 기록을 기반으로
              광고를 게재할 수 있으며, Google 광고 쿠키는{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-500 hover:text-brand-400 transition-colors"
              >
                Google 광고 설정 페이지
              </a>
              에서 관리할 수 있습니다.
            </li>
          </ul>
          <p className="mt-3">
            각 서비스를 통해 수집되는 정보는 Google의 개인정보처리방침에 따라 처리됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">4. 제3자 제공</h2>
          <p>
            DevDogu는 수집된 정보를 제3자에게 판매하거나 제공하지 않습니다.
            단, 법률에 의해 요구되는 경우는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">5. 개인정보 보호 책임</h2>
          <ul className="space-y-2">
            <li><span className="text-[var(--color-text)] font-medium">담당:</span> DevDogu 운영팀</li>
            <li>
              <span className="text-[var(--color-text)] font-medium">이메일:</span>{' '}
              <a href="mailto:leehoh3153@gmail.com" className="text-brand-500 hover:text-brand-400 transition-colors">
                leehoh3153@gmail.com
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">6. 문의</h2>
          <p>
            개인정보 관련 문의사항은 위 이메일을 통해 연락해주시기 바랍니다.
          </p>
        </section>

        <section className="pt-4 border-t border-[var(--color-border)]">
          <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">부칙</h2>
          <ul className="space-y-1">
            <li>본 개인정보처리방침은 <span className="text-[var(--color-text)] font-medium">2026년 3월 9일</span>부터 시행됩니다.</li>
            <li>이전 개인정보처리방침은 본 방침으로 대체됩니다.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
