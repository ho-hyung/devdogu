import Link from 'next/link';
import { tools } from '@/lib/tools';

interface ToolLayoutProps {
  toolId: string;
  children: React.ReactNode;
  faq?: { q: string; a: string }[];
}

export default function ToolLayout({ toolId, children, faq }: ToolLayoutProps) {
  const tool = tools.find((t) => t.id === toolId);
  const relatedTools = tools.filter((t) => t.id !== toolId).slice(0, 4);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-6">
        <Link href="/" className="hover:text-[var(--color-text)] transition-colors">
          홈
        </Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{tool?.name}</span>
      </nav>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          {tool?.name}
        </h1>
        <p className="text-[var(--color-text-secondary)]">{tool?.description}</p>
      </div>

      {/* Tool Content */}
      <div className="mb-12">{children}</div>

      {/* FAQ Section - SEO용 */}
      {faq && faq.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4">자주 묻는 질문</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-sm">
                  {item.q}
                  <span className="text-[var(--color-text-secondary)] group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <div className="px-4 pb-4 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools - 내부 링크 강화 */}
      <section>
        <h2 className="text-lg font-semibold mb-4">다른 도구</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {relatedTools.map((t) => (
            <Link key={t.id} href={t.href} className="tool-card group">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-brand-500 bg-brand-500/10 rounded-md px-2 py-1">
                  {t.icon}
                </span>
                <div>
                  <div className="font-medium text-sm group-hover:text-brand-500 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-1">
                    {t.description}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
