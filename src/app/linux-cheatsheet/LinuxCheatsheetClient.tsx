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
    title: '파일 & 디렉토리',
    commands: [
      { cmd: 'ls', desc: '현재 디렉토리 파일 목록' },
      { cmd: 'ls -la', desc: '숨김 파일 포함 상세 목록 (권한, 크기, 날짜)' },
      { cmd: 'ls -lh', desc: '파일 크기를 읽기 쉽게 표시 (KB, MB)' },
      { cmd: 'ls -lt', desc: '수정일 기준 최신 파일 먼저 정렬' },
      { cmd: 'cd <dir>', desc: '디렉토리 이동' },
      { cmd: 'cd ~', desc: '홈 디렉토리로 이동' },
      { cmd: 'cd -', desc: '이전 디렉토리로 이동' },
      { cmd: 'pwd', desc: '현재 디렉토리 절대 경로 출력' },
      { cmd: 'mkdir <dir>', desc: '디렉토리 생성' },
      { cmd: 'mkdir -p a/b/c', desc: '중첩 디렉토리 한 번에 생성' },
      { cmd: 'cp <src> <dest>', desc: '파일 복사' },
      { cmd: 'cp -r <src> <dest>', desc: '디렉토리 재귀 복사' },
      { cmd: 'cp -i <src> <dest>', desc: '덮어쓰기 전 확인' },
      { cmd: 'mv <src> <dest>', desc: '파일/디렉토리 이동 또는 이름 변경' },
      { cmd: 'rm <file>', desc: '파일 삭제' },
      { cmd: 'rm -rf <dir>', desc: '디렉토리 강제 재귀 삭제 (주의!)' },
      { cmd: 'touch <file>', desc: '빈 파일 생성 또는 타임스탬프 갱신' },
      { cmd: 'ln -s <target> <link>', desc: '심볼릭 링크 생성' },
      { cmd: 'readlink -f <link>', desc: '심볼릭 링크의 실제 경로' },
      { cmd: 'tree', desc: '디렉토리 트리 구조 출력' },
      { cmd: 'tree -L 2', desc: '깊이 2까지 트리 출력' },
    ],
  },
  {
    title: '파일 내용 보기',
    commands: [
      { cmd: 'cat <file>', desc: '파일 전체 내용 출력' },
      { cmd: 'cat -n <file>', desc: '줄 번호 포함 출력' },
      { cmd: 'head -n 20 <file>', desc: '파일 처음 20줄 출력' },
      { cmd: 'tail -n 20 <file>', desc: '파일 마지막 20줄 출력' },
      { cmd: 'tail -f <file>', desc: '파일 실시간 모니터링 (로그 확인)' },
      { cmd: 'tail -f -n 100 <file>', desc: '마지막 100줄부터 실시간 모니터링' },
      { cmd: 'less <file>', desc: '파일 내용 페이지 단위로 보기 (q로 종료)' },
      { cmd: 'wc -l <file>', desc: '파일 줄 수 세기' },
      { cmd: 'wc -w <file>', desc: '파일 단어 수 세기' },
      { cmd: 'diff <file1> <file2>', desc: '두 파일 차이점 비교' },
      { cmd: 'diff -u <file1> <file2>', desc: 'unified 형식으로 비교 (git diff 스타일)' },
    ],
  },
  {
    title: '검색',
    commands: [
      { cmd: 'find . -name "*.txt"', desc: '파일 이름으로 검색' },
      { cmd: 'find . -name "*.log" -delete', desc: '검색된 파일 삭제' },
      { cmd: 'find . -type d -name "src"', desc: '디렉토리만 검색' },
      { cmd: 'find . -type f -size +100M', desc: '100MB 이상 파일 검색' },
      { cmd: 'find . -mtime -7', desc: '최근 7일 내 수정된 파일' },
      { cmd: 'find . -perm 777', desc: '특정 권한의 파일 검색' },
      { cmd: 'grep "pattern" <file>', desc: '파일에서 문자열 검색' },
      { cmd: 'grep -r "pattern" <dir>', desc: '디렉토리 재귀 검색' },
      { cmd: 'grep -rn "pattern" <dir>', desc: '재귀 검색 + 줄 번호' },
      { cmd: 'grep -i "pattern" <file>', desc: '대소문자 무시 검색' },
      { cmd: 'grep -v "pattern" <file>', desc: '패턴을 포함하지 않는 줄' },
      { cmd: 'grep -c "pattern" <file>', desc: '매칭된 줄 수 출력' },
      { cmd: 'grep -l "pattern" *.txt', desc: '패턴이 포함된 파일 이름만 출력' },
      { cmd: 'which <command>', desc: '명령어의 실행 파일 경로 찾기' },
      { cmd: 'whereis <command>', desc: '명령어의 바이너리, 소스, 매뉴얼 위치' },
      { cmd: 'locate <file>', desc: '파일 빠르게 검색 (DB 기반, updatedb 필요)' },
    ],
  },
  {
    title: '권한 & 소유권',
    commands: [
      { cmd: 'chmod 755 <file>', desc: '권한 설정: rwxr-xr-x (소유자 전체, 그룹/기타 읽기+실행)' },
      { cmd: 'chmod 644 <file>', desc: '권한 설정: rw-r--r-- (소유자 읽기+쓰기, 그룹/기타 읽기)' },
      { cmd: 'chmod 700 <file>', desc: '권한 설정: rwx------ (소유자만 전체 권한)' },
      { cmd: 'chmod +x <file>', desc: '모든 사용자에게 실행 권한 추가' },
      { cmd: 'chmod u+x <file>', desc: '소유자에게만 실행 권한 추가' },
      { cmd: 'chmod -R 755 <dir>', desc: '디렉토리 재귀 권한 설정' },
      { cmd: 'chown user:group <file>', desc: '파일 소유자:그룹 변경' },
      { cmd: 'chown -R user:group <dir>', desc: '디렉토리 재귀 소유자 변경' },
      { cmd: 'chgrp <group> <file>', desc: '파일 그룹만 변경' },
      { cmd: 'umask 022', desc: '새 파일의 기본 권한 마스크 설정' },
    ],
  },
  {
    title: '프로세스 관리',
    commands: [
      { cmd: 'ps aux', desc: '모든 프로세스 상세 목록' },
      { cmd: 'ps aux | grep <name>', desc: '특정 프로세스 이름으로 검색' },
      { cmd: 'top', desc: '실시간 프로세스 모니터링 (q로 종료)' },
      { cmd: 'htop', desc: '향상된 프로세스 모니터링 (색상, 그래프)' },
      { cmd: 'kill <pid>', desc: '프로세스에 SIGTERM 전송 (정상 종료)' },
      { cmd: 'kill -9 <pid>', desc: '프로세스에 SIGKILL 전송 (강제 종료)' },
      { cmd: 'killall <name>', desc: '이름으로 프로세스 모두 종료' },
      { cmd: 'pkill -f "pattern"', desc: '명령행 패턴으로 프로세스 종료' },
      { cmd: 'pgrep -f "pattern"', desc: '명령행 패턴으로 PID 검색' },
      { cmd: 'nohup <command> &', desc: '로그아웃 후에도 백그라운드 실행' },
      { cmd: 'jobs', desc: '현재 셸의 백그라운드 작업 목록' },
      { cmd: 'fg %1', desc: '백그라운드 작업을 포그라운드로 전환' },
      { cmd: 'bg %1', desc: '정지된 작업을 백그라운드에서 실행' },
      { cmd: 'lsof -i :8080', desc: '포트 8080을 사용하는 프로세스 확인' },
    ],
  },
  {
    title: '네트워크',
    commands: [
      { cmd: 'curl <url>', desc: 'URL에 GET 요청' },
      { cmd: 'curl -X POST -H "Content-Type: application/json" -d \'{"key":"value"}\' <url>', desc: 'JSON POST 요청' },
      { cmd: 'curl -o file <url>', desc: '파일 다운로드 (이름 지정)' },
      { cmd: 'curl -I <url>', desc: '응답 헤더만 확인' },
      { cmd: 'wget <url>', desc: '파일 다운로드' },
      { cmd: 'wget -r -np <url>', desc: '웹사이트 재귀 다운로드' },
      { cmd: 'ping <host>', desc: '호스트 연결 확인 (ICMP)' },
      { cmd: 'ping -c 5 <host>', desc: '5회만 핑 전송' },
      { cmd: 'ip addr', desc: '네트워크 인터페이스 IP 확인' },
      { cmd: 'ss -tulpn', desc: '열린 포트와 프로세스 확인' },
      { cmd: 'netstat -tulpn', desc: '열린 포트 확인 (레거시)' },
      { cmd: 'nslookup <domain>', desc: 'DNS 조회' },
      { cmd: 'dig <domain>', desc: '상세 DNS 조회' },
      { cmd: 'ssh user@host', desc: 'SSH 원격 접속' },
      { cmd: 'ssh -p 2222 user@host', desc: '포트 지정 SSH 접속' },
      { cmd: 'scp file user@host:/path', desc: 'SSH로 파일 전송 (로컬→원격)' },
      { cmd: 'scp user@host:/path file', desc: 'SSH로 파일 전송 (원격→로컬)' },
      { cmd: 'rsync -avz <src> <dest>', desc: '효율적인 파일 동기화 (차이분만)' },
    ],
  },
  {
    title: '압축 & 아카이브',
    commands: [
      { cmd: 'tar -czf archive.tar.gz <dir>', desc: 'tar.gz 압축 생성' },
      { cmd: 'tar -xzf archive.tar.gz', desc: 'tar.gz 압축 해제' },
      { cmd: 'tar -xzf archive.tar.gz -C <dir>', desc: '지정 디렉토리에 압축 해제' },
      { cmd: 'tar -tzf archive.tar.gz', desc: '압축 내용 미리 보기 (해제 안함)' },
      { cmd: 'tar -cjf archive.tar.bz2 <dir>', desc: 'tar.bz2 압축 생성 (더 높은 압축률)' },
      { cmd: 'zip -r archive.zip <dir>', desc: 'zip 압축 생성' },
      { cmd: 'unzip archive.zip', desc: 'zip 압축 해제' },
      { cmd: 'unzip -l archive.zip', desc: 'zip 내용 미리 보기' },
      { cmd: 'gzip <file>', desc: '파일 gzip 압축 (원본 삭제)' },
      { cmd: 'gunzip <file>.gz', desc: 'gzip 압축 해제' },
      { cmd: 'zcat <file>.gz', desc: 'gzip 파일 내용 출력 (해제 안함)' },
    ],
  },
  {
    title: '디스크 & 시스템',
    commands: [
      { cmd: 'df -h', desc: '마운트된 파일시스템 디스크 사용량' },
      { cmd: 'du -sh <dir>', desc: '디렉토리 전체 크기 확인' },
      { cmd: 'du -sh * | sort -hr', desc: '현재 디렉토리 항목별 크기 정렬' },
      { cmd: 'du -sh * | sort -hr | head -10', desc: '가장 큰 10개 항목' },
      { cmd: 'free -h', desc: '메모리 사용량 (RAM + Swap)' },
      { cmd: 'uname -a', desc: '커널/OS 전체 정보' },
      { cmd: 'cat /etc/os-release', desc: 'Linux 배포판 정보' },
      { cmd: 'uptime', desc: '시스템 가동 시간 및 부하' },
      { cmd: 'whoami', desc: '현재 로그인 사용자 이름' },
      { cmd: 'id', desc: '현재 사용자의 UID, GID, 그룹 정보' },
      { cmd: 'date', desc: '현재 날짜/시간 출력' },
      { cmd: 'date +"%Y-%m-%d %H:%M:%S"', desc: '포맷 지정 날짜 출력' },
      { cmd: 'history', desc: '명령어 히스토리 (최근 실행 명령어)' },
      { cmd: 'history | grep <keyword>', desc: '히스토리에서 특정 명령 검색' },
      { cmd: 'alias ll="ls -la"', desc: '명령어 별칭 설정 (현재 세션)' },
      { cmd: 'env', desc: '현재 환경 변수 목록' },
      { cmd: 'export KEY=VALUE', desc: '환경 변수 설정' },
      { cmd: 'crontab -e', desc: '크론 작업 편집' },
      { cmd: 'crontab -l', desc: '크론 작업 목록' },
    ],
  },
  {
    title: '파이프 & 리다이렉션',
    commands: [
      { cmd: 'command > file', desc: '표준 출력을 파일로 저장 (덮어쓰기)' },
      { cmd: 'command >> file', desc: '표준 출력을 파일에 추가' },
      { cmd: 'command 2> error.log', desc: '에러 출력(stderr)만 파일로' },
      { cmd: 'command &> all.log', desc: '표준 출력 + 에러 출력 모두 파일로' },
      { cmd: 'command 2>&1', desc: 'stderr를 stdout으로 합치기' },
      { cmd: 'cmd1 | cmd2', desc: 'cmd1의 출력을 cmd2의 입력으로 파이프' },
      { cmd: 'cmd1 | tee file | cmd2', desc: '출력을 파일에 저장하면서 파이프' },
      { cmd: 'sort <file>', desc: '파일 내용 정렬' },
      { cmd: 'sort -r <file>', desc: '역순 정렬' },
      { cmd: 'sort -n <file>', desc: '숫자 기준 정렬' },
      { cmd: 'sort file | uniq', desc: '정렬 후 중복 행 제거' },
      { cmd: 'sort file | uniq -c | sort -rn', desc: '빈도수 기준 정렬' },
      { cmd: "awk '{print $1}' file", desc: '첫 번째 컬럼만 출력' },
      { cmd: "awk -F: '{print $1}' /etc/passwd", desc: '구분자 지정하여 컬럼 출력' },
      { cmd: "sed 's/old/new/g' file", desc: '문자열 전체 치환' },
      { cmd: "sed -i 's/old/new/g' file", desc: '파일 직접 수정 (in-place)' },
      { cmd: 'cut -d: -f1 /etc/passwd', desc: '구분자 기준 특정 필드 추출' },
      { cmd: 'xargs', desc: '표준 입력을 명령어 인자로 변환' },
      { cmd: "find . -name '*.log' | xargs rm", desc: '검색 결과를 인자로 삭제' },
    ],
  },
];

const CATEGORY_NAMES = SECTIONS.map((s) => s.title);

interface LinuxCheatsheetClientProps {
  dict?: Record<string, string>;
}

export default function LinuxCheatsheetClient({ dict }: LinuxCheatsheetClientProps) {
  const t = (key: string, fallback: string) => dict?.[key] ?? fallback;
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
      <div className="relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('searchPlaceholder', '명령어 검색... (예: chmod, grep, tar, ssh, find)')}
          className="input-area px-4 py-3 pr-10"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] text-lg"
            title={t('clearSearch', '검색 초기화')}
          >
            ×
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !activeCategory
              ? 'bg-brand-500 text-white'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] border border-[var(--color-border)]'
          }`}
        >
          {t('all', '전체')}
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

      <p className="text-xs text-[var(--color-text-secondary)]">
        {totalCount}{t('commandCount', '개 명령어')} {search && `(${t('search', '검색')}: "${search}")`}
      </p>

      <div className="space-y-6">
        {filtered.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg font-semibold mb-3">{section.title}</h2>
            <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-surface)]">
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">{t('command', '명령어')}</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-[40%]">{t('description', '설명')}</th>
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
                            title={t('copy', '복사')}
                          >
                            {copiedCmd === cmd.cmd ? '✓' : t('copy', '복사')}
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
        <div className="text-center py-8 space-y-3">
          <p className="text-[var(--color-text-secondary)]">
            {t('noResults', '검색 결과가 없습니다.')}
          </p>
          <button
            onClick={() => { setSearch(''); setActiveCategory(null); }}
            className="text-brand-500 hover:text-brand-600 text-sm font-medium"
          >
            {t('viewAll', '전체 보기')}
          </button>
        </div>
      )}
    </div>
  );
}
