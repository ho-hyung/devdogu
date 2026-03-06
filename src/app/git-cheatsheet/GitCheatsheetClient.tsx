'use client';

import { useState, useCallback } from 'react';

interface Command {
  cmd: string;
  desc: string;
}

interface Section {
  title: string;
  commands: Command[];
}

const SECTIONS: Section[] = [
  {
    title: '설정',
    commands: [
      { cmd: 'git config --global user.name "이름"', desc: '전역 사용자 이름 설정' },
      { cmd: 'git config --global user.email "이메일"', desc: '전역 이메일 설정' },
      { cmd: 'git config --list', desc: '설정 목록 확인' },
      { cmd: 'git config --global core.editor "code --wait"', desc: '기본 에디터 변경' },
    ],
  },
  {
    title: '저장소 생성 & 복제',
    commands: [
      { cmd: 'git init', desc: '새 Git 저장소 초기화' },
      { cmd: 'git clone <url>', desc: '원격 저장소 복제' },
      { cmd: 'git clone --depth 1 <url>', desc: '최신 커밋만 얕은 복제' },
      { cmd: 'git clone -b <branch> <url>', desc: '특정 브랜치만 복제' },
    ],
  },
  {
    title: '스테이징 & 커밋',
    commands: [
      { cmd: 'git status', desc: '현재 상태 확인' },
      { cmd: 'git add <file>', desc: '특정 파일 스테이징' },
      { cmd: 'git add .', desc: '모든 변경사항 스테이징' },
      { cmd: 'git add -p', desc: '변경사항을 부분적으로 스테이징' },
      { cmd: 'git commit -m "메시지"', desc: '커밋 생성' },
      { cmd: 'git commit --amend', desc: '마지막 커밋 수정' },
      { cmd: 'git commit --amend --no-edit', desc: '메시지 변경 없이 마지막 커밋 수정' },
    ],
  },
  {
    title: '브랜치',
    commands: [
      { cmd: 'git branch', desc: '로컬 브랜치 목록' },
      { cmd: 'git branch -a', desc: '모든 브랜치 목록 (원격 포함)' },
      { cmd: 'git branch <name>', desc: '새 브랜치 생성' },
      { cmd: 'git checkout <branch>', desc: '브랜치 전환' },
      { cmd: 'git checkout -b <branch>', desc: '브랜치 생성 후 전환' },
      { cmd: 'git switch <branch>', desc: '브랜치 전환 (Git 2.23+)' },
      { cmd: 'git switch -c <branch>', desc: '브랜치 생성 후 전환 (Git 2.23+)' },
      { cmd: 'git branch -d <branch>', desc: '브랜치 삭제 (머지된 경우)' },
      { cmd: 'git branch -D <branch>', desc: '브랜치 강제 삭제' },
      { cmd: 'git branch -m <old> <new>', desc: '브랜치 이름 변경' },
    ],
  },
  {
    title: '머지 & 리베이스',
    commands: [
      { cmd: 'git merge <branch>', desc: '브랜치 머지' },
      { cmd: 'git merge --no-ff <branch>', desc: '머지 커밋 강제 생성' },
      { cmd: 'git merge --squash <branch>', desc: '모든 커밋을 하나로 합쳐 머지' },
      { cmd: 'git merge --abort', desc: '머지 중단' },
      { cmd: 'git rebase <branch>', desc: '현재 브랜치를 대상 브랜치 위에 리베이스' },
      { cmd: 'git rebase -i HEAD~3', desc: '최근 3개 커밋 인터랙티브 리베이스' },
      { cmd: 'git rebase --abort', desc: '리베이스 중단' },
      { cmd: 'git rebase --continue', desc: '충돌 해결 후 리베이스 계속' },
      { cmd: 'git cherry-pick <commit>', desc: '특정 커밋만 현재 브랜치에 적용' },
    ],
  },
  {
    title: '원격 저장소',
    commands: [
      { cmd: 'git remote -v', desc: '원격 저장소 목록' },
      { cmd: 'git remote add origin <url>', desc: '원격 저장소 추가' },
      { cmd: 'git remote set-url origin <url>', desc: '원격 URL 변경' },
      { cmd: 'git push -u origin <branch>', desc: '브랜치 푸시 (업스트림 설정)' },
      { cmd: 'git push', desc: '현재 브랜치 푸시' },
      { cmd: 'git push origin --delete <branch>', desc: '원격 브랜치 삭제' },
      { cmd: 'git pull', desc: '원격 변경사항 가져오기 + 머지' },
      { cmd: 'git pull --rebase', desc: '원격 변경사항 가져오기 + 리베이스' },
      { cmd: 'git fetch', desc: '원격 변경사항 가져오기 (머지 안함)' },
      { cmd: 'git fetch --prune', desc: '삭제된 원격 브랜치 정리' },
      { cmd: 'git push --force-with-lease', desc: '안전한 강제 푸시' },
    ],
  },
  {
    title: 'Stash',
    commands: [
      { cmd: 'git stash', desc: '현재 변경사항 임시 저장' },
      { cmd: 'git stash -u', desc: '추적되지 않는 파일 포함 임시 저장' },
      { cmd: 'git stash save "메시지"', desc: '메시지와 함께 임시 저장' },
      { cmd: 'git stash list', desc: '스태시 목록' },
      { cmd: 'git stash pop', desc: '최근 스태시 적용 후 삭제' },
      { cmd: 'git stash apply', desc: '최근 스태시 적용 (삭제 안함)' },
      { cmd: 'git stash apply stash@{2}', desc: '특정 스태시 적용' },
      { cmd: 'git stash drop', desc: '최근 스태시 삭제' },
      { cmd: 'git stash clear', desc: '모든 스태시 삭제' },
    ],
  },
  {
    title: '조회 & 로그',
    commands: [
      { cmd: 'git log --oneline', desc: '간략한 커밋 로그' },
      { cmd: 'git log --graph --oneline --all', desc: '모든 브랜치 그래프로 보기' },
      { cmd: 'git log -p <file>', desc: '파일의 변경 이력' },
      { cmd: 'git log --since="2024-01-01"', desc: '특정 날짜 이후 커밋' },
      { cmd: 'git log --author="이름"', desc: '특정 작성자의 커밋' },
      { cmd: 'git diff', desc: '스테이징되지 않은 변경사항' },
      { cmd: 'git diff --staged', desc: '스테이징된 변경사항' },
      { cmd: 'git diff <branch1>..<branch2>', desc: '두 브랜치 비교' },
      { cmd: 'git show <commit>', desc: '특정 커밋의 상세 정보' },
      { cmd: 'git blame <file>', desc: '파일의 각 줄 작성자 확인' },
      { cmd: 'git shortlog -sn', desc: '작성자별 커밋 수 통계' },
      { cmd: 'git reflog', desc: 'HEAD 이동 이력 (복구용)' },
    ],
  },
  {
    title: '되돌리기',
    commands: [
      { cmd: 'git checkout -- <file>', desc: '파일의 변경사항 되돌리기' },
      { cmd: 'git restore <file>', desc: '파일 복원 (Git 2.23+)' },
      { cmd: 'git restore --staged <file>', desc: '스테이징 취소' },
      { cmd: 'git reset HEAD~1', desc: '마지막 커밋 취소 (변경사항 유지)' },
      { cmd: 'git reset --soft HEAD~1', desc: '커밋 취소 (스테이징 유지)' },
      { cmd: 'git reset --hard HEAD~1', desc: '마지막 커밋 취소 (변경사항 삭제)' },
      { cmd: 'git revert <commit>', desc: '특정 커밋을 되돌리는 새 커밋 생성' },
      { cmd: 'git clean -fd', desc: '추적되지 않는 파일/디렉토리 삭제' },
      { cmd: 'git clean -fdn', desc: '삭제될 파일 미리보기 (dry-run)' },
    ],
  },
  {
    title: '태그',
    commands: [
      { cmd: 'git tag', desc: '태그 목록' },
      { cmd: 'git tag v1.0.0', desc: '경량 태그 생성' },
      { cmd: 'git tag -a v1.0.0 -m "메시지"', desc: '주석 태그 생성' },
      { cmd: 'git push origin v1.0.0', desc: '태그 푸시' },
      { cmd: 'git push origin --tags', desc: '모든 태그 푸시' },
      { cmd: 'git tag -d v1.0.0', desc: '로컬 태그 삭제' },
      { cmd: 'git push origin :refs/tags/v1.0.0', desc: '원격 태그 삭제' },
    ],
  },
];

const CATEGORY_NAMES = SECTIONS.map((s) => s.title);

export default function GitCheatsheetClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = useCallback(async (cmd: string) => {
    await navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1500);
  }, []);

  const filtered = SECTIONS
    .filter((section) => !activeCategory || section.title === activeCategory)
    .map((section) => ({
      ...section,
      commands: section.commands.filter(
        (c) =>
          c.cmd.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.commands.length > 0);

  const totalCount = filtered.reduce((sum, s) => sum + s.commands.length, 0);

  return (
    <div className="space-y-6">
      {/* 검색 */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="명령어 검색... (예: rebase, stash, merge, cherry-pick)"
        className="input-area px-4 py-3"
      />

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeCategory
              ? 'bg-brand-500 text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
          }`}
        >
          전체
        </button>
        {CATEGORY_NAMES.map((name) => (
          <button
            key={name}
            onClick={() => setActiveCategory(activeCategory === name ? null : name)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === name
                ? 'bg-brand-500 text-white'
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* 결과 카운트 */}
      <p className="text-xs text-[var(--color-text-secondary)]">
        {totalCount}개 명령어 {search && `(검색: "${search}")`}
      </p>

      {/* 명령어 목록 */}
      <div className="space-y-6">
        {filtered.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
            <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-surface)]">
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">명령어</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-[40%]">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {section.commands.map((cmd) => (
                    <tr key={cmd.cmd} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors group">
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-xs text-brand-500 bg-brand-500/10 px-2 py-1 rounded">{cmd.cmd}</code>
                          <button
                            onClick={() => handleCopy(cmd.cmd)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[var(--color-text-secondary)] hover:text-brand-500 shrink-0"
                            title="복사"
                          >
                            {copiedCmd === cmd.cmd ? '✓' : '복사'}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{cmd.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-[var(--color-text-secondary)] py-8">
          검색 결과가 없습니다.
        </p>
      )}
    </div>
  );
}
