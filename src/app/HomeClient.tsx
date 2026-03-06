'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools, categories, type Tool } from '@/lib/tools';
import { useFavorites } from '@/hooks/useFavorites';
import { useRecentTools } from '@/hooks/useRecentTools';

type Category = keyof typeof categories;

const CATEGORY_KEYS = Object.keys(categories) as Category[];

export default function HomeClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const { favorites, toggleFavorite, isFavorite, isHydrated: favHydrated } = useFavorites();
  const { recent, isHydrated: recentHydrated } = useRecentTools();

  const query = search.toLowerCase();

  const filtered = tools.filter((tool) => {
    if (activeCategory && tool.category !== activeCategory) return false;
    if (!query) return true;
    return (
      tool.name.toLowerCase().includes(query) ||
      tool.nameEn.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(query))
    );
  });

  const groupedByCategory = CATEGORY_KEYS
    .map((key) => ({
      key,
      ...categories[key],
      tools: filtered.filter((t) => t.category === key),
    }))
    .filter((group) => group.tools.length > 0);

  const showGrouped = !query && !activeCategory;

  const favoriteTools = favHydrated
    ? favorites.map((id) => tools.find((t) => t.id === id)).filter((t): t is Tool => !!t)
    : [];

  const recentTools = recentHydrated
    ? recent.map((id) => tools.find((t) => t.id === id)).filter((t): t is Tool => !!t)
    : [];

  return (
    <>
      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="도구 검색... (예: JSON, Base64, regex, git, docker)"
            className="w-full pl-10 pr-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 placeholder:text-[var(--color-text-secondary)]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-sm"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeCategory
              ? 'bg-brand-500 text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
          }`}
        >
          전체
        </button>
        {CATEGORY_KEYS.map((key) => (
          <button
            key={key}
            onClick={() => setActiveCategory(activeCategory === key ? null : key)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === key
                ? 'bg-brand-500 text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
            }`}
          >
            {categories[key].name}
          </button>
        ))}
      </div>

      {/* Result count when searching */}
      {(query || activeCategory) && (
        <p className="text-center text-xs text-[var(--color-text-secondary)] mb-6">
          {filtered.length}개 도구
          {query && ` (검색: "${search}")`}
        </p>
      )}

      {/* Favorites Section */}
      {showGrouped && favHydrated && favoriteTools.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            즐겨찾기
          </h2>
          <ToolGrid tools={favoriteTools} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />
        </section>
      )}

      {/* Recent Tools Section */}
      {showGrouped && recentHydrated && recentTools.length > 0 && (
        <section className="mb-10">
          <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            최근 사용
          </h2>
          <ToolGrid tools={recentTools} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />
        </section>
      )}

      {/* Tools Grid */}
      <section>
        {showGrouped ? (
          <div className="space-y-10">
            {groupedByCategory.map((group) => (
              <div key={group.key}>
                <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
                  {group.name}
                </h2>
                <ToolGrid tools={group.tools} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {filtered.length > 0 ? (
              <ToolGrid tools={filtered} onToggleFavorite={toggleFavorite} isFavorite={isFavorite} />
            ) : (
              <div className="text-center py-16">
                <p className="text-[var(--color-text-secondary)] mb-2">
                  &quot;{search}&quot;에 대한 검색 결과가 없습니다.
                </p>
                <button
                  onClick={() => { setSearch(''); setActiveCategory(null); }}
                  className="text-brand-500 text-sm hover:underline"
                >
                  전체 도구 보기
                </button>
              </div>
            )}
          </>
        )}

        {/* Coming Soon Card - only in default view */}
        {showGrouped && (
          <div className="mt-4">
            <div className="tool-card opacity-50 cursor-default">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[var(--color-border)] rounded-xl flex items-center justify-center text-sm shrink-0">
                  +
                </div>
                <div>
                  <h2 className="font-semibold text-[15px] mb-1">더 많은 도구</h2>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    새로운 도구를 계속 추가하고 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

interface ToolGridProps {
  tools: Tool[];
  onToggleFavorite?: (id: string) => void;
  isFavorite?: (id: string) => boolean;
}

function ToolGrid({ tools, onToggleFavorite, isFavorite }: ToolGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <div key={tool.id} className="tool-card group relative">
          <Link href={tool.href} className="flex items-start gap-4">
            <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center font-mono text-sm font-bold text-brand-500 shrink-0 group-hover:bg-brand-500/20 transition-colors">
              {tool.icon}
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-[15px] group-hover:text-brand-500 transition-colors mb-1">
                {tool.name}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {tool.description}
              </p>
            </div>
          </Link>
          {onToggleFavorite && isFavorite && (
            <button
              onClick={(e) => { e.preventDefault(); onToggleFavorite(tool.id); }}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-md hover:bg-[var(--color-surface)] transition-colors opacity-0 group-hover:opacity-100"
              aria-label={isFavorite(tool.id) ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            >
              <svg
                className={`w-4 h-4 transition-colors ${isFavorite(tool.id) ? 'text-yellow-400 fill-yellow-400' : 'text-[var(--color-text-secondary)]'}`}
                fill={isFavorite(tool.id) ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
