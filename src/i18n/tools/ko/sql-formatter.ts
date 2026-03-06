export default {
  metadata: {
    title: 'SQL 포매터',
    description:
      '온라인 SQL 포매터 — SQL 쿼리를 보기 좋게 정리하고 키워드를 대문자로 변환합니다. 복잡한 쿼리를 깔끔하게 포맷팅하세요.',
    keywords: ['SQL 포매터', 'SQL formatter', 'SQL 정리', '쿼리 포매터', 'SQL beautifier'],
  },
  faq: [
    {
      q: 'SQL 포매터는 어떤 작업을 하나요?',
      a: 'SQL 키워드(SELECT, FROM, WHERE 등)를 대문자로 변환하고, 주요 절(clause) 앞에 줄바꿈과 들여쓰기를 추가하여 쿼리를 읽기 쉽게 정리합니다.',
    },
    {
      q: '어떤 SQL 문법을 지원하나요?',
      a: 'SELECT, INSERT, UPDATE, DELETE, CREATE TABLE 등 표준 SQL 문법을 지원합니다. MySQL, PostgreSQL, SQLite 등 대부분의 데이터베이스에서 사용하는 공통 문법을 포맷팅합니다.',
    },
    {
      q: '문자열 리터럴 안의 내용도 변환되나요?',
      a: '아니요. 작은따옴표로 감싸진 문자열 리터럴은 보호되어 내부 내용이 변경되지 않습니다.',
    },
  ],
  ui: {
    format: '포맷팅',
    sampleSql: '예시 SQL',
    sqlInput: 'SQL 입력',
    sqlInputPlaceholder: 'SQL 쿼리를 입력하세요...',
    formattedResult: '포맷팅 결과',
    outputPlaceholder: '포맷팅 결과가 여기에 표시됩니다.',
    copy: '복사하기',
    copied: '✓ 복사됨',
  },
};
