import { createMetadata } from '@/lib/metadata';
import DockerCheatsheetClient from './DockerCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Docker 명령어 모음 치트시트',
  description:
    '자주 쓰는 Docker 명령어 치트시트 — docker run, compose, build, exec 등 컨테이너, 이미지, 볼륨, 네트워크, Dockerfile 명령어를 카테고리별로 정리. 복사 버튼으로 바로 사용하세요.',
  path: '/docker-cheatsheet',
  keywords: [
    'Docker 명령어', 'Docker cheatsheet', 'docker compose', 'docker run', '도커 명령어',
    'docker build', 'docker exec', 'Dockerfile', 'docker-compose', '도커 치트시트',
    'docker volume', 'docker network', 'docker logs', '컨테이너 명령어',
  ],
});

const faq = [
  { q: 'Docker와 Docker Compose의 차이점은 무엇인가요?', a: 'Docker는 단일 컨테이너를 관리하는 도구이고, Docker Compose는 여러 컨테이너를 docker-compose.yml(또는 compose.yaml) 파일로 정의하고 한 번에 관리할 수 있는 도구입니다. 웹앱 + DB + Redis 같은 멀티 서비스 환경에서 필수적입니다.' },
  { q: 'Docker 이미지와 컨테이너의 차이는 무엇인가요?', a: '이미지는 애플리케이션 실행에 필요한 파일, 라이브러리, 설정을 담은 불변(immutable) 템플릿이고, 컨테이너는 이미지를 기반으로 생성된 실행 중인 인스턴스입니다. 하나의 이미지로 여러 컨테이너를 만들 수 있습니다.' },
  { q: 'Docker 볼륨은 왜 사용하나요?', a: '컨테이너는 삭제되면 내부 데이터가 사라집니다. 볼륨(volume)을 사용하면 컨테이너가 삭제되어도 데이터를 영구적으로 보존할 수 있고, 호스트와 컨테이너 간 데이터 공유에도 활용됩니다.' },
  { q: 'docker run -d와 docker run -it의 차이는 무엇인가요?', a: '-d(detached)는 컨테이너를 백그라운드에서 실행합니다. -it는 -i(interactive) + -t(tty)로, 터미널에서 컨테이너와 대화형으로 상호작용할 수 있습니다. 서비스는 -d, 디버깅은 -it를 사용합니다.' },
  { q: 'Dockerfile에서 CMD와 ENTRYPOINT의 차이는 무엇인가요?', a: 'CMD는 컨테이너 시작 시 기본 명령어를 지정하며 docker run 인자로 덮어쓸 수 있습니다. ENTRYPOINT는 항상 실행되는 고정 명령어이며, CMD의 값은 ENTRYPOINT의 인자로 전달됩니다.' },
  { q: 'Docker 멀티 스테이지 빌드란 무엇인가요?', a: 'Dockerfile에서 여러 FROM을 사용하여 빌드 단계와 실행 단계를 분리하는 기법입니다. 빌드에 필요한 도구(컴파일러 등)를 최종 이미지에 포함하지 않아 이미지 크기를 크게 줄일 수 있습니다.' },
  { q: 'docker compose up과 docker compose up --build의 차이는?', a: 'docker compose up은 기존에 빌드된 이미지가 있으면 재사용합니다. --build 옵션을 추가하면 매번 이미지를 새로 빌드하므로, 코드 변경 후에는 --build를 사용해야 합니다.' },
];

export default function DockerCheatsheetPage() {
  return (
    <ToolLayout toolId="docker-cheatsheet" faq={faq}>
      <DockerCheatsheetClient />
    </ToolLayout>
  );
}
