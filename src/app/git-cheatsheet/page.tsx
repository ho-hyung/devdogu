import { createMetadata } from '@/lib/metadata';
import GitCheatsheetClient from './GitCheatsheetClient';
import ToolLayout from '@/components/ToolLayout';

export const metadata = createMetadata({
  title: 'Git 명령어 모음 치트시트',
  description:
    '자주 쓰는 Git 명령어 치트시트 — git rebase, merge, branch, stash, cherry-pick, reset 등 카테고리별 Git 명령어 정리. 복사 버튼으로 바로 사용하세요.',
  path: '/git-cheatsheet',
  keywords: [
    'Git 명령어', 'Git cheatsheet', 'git rebase', 'git merge', 'git branch',
    'git stash', 'git reset', 'git cherry-pick', 'git 치트시트', '깃 명령어 모음',
    'git commit', 'git push', 'git pull', 'git clone', 'git diff', 'git log',
  ],
});

const faq = [
  { q: 'Git rebase와 merge의 차이점은 무엇인가요?', a: 'merge는 두 브랜치의 변경사항을 합쳐 새로운 머지 커밋을 만듭니다. rebase는 현재 브랜치의 커밋들을 대상 브랜치 위에 재배치하여 깔끔한 선형 히스토리를 만듭니다. 공유 브랜치에서는 merge, 개인 브랜치에서는 rebase를 사용하는 것이 일반적입니다.' },
  { q: 'git stash는 언제 사용하나요?', a: '현재 작업 중인 변경사항을 임시로 저장하고 다른 작업을 할 때 사용합니다. 브랜치 전환 전에 커밋하지 않고 변경사항을 보관할 수 있습니다. git stash pop으로 다시 복원합니다.' },
  { q: 'git reset과 git revert의 차이점은 무엇인가요?', a: 'reset은 커밋을 완전히 되돌려 히스토리에서 제거합니다. revert는 이전 커밋의 변경을 되돌리는 새 커밋을 생성하므로 히스토리가 보존됩니다. 이미 푸시한 커밋은 revert를 사용하는 것이 안전합니다.' },
  { q: 'git cherry-pick은 어떤 상황에서 사용하나요?', a: 'cherry-pick은 다른 브랜치의 특정 커밋만 현재 브랜치에 적용할 때 사용합니다. 핫픽스를 여러 브랜치에 적용하거나, 특정 기능만 선택적으로 가져올 때 유용합니다.' },
  { q: 'git reset의 --soft, --mixed, --hard 차이는 무엇인가요?', a: '--soft는 커밋만 취소하고 변경사항을 스테이징 상태로 유지합니다. --mixed(기본값)는 커밋과 스테이징을 취소하지만 파일 변경은 유지합니다. --hard는 모든 변경사항을 완전히 삭제합니다.' },
  { q: 'git fetch와 git pull의 차이는 무엇인가요?', a: 'git fetch는 원격 저장소의 변경사항을 로컬에 다운로드만 하고 현재 브랜치에 반영하지 않습니다. git pull은 fetch + merge로, 변경사항을 다운로드하고 자동으로 현재 브랜치에 머지합니다.' },
  { q: 'git switch와 git checkout의 차이는 무엇인가요?', a: 'Git 2.23부터 checkout의 기능을 switch(브랜치 전환)와 restore(파일 복원)로 분리했습니다. switch가 더 명확하고 안전한 브랜치 전환 명령어입니다.' },
];

export default function GitCheatsheetPage() {
  return (
    <ToolLayout toolId="git-cheatsheet" faq={faq}>
      <GitCheatsheetClient />
    </ToolLayout>
  );
}
