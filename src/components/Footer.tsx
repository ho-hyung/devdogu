import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-[var(--color-text-secondary)]">
            © {new Date().getFullYear()} DevDogu. 모든 도구는 무료이며, 데이터는 브라우저에서만 처리됩니다.
          </div>
          <nav className="flex items-center gap-6 text-sm text-[var(--color-text-secondary)]">
            <Link href="/about" className="hover:text-[var(--color-text)] transition-colors">
              소개
            </Link>
            <Link href="/privacy" className="hover:text-[var(--color-text)] transition-colors">
              개인정보처리방침
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
