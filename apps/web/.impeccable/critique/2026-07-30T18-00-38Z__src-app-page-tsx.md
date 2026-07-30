---
target: 랜딩 페이지 (src/app/page.tsx)
total_score: 21
p0_count: 2
p1_count: 2
timestamp: 2026-07-30T18-00-38Z
slug: src-app-page-tsx
---
# Critique — 다시,다 랜딩 (src/app/page.tsx)

Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | 캐러셀 자동회전 상태 표시 없음; 차트 지연로드 자리가 260px 빈 박스(스켈레톤 없음) |
| 2 | Match System / Real World | 2 | 한국어 페이지에 영문 눈썹·태그(FASHION/RAIL); 죄책감형 히어로 질문이 브랜드 톤 이탈 |
| 3 | User Control and Freedom | 2 | 캐러셀 터치/키보드 정지 수단 없음(호버만); 히어로·틸트 패럴랙스가 reduced-motion 무시 |
| 4 | Consistency and Standards | 1 | 5개 섹션 중 2개가 토큰 규칙 위반(하드코딩 hex); 다크 기본 테마에서 흰 섹션 플래시뱅; CTA 라운딩 불일치 |
| 5 | Error Prevention | 2 | cursor-pointer + "→" 어포던스의 비인터랙티브 카드 — 죽은 클릭 유도 |
| 6 | Recognition Rather Than Recall | 3 | 내비·CTA 레이블은 명확; 인터랙션은 설명문을 읽어야 발견됨 |
| 7 | Flexibility and Efficiency | 3 | 스킵 링크·테마 토글·헤더 숏컷 실재 |
| 8 | Aesthetic and Minimalist Design | 1 | 히어로 부유 오브젝트 5개, 9카드 회전 링, 조작 안내문 — "덜어내서 완성한다" 자기모순 |
| 9 | Error Recovery | 3 | 폼 없음(해당 적음); 전역 OfflineBanner 존재 |
| 10 | Help and Documentation | 2 | 유일한 도움말이 제품이 아니라 기믹 조작법 설명 |
| **Total** | | **21/40** | **Acceptable — 상당한 개선 필요** |

## Anti-Patterns Verdict

**실패 — "AI/템플릿이 만들었다"는 판정을 피하지 못한다.** 모션 엔지니어링 품질은 진짜지만, 페이지 자체가 Dasida 팔레트를 입힌 범용 "3D 랜딩 템플릿"이다.

LLM 평가(A): 영문 uppercase 눈썹이 전 섹션 반복(tilt-card-grid.tsx:89 "Upcycling Stories", landing-stats.tsx:35 "Impact in Numbers", carousel-3d.tsx:63 "In the News", landing-flow.tsx:37 "How it works" + 히어로 "Re · Cycle · Up"·"scroll ↓"); LandingStats는 금지 패턴인 통계 히어로 카드 그 자체이며 수치(12,400+)가 **허구** — PRODUCT.md "실데이터를 앞세운다"와 정면 충돌; 동일 카드 그리드 ×3; 조작 안내 카피 3문장("마우스를 움직여 보세요…")이 CodePen 데모 말투; 히어로 질문("당신은 지구를 위해 어떤 노력을…")은 안티레퍼런스인 관공서 환경 캠페인 구호 톤. 히어로 2행의 그라데이션 텍스트는 DESIGN.md 승인 예외로 통과.

결정적 스캔(B): 총 9건, 전부 `design-system-font-size` advisory — 미문서화 15px ×5(landing-stats 84·106, landing-flow 110·119 등), 캐러셀 내부 10–11px ×3. 13px 2건은 DESIGN.md "Label 12–13px" 범위 표기 미파싱 오탐. 디텍터는 TSX 형태의 눈썹·통계 템플릿을 잡지 못했고(룰 미발화), LLM 리뷰가 그 갭을 메웠다 — 서로 다른 층위를 잡은 상호보완.

브라우저 오버레이: **실패(폴백 신호)** — playwright MCP 로그 기록이 Turbopack 리로드 루프를 유발해 주입 불가. 사용자 브라우저에 오버레이는 표시되지 않는다. A가 확보한 1440w 풀샷 1장으로 다크 기본 테마 렌더는 확인됨(theme-context.tsx `defaultTheme="dark"`).

## Overall Impression

재료는 훌륭한데 요리가 다른 가게 것이다. 팔레트·Black Han Sans·모션 인프라라는 고유 재료를 갖고도, 랜딩은 "제품이 곧 증명"이라는 자기 원칙을 정확히 뒤집어 — 실데이터 대신 허구 KPI, 제품 소개 대신 기믹 시연 — 브랜드 문서가 금지한 패턴들로 조립됐다. 가장 큰 기회: 시드 DB의 실제 캠페인·게시글을 랜딩의 주인공으로 세우는 것.

## What's Working

- **모션 엔지니어링**: 스프링 기반 공용 `useTilt` + reduced-motion 가드, CLS 안전한 recharts 지연 로드(landing-stats.tsx:7-12), 640px 미만 캐러셀 지오메트리 대응 — 진짜 실력.
- **접근성 의도**: 차트·프로그레스의 한국어 `aria-label`(role="img"), 스킵 링크, 시맨틱 `<ol>`, 히어로 배지 대비 보정 주석(hero-3d.tsx:69-71).
- **한국어 디스플레이 보이스**: Black Han Sans 헤드라인은 AI 랜딩 대부분이 갖지 못한 정체성 재료.

## Priority Issues

- **[P0] 랜딩이 제품을 보여주지 않는다** — 모든 섹션이 장식 또는 허구(허구 KPI landing-stats.tsx:14-18, 외부 뉴스+스톡 사진 carousel-3d.tsx:8-18). 믿음 사다리 ②("볼만한 내용이 있구나")가 증명되지 않음. Fix: LandingStats를 실제 캠페인/게시글 카드 3–6개(API 페치)로 교체, 허구 수치 삭제. → `/impeccable shape` 후 재구성
- **[P0] 1차 CTA가 히어로에 없고 푸터에선 틀렸다** — Hero3D에 CTA 전무; 최하단 민트 버튼이 "피드 둘러보기"(landing-flow.tsx:108-114)인데 PRODUCT.md 1차 CTA는 "캠페인 둘러보기". Fix: 히어로에 민트 "캠페인 둘러보기" + 보조 CTA, 푸터 쌍 재정렬. → `/impeccable clarify`
- **[P1] 가짜 어포던스** — 틸트 카드 cursor-pointer+"→"(tilt-card-grid.tsx:49,64-69), 캐러셀 "→"·"◐" 버튼 모양 비링크. Fix: 실제 목적지 링크 연결 또는 어포던스 제거. → `/impeccable polish`
- **[P1] 토큰 규칙 파괴 + 다크 기본 플래시뱅** — tilt-card-grid `#ffffff`·`#1c4044`·`#6a6558`, landing-stats 크림 리터럴; 다크 기본 테마에서 다크 히어로→순백 섹션→다크 밴드 왕복. Fix: 토큰 전환 + 다크 기본값 재검토. → `/impeccable polish`
- **[P2] 레지스터·카피 드리프트 + 모션/대비 a11y** — 영문 눈썹 4곳, 조작 안내문, 관공서 톤 질문, 기억 문장("다시 쓰는 일을 함께 하는 곳") 부재; 히어로·틸트 패럴랙스 reduced-motion 미준수, 캐러셀 캡션 ~2.9:1, 스텝 번호 ~2.2:1, H1 공백 자간("당 신 은")의 스크린리더 훼손. → `/impeccable clarify` + `/impeccable animate`

## Persona Red Flags

- **Jordan(첫 방문자)**: 히어로가 사이트 소개 대신 질문을 던짐; "패션 업사이클" 카드 클릭 → 무반응; 페이지 끝까지 가서야 행동 발견.
- **Riley(스트레스 테스터)**: 다크 기본 + 흰 틸트 섹션 = 테마 채찍질; reduced-motion 설정에도 패럴랙스 동작; 차트 로딩 자리 260px 공백.
- **Casey(모바일)**: 풀뷰포트 히어로에 탭 가능한 것 없음; 터치스크린에 "마우스를 올리면 멈춥니다"; 자동회전이 터치로 안 멈춤; CTA는 페이지 최하단.
- **평가자(60초 스킴)**: 프로젝트 자신의 DESIGN.md가 금지한 통계 카드·하드코딩 hex를 랜딩에서 목격; 포트폴리오 앱의 "12,400+ 사용자"는 부정직하게 읽힘 — "완성도 시연" 주장이 첫 페이지에서 무너짐.

## Minor Observations

- 정지 상태 메가 쉐도우 다수(틸트 `0_20px_50px…`, 캐러셀 `0_30px_60px`, CTA 상시 민트 글로우) — "응답으로서의 그림자" 규칙 위반.
- Black Han Sans가 카드 h3·KPI 숫자까지 침투 — "한 목소리 규칙" 위반.
- 히어로 블러 오브 2개(600/700px, opacity 40%) vs DESIGN.md "500px·20%·페이지당 하나".
- `select-none` H1, 라이트 테마 textShadow, "2026 · UPCYCLE" 필러 메타, 캐러셀 `sizes="260px"` 미세 부족.
- 디텍터 advisory: 미문서화 15px 5곳·10–11px 3곳(캐러셀 내부) — 타입 램프 정리 대상.

## Questions to Consider

1. DB에 실제 캠페인·게시글이 시드돼 있는데, 왜 랜딩만 제품 데이터를 거부하고 12,400명을 지어내는가?
2. 조작 안내문 4문장을 지우면 사용자는 무엇을 잃는가? "인터랙션을 발견 못 한다"가 답이면, 그 인터랙션은 번들 비용을 정당화하는가?
3. 이 랜딩의 주인은 누구인가 — 조용한 온실을 원하는 페르소나인가, translateZ 쇼릴을 원하는 개발자인가?
