export default {
  metadata: {
    title: '비밀번호 생성기',
    description:
      '온라인 비밀번호 생성기 — 안전한 랜덤 비밀번호를 즉시 생성합니다. 길이, 대소문자, 숫자, 특수문자 조합 설정 가능. 서버 전송 없이 브라우저에서 바로 처리.',
    keywords: ['비밀번호 생성기', '패스워드 생성기', 'password generator', '랜덤 비밀번호', '강력한 비밀번호', '보안'],
  },
  faq: [
    {
      q: '생성된 비밀번호가 서버로 전송되나요?',
      a: '아니요. 모든 비밀번호는 브라우저의 crypto.getRandomValues()를 사용하여 클라이언트에서 생성됩니다. 서버로 전송되지 않으며, 어디에도 저장되지 않습니다.',
    },
    {
      q: '안전한 비밀번호의 길이는 얼마인가요?',
      a: '최소 12자 이상을 권장하며, 16자 이상이면 더욱 안전합니다. 대문자, 소문자, 숫자, 특수문자를 모두 포함하면 강도가 높아집니다.',
    },
    {
      q: '비밀번호 강도는 어떻게 계산하나요?',
      a: '사용 가능한 문자 집합의 크기와 비밀번호 길이를 기반으로 엔트로피(무작위성)를 계산합니다. 엔트로피가 높을수록 무차별 대입 공격에 강합니다.',
    },
    {
      q: '같은 비밀번호가 다시 생성될 수 있나요?',
      a: '이론적으로 가능하지만 확률은 극히 낮습니다. 예를 들어 16자 길이에 모든 문자 종류를 사용하면 약 88^16 (약 10^31)가지 조합이 가능합니다.',
    },
  ],
  ui: {
    passwordLength: '비밀번호 길이',
    uppercase: '대문자',
    lowercase: '소문자',
    numbers: '숫자',
    symbols: '특수문자',
    count: '개수',
    countRange: '1~50',
    generate: '생성하기',
    passwordStrength: '비밀번호 강도',
    strengthVeryWeak: '매우 약함',
    strengthWeak: '약함',
    strengthFair: '보통',
    strengthStrong: '강함',
    strengthVeryStrong: '매우 강함',
    result: '생성 결과',
    resultCount: '개',
    copyAll: '전체 복사',
    copied: '✓ 복사됨',
    copy: '복사',
    clickToCopy: '클릭하여 복사',
  },
};
