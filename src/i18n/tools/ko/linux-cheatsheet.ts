export default {
  metadata: {
    title: 'Linux 명령어 모음 치트시트',
    description:
      '자주 쓰는 Linux 명령어 치트시트 — 파일, 검색, 권한(chmod), 프로세스, 네트워크, 압축, 파이프 등 카테고리별 리눅스 명령어 정리. 복사 버튼으로 바로 사용하세요.',
    keywords: [
      'Linux 명령어', 'Linux cheatsheet', '리눅스 명령어', 'chmod', 'grep', 'find',
      '리눅스 치트시트', 'bash 명령어', 'tar', 'ssh', 'curl', 'awk', 'sed',
      'chmod 사용법', '리눅스 권한', '리눅스 파일 검색', 'ls', 'ps', 'kill',
    ],
  },
  faq: [
    { q: 'chmod 777은 무슨 뜻인가요?', a: 'chmod의 각 숫자는 소유자/그룹/기타 사용자의 권한을 나타냅니다. 7은 읽기(4)+쓰기(2)+실행(1)=7로 모든 권한입니다. 777은 모든 사용자에게 모든 권한을 부여하므로 보안상 위험합니다. 일반 파일은 644, 실행 파일은 755를 권장합니다.' },
    { q: 'grep과 find의 차이는 무엇인가요?', a: "find는 파일 이름, 크기, 수정일 등 파일 속성으로 파일을 검색합니다. grep은 파일 내용에서 특정 문자열 패턴을 검색합니다. \"find . -name '*.log' | xargs grep 'error'\"처럼 함께 사용하면 강력한 검색이 가능합니다." },
    { q: 'sudo와 su의 차이는 무엇인가요?', a: 'sudo는 특정 명령어를 관리자 권한으로 일회성 실행합니다. su는 다른 사용자(기본: root)로 완전히 전환합니다. sudo는 자신의 비밀번호를, su는 대상 사용자의 비밀번호를 입력합니다. 보안상 sudo 사용을 권장합니다.' },
    { q: 'tar 명령어의 옵션 -czf, -xzf는 무슨 뜻인가요?', a: 'c=create(생성), x=extract(해제), z=gzip(압축), f=file(파일 지정)입니다. tar -czf는 gzip 압축 파일 생성, tar -xzf는 gzip 압축 파일 해제입니다. -t는 내용 미리보기, -v는 상세 출력입니다.' },
    { q: 'tail -f와 less의 차이는 무엇인가요?', a: 'tail -f는 파일 끝부분을 실시간으로 모니터링합니다. 로그 파일에 새 내용이 추가되면 자동으로 표시됩니다. less는 파일 전체를 페이지 단위로 탐색하며, 위아래 스크롤과 검색(/)이 가능합니다.' },
    { q: 'pipe(|)와 리다이렉션(>)의 차이는 무엇인가요?', a: 'pipe(|)는 왼쪽 명령어의 출력을 오른쪽 명령어의 입력으로 연결합니다. 리다이렉션(>)은 명령어의 출력을 파일로 저장합니다. >>는 파일에 추가(append), 2>는 에러 출력만 저장합니다.' },
    { q: 'awk와 sed는 어떤 차이가 있나요?', a: 'sed는 스트림 편집기로 텍스트 치환(s/old/new/g)에 주로 사용합니다. awk는 패턴 처리 언어로 필드 단위 데이터 처리에 강합니다. 간단한 치환은 sed, 컬럼 기반 데이터 가공은 awk를 사용합니다.' },
  ],
  ui: {
    searchPlaceholder: '명령어 검색... (예: chmod, grep, tar, ssh, find)',
    searchClear: '검색 초기화',
    all: '전체',
    commandCount: '개 명령어',
    searchLabel: '검색:',
    tableCommand: '명령어',
    tableDescription: '설명',
    copy: '복사',
    copyDone: '✓',
    noResults: '검색 결과가 없습니다.',
    showAll: '전체 보기',
  },
};
