'use client';

import { useState, useCallback } from 'react';

interface StatusCode {
  code: number;
  name: string;
  desc: string;
}

interface Section {
  title: string;
  color: string;
  codes: StatusCode[];
}

const SECTIONS: Section[] = [
  {
    title: '1xx — 정보 (Informational)',
    color: 'text-gray-500',
    codes: [
      { code: 100, name: 'Continue', desc: '요청의 첫 부분이 수신되었으며 나머지를 계속 보내도 됩니다.' },
      { code: 101, name: 'Switching Protocols', desc: '서버가 프로토콜 전환 요청을 수락했습니다. (예: HTTP → WebSocket)' },
      { code: 102, name: 'Processing', desc: '서버가 요청을 수신하여 처리 중이지만 아직 응답이 없습니다. (WebDAV)' },
      { code: 103, name: 'Early Hints', desc: '최종 응답 전에 Link 헤더 등 일부 응답 헤더를 미리 보냅니다.' },
    ],
  },
  {
    title: '2xx — 성공 (Success)',
    color: 'text-green-500',
    codes: [
      { code: 200, name: 'OK', desc: '요청이 성공적으로 처리되었습니다. GET/PUT/PATCH 응답에 주로 사용.' },
      { code: 201, name: 'Created', desc: '요청이 성공하여 새 리소스가 생성되었습니다. POST 응답에 주로 사용.' },
      { code: 202, name: 'Accepted', desc: '요청이 수락되었지만 아직 처리되지 않았습니다. 비동기 처리에 사용.' },
      { code: 204, name: 'No Content', desc: '요청이 성공했지만 응답 본문이 없습니다. DELETE 응답에 주로 사용.' },
      { code: 206, name: 'Partial Content', desc: 'Range 헤더에 의해 부분적 콘텐츠가 반환되었습니다. 파일 다운로드 재개 등.' },
      { code: 207, name: 'Multi-Status', desc: '여러 리소스에 대한 상태를 XML로 반환합니다. (WebDAV)' },
    ],
  },
  {
    title: '3xx — 리다이렉션 (Redirection)',
    color: 'text-blue-500',
    codes: [
      { code: 300, name: 'Multiple Choices', desc: '요청에 대해 여러 응답이 가능합니다. 클라이언트가 선택해야 합니다.' },
      { code: 301, name: 'Moved Permanently', desc: '리소스가 영구적으로 이동했습니다. 검색 엔진이 새 URL을 인덱싱합니다.' },
      { code: 302, name: 'Found', desc: '리소스가 임시로 다른 URL에 있습니다. 원래 URL을 계속 사용합니다.' },
      { code: 303, name: 'See Other', desc: '다른 URL에서 GET으로 리소스를 가져와야 합니다. POST 후 리다이렉트에 사용.' },
      { code: 304, name: 'Not Modified', desc: '리소스가 변경되지 않았습니다. 캐시된 버전을 사용하세요.' },
      { code: 307, name: 'Temporary Redirect', desc: '임시 리다이렉트. 원래 요청 메서드(POST 등)를 유지합니다.' },
      { code: 308, name: 'Permanent Redirect', desc: '영구 리다이렉트. 원래 요청 메서드를 유지합니다. (301의 메서드 보존 버전)' },
    ],
  },
  {
    title: '4xx — 클라이언트 오류 (Client Error)',
    color: 'text-amber-500',
    codes: [
      { code: 400, name: 'Bad Request', desc: '잘못된 요청 구문, 유효하지 않은 파라미터, 잘못된 JSON 형식 등.' },
      { code: 401, name: 'Unauthorized', desc: '인증이 필요합니다. 토큰이 없거나 만료된 경우. (WWW-Authenticate 헤더 포함)' },
      { code: 403, name: 'Forbidden', desc: '인증은 되었지만 해당 리소스에 대한 접근 권한이 없습니다.' },
      { code: 404, name: 'Not Found', desc: '요청한 리소스를 찾을 수 없습니다. 잘못된 URL이거나 삭제된 리소스.' },
      { code: 405, name: 'Method Not Allowed', desc: '요청한 HTTP 메서드(GET, POST 등)가 해당 엔드포인트에서 허용되지 않습니다.' },
      { code: 406, name: 'Not Acceptable', desc: '요청의 Accept 헤더에 맞는 콘텐츠 타입을 생성할 수 없습니다.' },
      { code: 407, name: 'Proxy Authentication Required', desc: '프록시 서버의 인증이 필요합니다.' },
      { code: 408, name: 'Request Timeout', desc: '서버가 요청을 기다리다 타임아웃되었습니다. 클라이언트가 너무 느린 경우.' },
      { code: 409, name: 'Conflict', desc: '요청이 현재 리소스 상태와 충돌합니다. 동시 수정, 중복 생성 등.' },
      { code: 410, name: 'Gone', desc: '리소스가 영구적으로 삭제되어 더 이상 이용할 수 없습니다. 404와 달리 의도적 삭제.' },
      { code: 411, name: 'Length Required', desc: 'Content-Length 헤더가 필요합니다.' },
      { code: 412, name: 'Precondition Failed', desc: '요청 헤더의 전제 조건(If-Match 등)이 충족되지 않았습니다.' },
      { code: 413, name: 'Payload Too Large', desc: '요청 본문이 서버의 허용 크기를 초과했습니다.' },
      { code: 414, name: 'URI Too Long', desc: '요청 URI가 서버가 처리할 수 있는 길이를 초과했습니다.' },
      { code: 415, name: 'Unsupported Media Type', desc: '지원하지 않는 Content-Type입니다. (예: XML만 지원하는데 JSON 전송)' },
      { code: 422, name: 'Unprocessable Entity', desc: '요청 구문은 올바르지만 의미적으로 처리할 수 없습니다. 유효성 검증 실패.' },
      { code: 429, name: 'Too Many Requests', desc: '너무 많은 요청을 보냈습니다. Rate limiting 적용. Retry-After 헤더 확인.' },
      { code: 451, name: 'Unavailable For Legal Reasons', desc: '법적 사유로 접근이 차단된 리소스입니다.' },
    ],
  },
  {
    title: '5xx — 서버 오류 (Server Error)',
    color: 'text-red-500',
    codes: [
      { code: 500, name: 'Internal Server Error', desc: '서버 내부에서 예상치 못한 오류가 발생했습니다. 가장 일반적인 서버 오류.' },
      { code: 501, name: 'Not Implemented', desc: '서버가 요청된 HTTP 메서드나 기능을 아직 구현하지 않았습니다.' },
      { code: 502, name: 'Bad Gateway', desc: '게이트웨이/프록시(Nginx 등)가 상위 서버에서 잘못된 응답을 받았습니다.' },
      { code: 503, name: 'Service Unavailable', desc: '서버가 일시적으로 요청을 처리할 수 없습니다. 과부하, 유지보수, 배포 중.' },
      { code: 504, name: 'Gateway Timeout', desc: '게이트웨이/프록시가 상위 서버 응답을 기다리다 타임아웃되었습니다.' },
      { code: 505, name: 'HTTP Version Not Supported', desc: '서버가 요청에 사용된 HTTP 버전을 지원하지 않습니다.' },
    ],
  },
];

const CATEGORY_NAMES = SECTIONS.map((s) => s.title);

export default function HttpStatusClient() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState<number | null>(null);

  const handleCopy = useCallback(async (code: number, name: string) => {
    await navigator.clipboard.writeText(`${code} ${name}`);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 1500);
  }, []);

  const filtered = SECTIONS
    .filter((section) => !activeCategory || section.title === activeCategory)
    .map((section) => ({
      ...section,
      codes: section.codes.filter(
        (c) =>
          c.code.toString().includes(search) ||
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.desc.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((section) => section.codes.length > 0);

  const totalCount = filtered.reduce((sum, s) => sum + s.codes.length, 0);

  return (
    <div className="space-y-6">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="상태코드 검색... (예: 404, timeout, redirect, unauthorized)"
        className="input-area px-4 py-3"
      />

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
            {name.split(' — ')[0]}
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--color-text-secondary)]">
        {totalCount}개 상태코드 {search && `(검색: "${search}")`}
      </p>

      <div className="space-y-6">
        {filtered.map((section) => (
          <div key={section.title}>
            <h2 className={`text-lg font-semibold mb-3 ${section.color}`}>{section.title}</h2>
            <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-surface)]">
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-20">코드</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)] w-52">이름</th>
                    <th className="text-left px-4 py-2.5 font-medium text-[var(--color-text-secondary)]">설명</th>
                  </tr>
                </thead>
                <tbody>
                  {section.codes.map((item) => (
                    <tr key={item.code} className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors group">
                      <td className="px-4 py-2.5">
                        <code className="font-mono text-sm font-bold text-brand-500">{item.code}</code>
                      </td>
                      <td className="px-4 py-2.5 font-medium">
                        <div className="flex items-center gap-2">
                          {item.name}
                          <button
                            onClick={() => handleCopy(item.code, item.name)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[var(--color-text-secondary)] hover:text-brand-500 shrink-0"
                            title="복사"
                          >
                            {copiedCode === item.code ? '✓' : '복사'}
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2.5 text-[var(--color-text-secondary)]">{item.desc}</td>
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
