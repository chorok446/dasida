---
target: 랜딩 페이지 (src/app/page.tsx)
total_score: 26
p0_count: 0
p1_count: 3
timestamp: 2026-07-31T01-17-10Z
slug: src-app-page-tsx
---
# Critique — 다시,다 랜딩 (src/app/page.tsx)

Method: dual-agent (A: design-review sub-agent · B: detector/browser-evidence sub-agent)

검사 환경: 프로덕션 빌드(3100) + 실제 API(8180)·시드 데이터 SSR. 데스크톱 1440×900·1200×864, 모바일 390×844, 라이트/다크 실측.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | 진행률 바·D-day·내비 도트 좋음; 캐러셀 정지 상태 표시 없음 |
| 2 | Match System / Real World | 3 | 담백한 존댓말·한글 스텝 동사; 틸트 카드→검색 쿼리 착지의 라벨-목적지 불일치 |
| 3 | User Control and Freedom | 2 | 자동 회전 캐러셀을 키보드로 정지 불가(WCAG 2.2.2 소지) |
| 4 | Consistency and Standards | 3 | 토큰 단일 통로 관통; 틸트 카드(다크 면)와 캠페인 카드(화이트 보더)의 카드 언어 이질 |
| 5 | Error Prevention | 3 | API 실패 시 설계된 폴백 카피+CTA로 완주 |
| 6 | Recognition Rather Than Recall | 3 | CTA 반복 배치, 전 내비 텍스트 라벨, 한글 태그 칩 |
| 7 | Flexibility and Efficiency | 2 | 뉴스 카드 9장 전부 비클릭 — 깊이 들어갈 지름길 부재 |
| 8 | Aesthetic and Minimalist Design | 3 | 여백·타이포 절제 수준급; 히어로 장식 겹(원 3+스티커+패럴랙스)은 한두 겹 과잉 |
| 9 | Error Recovery | 3 | 폴백 문장이 다음 행동까지 제시 |
| 10 | Help and Documentation | 2 | 스텝 카드가 죽은 면 — 해당 행동으로 가는 링크 없음 |
| **Total** | | **26/40** | **Acceptable 상단 — 이전 21 대비 +5** |

## Anti-Patterns Verdict

**부분 양성 — 전면 슬롭 판정은 벗어났고, 잔재는 2개 섹션에 국한된다.**

LLM 평가(A): 반복 눈썹 제거·통계 히어로 카드 부재·실데이터 증거 섹션으로 이전 크리틱의 "팔레트 입힌 범용 템플릿" 판정은 해소. 남은 템플릿 문법은 ① tilt-card-grid의 동일 카드 6장(features grid 스캐폴딩), ② landing-flow의 01/02/03 번호+아이콘 타일 3단 스텝. 그라데이션 텍스트는 DESIGN.md 승인 유산 1곳뿐.

결정적 스캔(B): CLI 스캔(7파일) **0건 클린**. 라이브 페이지 디텍터 26건 중 실효 신호는 `gpt-thin-border-wide-shadow` ×9(캐러셀 카드 1px 보더+60px 그림자 — A의 '정지 메가 쉐도우 잔존' 관찰과 수렴), `icon-tile-stack` ×3(A의 스텝 템플릿 판정과 수렴), `clipped-overflow-container` ×1(히어로), `layout-transition`(height) ×1. `low-contrast` ×9는 전부 오탐(디텍터가 이미지+알파 스크림 합성 불가 — 실제는 다크 스크림 위 흰 텍스트). `overused-font: roboto`는 시스템 산세리프 스택의 헤드리스 크로뮴 해석 — DESIGN.md가 의도한 본문 폰트 전략이므로 위반 아님.

**디텍터가 A를 넘어 잡은 것**: React error #418 — 프로덕션 빌드 최초 로드 시 **하이드레이션 불일치 1건**(주입 이전 발생, 환경 요인 아님). 실제 결함으로 추적 필요.

브라우저 오버레이: 주입 성공 — live-server(8400) 경유 detect.js 실행·콘솔 수집 후 정리 완료. (검증 서버는 리포트 전 종료함.)

## Overall Impression

원칙 문서가 화면을 실제로 통치하기 시작한 랜딩. 실데이터 캠페인 섹션이 믿음 사다리를 화면으로 증명하고, 토큰·모션 규율은 상위권이다. 지금 점수를 깎는 것은 컨셉이 아니라 **마감**: 물리적 겹침 3건(캐러셀↔문단, 테마 토글↔풋터 문장, 스티커↔헤드라인)과 한글 중간 줄바꿈, 그리고 하이드레이션 에러 1건이 "완성도 있는 시연"이라는 성공 기준을 갉아먹는다. 가장 큰 기회: 반나절짜리 P1 마감 수리 + Tilt/Flow 템플릿 잔재 정리.

## What's Working

- **실데이터 증거 섹션**: SSR 공개 GET + 2단 폴백 쿼리 + 설계된 빈 상태. 진행률 39/40·D-21 같은 살아 있는 숫자가 설득의 정점.
- **토큰·a11y 규율**: 전 컴포넌트 토큰 단일 통로, useReducedMotion 직접 분기, 민트 CTA 대비 ~9.4:1, 오브 규격(500px·20%·1개) 코드 주석 인용까지.
- **한글 디스플레이 보이스**: 기억 문장("다시 쓰는 일을 / 함께 하는 곳")이 곧 헤드라인. Black Han Sans는 히어로·섹션 헤딩에만.

## Priority Issues

- **[P1] 캐러셀 카드가 마무리 문단을 덮는다** — `carousel-3d.tsx` 컨테이너 460px에 rotateX(-8)+translateZ(420) 투영이 넘쳐 1440×900에서 하단 문단과 물리 겹침(실측). Fix: 컨테이너 높이 ~560px 또는 하단 여백 확보. → /impeccable polish
- **[P1] 테마 토글이 풋터 기억 문장을 가린다** — 우하단 고정 토글이 "© 2026 … 함께 하는 곳"과 충돌(1440·390 실측). 페이지의 마지막 문장이 항상 가려짐. Fix: 풋터 패딩 확보 또는 토글 위치 조정. → /impeccable polish
- **[P1] 디스플레이 헤딩 한글 중간 줄바꿈** — 모바일에서 "캠페\n인", "시작됩니\n다"(실측). Fix: 디스플레이 헤딩 공통 `word-break: keep-all`. → /impeccable polish
- **[P2] 자동 회전 캐러셀 정지 수단 부재** — 호버/드래그뿐, 키보드 정지 불가(WCAG 2.2.2 미충족, AA 선언과 모순). 캐러셀 카드 9장 비클릭(가짜 클릭 문법) + 1px 보더+60px 정지 그림자 ×9(디텍터 수렴). Fix: 접근 가능한 일시정지 버튼 + 카드 링크 or 정적 콜라주 재구성. → /impeccable harden
- **[P2] 하이드레이션 불일치(React #418)** — 프로덕션 최초 로드 콘솔 에러 1건. 테마 클래스/SSR-CSR 분기 의심. Fix: 원인 추적 후 제거. → /impeccable audit
- **[P2] ~1200px에서 민트 스티커가 헤드라인 침범** — 실측. Fix: lg 이상에서만 표시 또는 오프셋 조정. → /impeccable adapt
- **[P3] Tilt/Flow 템플릿 문법 잔재** — 동일 카드 6장 그리드·01/02/03 아이콘 타일 스택(디텍터 icon-tile-stack ×3 수렴). Fix: 섹션 재구성 또는 축소. → /impeccable distill

## Persona Red Flags

- **Jordan(첫 방문자)**: 뉴스 카드 클릭 → 무반응(기사 제목까지 있는데 원문 없음); 틸트 카드 "패션 업사이클" → 검색 결과 착지로 문맥 단절.
- **Casey(모바일 390)**: "스크롤 ↓"이 하단 내비에 반쯤 가림; 헤딩 "캠페\n인" 찢김; 가로 드래그와 세로 스크롤 경합; 토글이 풋터 카피 가림.
- **Riley(스트레스 테스터)**: 키보드로 캐러셀 정지 불가; 1200px 스티커 침범; 900 높이에서 캐러셀 겹침 상시 재현; 콘솔 하이드레이션 에러 1건.
- **평가자(60초 스킴)**: "말보다 증거 — 실제 캠페인" 카피 밑의 서구권 자작나무 스톡 포토가 "실제" 주장과 불일치; 01/02/03 카드의 템플릿 기시감; 마지막 프레임(풋터)이 토글에 가려진 채 종료.

## Minor Observations

- 히어로 그라데이션 타이틀 중간색 세이지 위 ~3.8:1 — 대형 텍스트 AA 통과지만 여유 적음.
- 틸트 카드 흰 글레어가 정지 상태에도 미세 노출.
- 캐러셀 이미지 alt "{기사제목} 캠페인 이미지" — 기사인데 캠페인으로 오정보.
- 풋터 `rgba(255,255,255,0.75)` 직접 리터럴 — 토큰 단일 통로의 유일한 예외.
- `transition: height` 1건(layout-transition) — 애니메이션 비용 관찰 대상.
- 다크 테마 뉴스 카드의 밝은 지면 유지("인쇄물 느낌")는 세심한 결정.

## Questions to Consider

1. 틸트 카드 6장은 누구를 위한 섹션인가 — 들어내고 히어로→캠페인 직행이면 무엇을 잃나?
2. 클릭할 수 없는 뉴스 캐러셀은 증거인가 장식인가 — 정적 콜라주가 같은 정서를 더 적은 비용으로 내지 않나?
3. "실제 캠페인" 카피를 스톡 사진이 배반할 때, 사진을 고칠 것인가 카피를 고칠 것인가?
