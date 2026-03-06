import type { Locale } from '@/i18n/config';

export interface Tool {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  href: string;
  icon: string;
  category: 'formatter' | 'encoder' | 'generator' | 'converter' | 'cheatsheet';
  keywords: string[];
}

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: { ko: 'JSON 포매터', en: 'JSON Formatter', ja: 'JSONフォーマッター', zh: 'JSON格式化' },
    description: {
      ko: 'JSON 데이터를 보기 좋게 정리하고 유효성을 검증합니다.',
      en: 'Format and validate JSON data for easy reading.',
      ja: 'JSONデータを整形し、有効性を検証します。',
      zh: '格式化JSON数据并验证其有效性。',
    },
    href: '/json-formatter',
    icon: '{ }',
    category: 'formatter',
    keywords: ['json', '포매터', 'formatter', '정리', '검증', 'validator', '뷰어'],
  },
  {
    id: 'base64',
    name: { ko: 'Base64 인코더/디코더', en: 'Base64 Encoder/Decoder', ja: 'Base64エンコーダー/デコーダー', zh: 'Base64编码/解码' },
    description: {
      ko: 'Base64 문자열을 인코딩하거나 디코딩합니다.',
      en: 'Encode or decode Base64 strings.',
      ja: 'Base64文字列をエンコード・デコードします。',
      zh: '编码或解码Base64字符串。',
    },
    href: '/base64',
    icon: 'B64',
    category: 'encoder',
    keywords: ['base64', '인코딩', '디코딩', 'encode', 'decode'],
  },
  {
    id: 'url-encoder',
    name: { ko: 'URL 인코더/디코더', en: 'URL Encoder/Decoder', ja: 'URLエンコーダー/デコーダー', zh: 'URL编码/解码' },
    description: {
      ko: 'URL 문자열을 인코딩하거나 디코딩합니다.',
      en: 'Encode or decode URL strings.',
      ja: 'URL文字列をエンコード・デコードします。',
      zh: '编码或解码URL字符串。',
    },
    href: '/url-encoder',
    icon: '%20',
    category: 'encoder',
    keywords: ['url', '인코딩', '디코딩', 'encode', 'decode', 'percent'],
  },
  {
    id: 'regex-tester',
    name: { ko: '정규식 테스터', en: 'Regex Tester', ja: '正規表現テスター', zh: '正则表达式测试' },
    description: {
      ko: '정규표현식을 실시간으로 테스트하고 매칭 결과를 확인합니다.',
      en: 'Test regular expressions in real-time and view matches.',
      ja: '正規表現をリアルタイムでテストし、マッチング結果を確認します。',
      zh: '实时测试正则表达式并查看匹配结果。',
    },
    href: '/regex-tester',
    icon: '.*',
    category: 'formatter',
    keywords: ['정규식', 'regex', '정규표현식', 'regular expression', '테스트'],
  },
  {
    id: 'jwt-decoder',
    name: { ko: 'JWT 디코더', en: 'JWT Decoder', ja: 'JWTデコーダー', zh: 'JWT解码' },
    description: {
      ko: 'JWT 토큰의 Header, Payload를 디코딩하여 확인합니다.',
      en: 'Decode JWT token header and payload.',
      ja: 'JWTトークンのHeader、Payloadをデコードして確認します。',
      zh: '解码JWT令牌的Header和Payload。',
    },
    href: '/jwt-decoder',
    icon: 'JWT',
    category: 'encoder',
    keywords: ['jwt', '토큰', 'token', 'decoder', '디코더', 'json web token'],
  },
  {
    id: 'timestamp',
    name: { ko: 'Unix 타임스탬프 변환기', en: 'Unix Timestamp Converter', ja: 'Unixタイムスタンプ変換', zh: 'Unix时间戳转换' },
    description: {
      ko: 'Unix 타임스탬프와 사람이 읽을 수 있는 날짜를 상호 변환합니다.',
      en: 'Convert between Unix timestamps and human-readable dates.',
      ja: 'Unixタイムスタンプと人間が読める日付を相互変換します。',
      zh: '在Unix时间戳和可读日期之间互相转换。',
    },
    href: '/timestamp',
    icon: '⏱',
    category: 'converter',
    keywords: ['unix', '타임스탬프', 'timestamp', '시간', '변환', 'epoch'],
  },
  {
    id: 'id-generator',
    name: { ko: 'UUID/ULID 생성기', en: 'UUID/ULID Generator', ja: 'UUID/ULIDジェネレーター', zh: 'UUID/ULID生成器' },
    description: {
      ko: 'UUID v4, ULID, NanoID를 생성합니다. 벌크 생성도 지원합니다.',
      en: 'Generate UUID v4, ULID, and NanoID. Supports bulk generation.',
      ja: 'UUID v4、ULID、NanoIDを生成します。一括生成にも対応。',
      zh: '生成UUID v4、ULID、NanoID，支持批量生成。',
    },
    href: '/id-generator',
    icon: '#id',
    category: 'generator',
    keywords: ['uuid', 'ulid', 'nanoid', '생성기', 'generator', '고유 식별자', 'id'],
  },
  {
    id: 'hash-generator',
    name: { ko: '해시 생성기', en: 'Hash Generator', ja: 'ハッシュジェネレーター', zh: '哈希生成器' },
    description: {
      ko: 'MD5, SHA-1, SHA-256 등 다양한 해시를 생성합니다.',
      en: 'Generate MD5, SHA-1, SHA-256 and other hashes.',
      ja: 'MD5、SHA-1、SHA-256などのハッシュを生成します。',
      zh: '生成MD5、SHA-1、SHA-256等多种哈希。',
    },
    href: '/hash-generator',
    icon: '#!',
    category: 'generator',
    keywords: ['hash', '해시', 'md5', 'sha256', 'sha1', '체크섬', 'checksum'],
  },
  {
    id: 'diff-checker',
    name: { ko: 'Diff 비교기', en: 'Diff Checker', ja: 'Diff比較', zh: 'Diff比较' },
    description: {
      ko: '두 텍스트의 차이점을 비교하여 시각적으로 보여줍니다.',
      en: 'Compare two texts and visually highlight differences.',
      ja: '2つのテキストの差分を比較して視覚的に表示します。',
      zh: '比较两段文本的差异并可视化显示。',
    },
    href: '/diff-checker',
    icon: '±',
    category: 'formatter',
    keywords: ['diff', '비교', '차이', 'compare', '텍스트 비교'],
  },
  {
    id: 'color-converter',
    name: { ko: 'Color 변환기', en: 'Color Converter', ja: 'カラーコンバーター', zh: '颜色转换' },
    description: {
      ko: 'HEX, RGB, HSL 색상 값을 상호 변환합니다.',
      en: 'Convert between HEX, RGB, and HSL color values.',
      ja: 'HEX、RGB、HSLカラー値を相互変換します。',
      zh: '在HEX、RGB、HSL颜色值之间互相转换。',
    },
    href: '/color-converter',
    icon: '🎨',
    category: 'converter',
    keywords: ['color', '색상', 'hex', 'rgb', 'hsl', '변환', '컬러'],
  },
  {
    id: 'markdown-preview',
    name: { ko: 'Markdown 미리보기', en: 'Markdown Preview', ja: 'Markdownプレビュー', zh: 'Markdown预览' },
    description: {
      ko: 'Markdown 문법을 실시간으로 미리보기합니다.',
      en: 'Preview Markdown syntax in real-time.',
      ja: 'Markdown構文をリアルタイムでプレビューします。',
      zh: '实时预览Markdown语法。',
    },
    href: '/markdown-preview',
    icon: 'M↓',
    category: 'formatter',
    keywords: ['markdown', '마크다운', '미리보기', 'preview', 'md', 'README'],
  },
  {
    id: 'qr-generator',
    name: { ko: 'QR코드 생성기', en: 'QR Code Generator', ja: 'QRコードジェネレーター', zh: 'QR码生成器' },
    description: {
      ko: '텍스트나 URL로 QR코드를 즉시 생성합니다.',
      en: 'Instantly generate QR codes from text or URLs.',
      ja: 'テキストやURLからQRコードを即座に生成します。',
      zh: '从文本或URL即时生成QR码。',
    },
    href: '/qr-generator',
    icon: 'QR',
    category: 'generator',
    keywords: ['qr', 'qr코드', '큐알', '생성기', 'qrcode', 'barcode'],
  },
  {
    id: 'sql-formatter',
    name: { ko: 'SQL 포매터', en: 'SQL Formatter', ja: 'SQLフォーマッター', zh: 'SQL格式化' },
    description: {
      ko: 'SQL 쿼리를 보기 좋게 정리합니다.',
      en: 'Format SQL queries for easy reading.',
      ja: 'SQLクエリを見やすく整形します。',
      zh: '格式化SQL查询使其更易阅读。',
    },
    href: '/sql-formatter',
    icon: 'SQL',
    category: 'formatter',
    keywords: ['sql', '포매터', 'formatter', '쿼리', 'query', '정리'],
  },
  {
    id: 'git-cheatsheet',
    name: { ko: 'Git 명령어 모음', en: 'Git Cheatsheet', ja: 'Gitチートシート', zh: 'Git命令速查' },
    description: {
      ko: 'Git 명령어를 카테고리별로 정리한 치트시트입니다.',
      en: 'Git commands organized by category.',
      ja: 'Gitコマンドをカテゴリ別に整理したチートシートです。',
      zh: '按类别整理的Git命令速查表。',
    },
    href: '/git-cheatsheet',
    icon: 'Git',
    category: 'cheatsheet',
    keywords: ['git', '명령어', 'git rebase', 'git merge', 'git branch', 'commit', '깃'],
  },
  {
    id: 'docker-cheatsheet',
    name: { ko: 'Docker 명령어 모음', en: 'Docker Cheatsheet', ja: 'Dockerチートシート', zh: 'Docker命令速查' },
    description: {
      ko: 'Docker 및 Docker Compose 명령어를 정리한 치트시트입니다.',
      en: 'Docker and Docker Compose commands reference.',
      ja: 'DockerおよびDocker Composeコマンドのチートシートです。',
      zh: 'Docker和Docker Compose命令参考。',
    },
    href: '/docker-cheatsheet',
    icon: '🐳',
    category: 'cheatsheet',
    keywords: ['docker', '도커', 'docker compose', '컨테이너', 'container', '명령어'],
  },
  {
    id: 'http-status',
    name: { ko: 'HTTP 상태코드 정리', en: 'HTTP Status Codes', ja: 'HTTPステータスコード', zh: 'HTTP状态码' },
    description: {
      ko: 'HTTP 상태코드를 카테고리별로 정리하고 설명합니다.',
      en: 'HTTP status codes organized by category with descriptions.',
      ja: 'HTTPステータスコードをカテゴリ別に整理・説明します。',
      zh: '按类别整理HTTP状态码并附说明。',
    },
    href: '/http-status',
    icon: '200',
    category: 'cheatsheet',
    keywords: ['http', '상태코드', 'status code', '404', '500', '200', '301'],
  },
  {
    id: 'cron-cheatsheet',
    name: { ko: 'Cron 표현식 가이드', en: 'Cron Expression Guide', ja: 'Cron式ガイド', zh: 'Cron表达式指南' },
    description: {
      ko: 'Cron 표현식 문법과 주요 예제를 정리한 가이드입니다.',
      en: 'Guide to cron expression syntax with examples.',
      ja: 'Cron式の文法と主要な例を整理したガイドです。',
      zh: 'Cron表达式语法和常用示例指南。',
    },
    href: '/cron-cheatsheet',
    icon: '⏰',
    category: 'cheatsheet',
    keywords: ['cron', '크론탭', 'crontab', '스케줄', 'schedule', '매일 실행', '표현식'],
  },
  {
    id: 'linux-cheatsheet',
    name: { ko: 'Linux 명령어 모음', en: 'Linux Cheatsheet', ja: 'Linuxチートシート', zh: 'Linux命令速查' },
    description: {
      ko: 'Linux 필수 명령어를 카테고리별로 정리한 치트시트입니다.',
      en: 'Essential Linux commands organized by category.',
      ja: 'Linux必須コマンドをカテゴリ別に整理したチートシートです。',
      zh: '按类别整理的Linux必备命令速查表。',
    },
    href: '/linux-cheatsheet',
    icon: '🐧',
    category: 'cheatsheet',
    keywords: ['linux', '리눅스', '명령어', 'chmod', 'grep', 'find', 'bash', '터미널'],
  },
  {
    id: 'regex-cheatsheet',
    name: { ko: '정규식 문법 정리', en: 'Regex Cheatsheet', ja: '正規表現チートシート', zh: '正则表达式速查' },
    description: {
      ko: '정규표현식 문법과 주요 패턴을 정리한 치트시트입니다.',
      en: 'Regex syntax and common patterns reference.',
      ja: '正規表現の文法と主要パターンを整理したチートシートです。',
      zh: '正则表达式语法和常用模式参考。',
    },
    href: '/regex-cheatsheet',
    icon: '/.*/',
    category: 'cheatsheet',
    keywords: ['정규식', 'regex', '정규표현식', '패턴', '이메일', '숫자만', 'regexp'],
  },
  {
    id: 'json-yaml',
    name: { ko: 'JSON ↔ YAML 변환기', en: 'JSON YAML Converter', ja: 'JSON ↔ YAML変換', zh: 'JSON ↔ YAML转换' },
    description: {
      ko: 'JSON과 YAML 형식을 양방향으로 변환합니다.',
      en: 'Convert between JSON and YAML formats.',
      ja: 'JSONとYAML形式を双方向に変換します。',
      zh: '在JSON和YAML格式之间双向转换。',
    },
    href: '/json-yaml',
    icon: 'Y{}',
    category: 'converter',
    keywords: ['json', 'yaml', 'yml', '변환', 'converter', '설정 파일', 'config'],
  },
  {
    id: 'text-case',
    name: { ko: 'Text Case 변환기', en: 'Text Case Converter', ja: 'テキストケース変換', zh: '文本大小写转换' },
    description: {
      ko: '텍스트를 camelCase, snake_case, kebab-case 등 다양한 케이스로 변환합니다.',
      en: 'Convert text between camelCase, snake_case, kebab-case and more.',
      ja: 'テキストをcamelCase、snake_case、kebab-caseなど様々なケースに変換します。',
      zh: '将文本转换为camelCase、snake_case、kebab-case等多种格式。',
    },
    href: '/text-case',
    icon: 'Aa',
    category: 'converter',
    keywords: ['camelCase', 'snake_case', 'kebab-case', 'PascalCase', '케이스 변환', 'text case'],
  },
  {
    id: 'lorem-ipsum',
    name: { ko: 'Lorem Ipsum 생성기', en: 'Lorem Ipsum Generator', ja: 'Lorem Ipsumジェネレーター', zh: 'Lorem Ipsum生成器' },
    description: {
      ko: '더미 텍스트(Lorem Ipsum)를 문단, 문장, 단어 단위로 생성합니다.',
      en: 'Generate placeholder text by paragraphs, sentences, or words.',
      ja: 'ダミーテキスト(Lorem Ipsum)を段落・文・単語単位で生成します。',
      zh: '按段落、句子或单词生成Lorem Ipsum占位文本。',
    },
    href: '/lorem-ipsum',
    icon: 'Li',
    category: 'generator',
    keywords: ['lorem ipsum', '더미 텍스트', 'placeholder', '텍스트 생성', 'dummy text'],
  },
  {
    id: 'password-generator',
    name: { ko: '비밀번호 생성기', en: 'Password Generator', ja: 'パスワードジェネレーター', zh: '密码生成器' },
    description: {
      ko: '안전한 랜덤 비밀번호를 즉시 생성합니다. 길이, 문자 종류 조절, 강도 표시.',
      en: 'Generate secure random passwords with custom length and character options.',
      ja: '安全なランダムパスワードを即座に生成します。長さ・文字種類の調整・強度表示。',
      zh: '即时生成安全随机密码，可调整长度和字符类型。',
    },
    href: '/password-generator',
    icon: '🔐',
    category: 'generator',
    keywords: ['비밀번호', '패스워드', 'password', '랜덤', '생성기', 'generator', '보안'],
  },
  {
    id: 'cron-builder',
    name: { ko: 'Cron 표현식 빌더', en: 'Cron Expression Builder', ja: 'Cron式ビルダー', zh: 'Cron表达式构建器' },
    description: {
      ko: 'GUI로 Cron 표현식을 생성하고 다음 실행 시간을 확인합니다.',
      en: 'Build cron expressions with GUI and preview next run times.',
      ja: 'GUIでCron式を作成し、次の実行時間を確認します。',
      zh: '通过GUI构建Cron表达式并查看下次执行时间。',
    },
    href: '/cron-builder',
    icon: '⏲',
    category: 'generator',
    keywords: ['cron', '크론', '스케줄', 'schedule', '크론탭', 'crontab', '빌더'],
  },
];

export const categories = {
  formatter: { name: '포매터 & 검증', color: 'brand' },
  encoder: { name: '인코딩 & 디코딩', color: 'emerald' },
  generator: { name: '생성기', color: 'violet' },
  converter: { name: '변환기', color: 'amber' },
  cheatsheet: { name: '치트시트', color: 'rose' },
};

export function getToolName(tool: Tool, locale: Locale): string {
  return tool.name[locale];
}

export function getToolDescription(tool: Tool, locale: Locale): string {
  return tool.description[locale];
}
