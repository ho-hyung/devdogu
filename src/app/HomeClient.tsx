'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tools, categories, type Tool } from '@/lib/tools';

type Category = keyof typeof categories;

const CATEGORY_KEYS = Object.keys(categories) as Category[];

export default function HomeClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

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

      {/* Tools Grid */}
      <section>
        {showGrouped ? (
          <div className="space-y-10">
            {groupedByCategory.map((group) => (
              <div key={group.key}>
                <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-4">
                  {group.name}
                </h2>
                <ToolGrid tools={group.tools} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {filtered.length > 0 ? (
              <ToolGrid tools={filtered} />
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

function ToolGrid({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((tool) => (
        <Link key={tool.id} href={tool.href} className="tool-card group">
          <div className="flex items-start gap-4">
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
          </div>
        </Link>
      ))}
    </div>
  );
}
