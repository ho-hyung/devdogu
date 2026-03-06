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
    title: '컨테이너 관리',
    commands: [
      { cmd: 'docker run <image>', desc: '이미지로 컨테이너 실행' },
      { cmd: 'docker run -d <image>', desc: '백그라운드에서 실행 (detached)' },
      { cmd: 'docker run -it <image> /bin/bash', desc: '인터랙티브 셸로 실행' },
      { cmd: 'docker run -p 8080:80 <image>', desc: '포트 매핑하여 실행 (호스트:컨테이너)' },
      { cmd: 'docker run -v /host:/container <image>', desc: '볼륨 마운트하여 실행' },
      { cmd: 'docker run --name my-app <image>', desc: '이름을 지정하여 실행' },
      { cmd: 'docker run --rm <image>', desc: '종료 시 자동 삭제' },
      { cmd: 'docker run -e KEY=VALUE <image>', desc: '환경 변수 설정하여 실행' },
      { cmd: 'docker run --env-file .env <image>', desc: '.env 파일로 환경 변수 전달' },
      { cmd: 'docker run --restart unless-stopped <image>', desc: '자동 재시작 정책 설정' },
      { cmd: 'docker ps', desc: '실행 중인 컨테이너 목록' },
      { cmd: 'docker ps -a', desc: '모든 컨테이너 목록 (정지 포함)' },
      { cmd: 'docker stop <container>', desc: '컨테이너 정지' },
      { cmd: 'docker start <container>', desc: '정지된 컨테이너 시작' },
      { cmd: 'docker restart <container>', desc: '컨테이너 재시작' },
      { cmd: 'docker rm <container>', desc: '컨테이너 삭제' },
      { cmd: 'docker rm -f <container>', desc: '실행 중인 컨테이너 강제 삭제' },
      { cmd: 'docker exec -it <container> /bin/bash', desc: '실행 중인 컨테이너에 셸 접속' },
      { cmd: 'docker logs <container>', desc: '컨테이너 로그 확인' },
      { cmd: 'docker logs -f --tail 100 <container>', desc: '최근 100줄부터 실시간 로그' },
      { cmd: 'docker inspect <container>', desc: '컨테이너 상세 정보 (JSON)' },
      { cmd: 'docker container prune', desc: '정지된 모든 컨테이너 삭제' },
    ],
  },
  {
    title: '이미지 관리',
    commands: [
      { cmd: 'docker images', desc: '로컬 이미지 목록' },
      { cmd: 'docker pull <image>', desc: '레지스트리에서 이미지 다운로드' },
      { cmd: 'docker pull <image>:<tag>', desc: '특정 태그의 이미지 다운로드' },
      { cmd: 'docker build -t <name> .', desc: 'Dockerfile로 이미지 빌드' },
      { cmd: 'docker build -t <name>:<tag> .', desc: '태그 지정하여 빌드' },
      { cmd: 'docker build -f Dockerfile.prod .', desc: '커스텀 Dockerfile 지정 빌드' },
      { cmd: 'docker build --no-cache -t <name> .', desc: '캐시 없이 빌드' },
      { cmd: 'docker tag <image> <new-name>:<tag>', desc: '이미지 태그 변경' },
      { cmd: 'docker push <image>', desc: '레지스트리에 이미지 푸시' },
      { cmd: 'docker rmi <image>', desc: '이미지 삭제' },
      { cmd: 'docker image prune', desc: '사용하지 않는 이미지 삭제' },
      { cmd: 'docker image prune -a', desc: '참조되지 않는 모든 이미지 삭제' },
      { cmd: 'docker history <image>', desc: '이미지 레이어 이력' },
      { cmd: 'docker save -o backup.tar <image>', desc: '이미지를 tar 파일로 저장' },
      { cmd: 'docker load -i backup.tar', desc: 'tar 파일에서 이미지 복원' },
    ],
  },
  {
    title: '볼륨 & 네트워크',
    commands: [
      { cmd: 'docker volume ls', desc: '볼륨 목록' },
      { cmd: 'docker volume create <name>', desc: '볼륨 생성' },
      { cmd: 'docker volume inspect <name>', desc: '볼륨 상세 정보' },
      { cmd: 'docker volume rm <name>', desc: '볼륨 삭제' },
      { cmd: 'docker volume prune', desc: '사용하지 않는 볼륨 삭제' },
      { cmd: 'docker network ls', desc: '네트워크 목록' },
      { cmd: 'docker network create <name>', desc: '네트워크 생성' },
      { cmd: 'docker network create --driver bridge <name>', desc: '브리지 네트워크 생성' },
      { cmd: 'docker network connect <net> <container>', desc: '컨테이너를 네트워크에 연결' },
      { cmd: 'docker network disconnect <net> <container>', desc: '네트워크 연결 해제' },
      { cmd: 'docker network inspect <name>', desc: '네트워크 상세 정보' },
      { cmd: 'docker network rm <name>', desc: '네트워크 삭제' },
    ],
  },
  {
    title: '시스템 & 정리',
    commands: [
      { cmd: 'docker system df', desc: '디스크 사용량 확인' },
      { cmd: 'docker system prune', desc: '사용하지 않는 리소스 정리' },
      { cmd: 'docker system prune -a --volumes', desc: '모든 미사용 리소스 + 볼륨 정리' },
      { cmd: 'docker stats', desc: '컨테이너 리소스 사용량 실시간 모니터링' },
      { cmd: 'docker top <container>', desc: '컨테이너 프로세스 확인' },
      { cmd: 'docker cp <container>:/path /host/path', desc: '컨테이너에서 호스트로 파일 복사' },
      { cmd: 'docker cp /host/path <container>:/path', desc: '호스트에서 컨테이너로 파일 복사' },
      { cmd: 'docker info', desc: 'Docker 시스템 정보' },
      { cmd: 'docker version', desc: 'Docker 버전 확인' },
    ],
  },
  {
    title: 'Docker Compose',
    commands: [
      { cmd: 'docker compose up', desc: '서비스 시작 (포그라운드)' },
      { cmd: 'docker compose up -d', desc: '백그라운드에서 서비스 시작' },
      { cmd: 'docker compose up --build', desc: '이미지 빌드 후 서비스 시작' },
      { cmd: 'docker compose up -d --scale web=3', desc: '서비스 인스턴스 3개로 스케일링' },
      { cmd: 'docker compose down', desc: '서비스 정지 및 컨테이너/네트워크 삭제' },
      { cmd: 'docker compose down -v', desc: '볼륨 포함 정지 및 삭제' },
      { cmd: 'docker compose down --rmi all', desc: '이미지까지 포함 삭제' },
      { cmd: 'docker compose ps', desc: '서비스 상태 목록' },
      { cmd: 'docker compose logs', desc: '모든 서비스 로그 확인' },
      { cmd: 'docker compose logs -f <service>', desc: '특정 서비스 실시간 로그' },
      { cmd: 'docker compose exec <service> bash', desc: '서비스 컨테이너에 셸 접속' },
      { cmd: 'docker compose run <service> <cmd>', desc: '일회성 명령어 실행' },
      { cmd: 'docker compose build', desc: '서비스 이미지 빌드' },
      { cmd: 'docker compose pull', desc: '서비스 이미지 다운로드' },
      { cmd: 'docker compose restart <service>', desc: '특정 서비스 재시작' },
      { cmd: 'docker compose config', desc: 'Compose 파일 유효성 확인 및 렌더링' },
      { cmd: 'docker compose top', desc: '서비스 프로세스 확인' },
    ],
  },
  {
    title: 'Dockerfile 주요 명령어',
    commands: [
      { cmd: 'FROM <image>', desc: '베이스 이미지 지정' },
      { cmd: 'FROM <image> AS builder', desc: '멀티 스테이지 빌드 스테이지 이름' },
      { cmd: 'WORKDIR /app', desc: '작업 디렉토리 설정' },
      { cmd: 'COPY . .', desc: '파일 복사 (빌드 컨텍스트 → 이미지)' },
      { cmd: 'COPY --from=builder /app/dist .', desc: '다른 스테이지에서 파일 복사' },
      { cmd: 'ADD <src> <dest>', desc: '파일 복사 (URL, tar 자동 해제 지원)' },
      { cmd: 'RUN npm install', desc: '빌드 시 명령어 실행 (새 레이어 생성)' },
      { cmd: 'CMD ["node", "index.js"]', desc: '컨테이너 시작 기본 명령어' },
      { cmd: 'ENTRYPOINT ["node"]', desc: '고정 실행 명령어 (CMD와 조합)' },
      { cmd: 'EXPOSE 3000', desc: '포트 문서화 (실제 포트 열기 아님)' },
      { cmd: 'ENV KEY=VALUE', desc: '환경 변수 설정 (런타임 지속)' },
      { cmd: 'ARG VERSION=latest', desc: '빌드 인자 정의 (빌드 시에만 사용)' },
      { cmd: 'VOLUME /data', desc: '볼륨 마운트 포인트 정의' },
      { cmd: 'USER node', desc: '이후 명령어의 실행 사용자 지정' },
      { cmd: 'HEALTHCHECK CMD curl -f http://localhost/', desc: '컨테이너 헬스체크 설정' },
    ],
  },
];

const CATEGORY_NAMES = SECTIONS.map((s) => s.title);

export default function DockerCheatsheetClient() {
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
          placeholder="명령어 검색... (예: compose, volume, build, exec)"
          className="input-area px-4 py-3 pr-10"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] text-lg"
            title="검색 초기화"
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

      <p className="text-xs text-[var(--color-text-secondary)]">
        {totalCount}개 명령어 {search && `(검색: "${search}")`}
      </p>

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
        <div className="text-center py-8 space-y-3">
          <p className="text-[var(--color-text-secondary)]">
            검색 결과가 없습니다.
          </p>
          <button
            onClick={() => { setSearch(''); setActiveCategory(null); }}
            className="text-brand-500 hover:text-brand-600 text-sm font-medium"
          >
            전체 보기
          </button>
        </div>
      )}
    </div>
  );
}
