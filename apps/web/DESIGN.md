---
name: 다시,다 (Dasida)
description: 업사이클링 실천을 나누는 소셜 캠페인 커뮤니티 — 절제된 딥틸·민트·크림의 온실 팔레트
colors:
  deep-teal-ink: "#1c4044"
  night-teal: "#0f1f22"
  mint: "#7dd3a3"
  teal-strong: "#0f7076"
  cream: "#f9f7f2"
  sand: "#e7dfcb"
  card-white: "#ffffff"
  danger-ink: "#b3402f"
  danger-solid: "#ed5c48"
  warning-ink: "#95670f"
typography:
  display:
    fontFamily: "Black Han Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.15
  headline:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 500
rounded:
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.night-teal}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  button-danger:
    backgroundColor: "{colors.danger-solid}"
    textColor: "{colors.card-white}"
    rounded: "{rounded.xl}"
    padding: "12px 24px"
  chip:
    textColor: "{colors.deep-teal-ink}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.2xl}"
  input:
    rounded: "{rounded.xl}"
    padding: "12px 16px"
---

# Design System: 다시,다 (Dasida)

## 1. Overview

**Creative North Star: "정서의 식물원"**

유리 온실 안의 정적이고 정돈된 녹지. 깊은 틸의 그늘(#1c4044)과 민트의 생기(#7dd3a3)가 크림빛 지면(#f9f7f2) 위에 놓이고, 반투명 유리(글래스) 패널이 그 사이를 가른다. 미니멀·절제·전문적 — 장식을 더하지 않고 타이포그래피와 여백, 정렬로 말한다. 따뜻함은 색을 덧칠해서가 아니라 콘텐츠(사람들의 실천 기록·사진)와 담백한 존댓말 말투가 낸다.

이 시스템이 명시적으로 거부하는 것: 전형적 SaaS/AI 랜딩의 그라데이션 텍스트와 통계 히어로 카드, 관공서 환경 캠페인의 초록 일색 + 지구 아이콘, 유치한 카툰풍, 회색조 무표정 기업 웹. 색은 두 테마(라이트/크림, 다크/나이트틸)를 CSS 토큰만으로 오간다 — 컴포넌트 코드에 테마 분기 금지.

**Key Characteristics:**
- 딥틸+민트+크림의 단일 색 가족 — 외부 색을 들이지 않는다
- 글래스 면과 1px 경계선으로 구분하는 평면 우선의 깊이
- 완전 원형(pill) 칩과 16–24px 라운딩의 부드러운 형태 언어
- 배경의 은은한 민트 블러 오브(opacity 20%)가 유일한 장식
- 모든 상태(빈 목록·로딩·오류)까지 디자인된 완결성

## 2. Colors

온실의 세 층 — 그늘(딥틸), 생기(민트), 지면(크림) — 이 전부이며, 위험·경고만 외부에서 빌려온다.

### Primary
- **민트 (Mint)** (#7dd3a3): 유일한 액센트. 주요 CTA 배경, 포커스 링, 활성 상태, 배경 블러 오브. 민트 배경 위 텍스트는 항상 나이트틸(#0f1f22).
- **딥틸 잉크 (Deep Teal Ink)** (#1c4044): 라이트 테마의 헤딩·강조 텍스트·태그 텍스트. `--ink-rgb` 채널로 임의 투명도의 본문·틴트·경계선을 파생.
- **틸 스트롱 (Teal Strong)** (#0f7076): 민트 틴트 배경 위에서 대비를 확보해야 하는 텍스트용 진한 액센트(라이트 전용, 다크에서는 민트로 복귀).

### Neutral
- **크림 (Cream)** (#f9f7f2): 라이트 테마 페이지 지면. `--page-gradient`로 샌드와 이어진다.
- **샌드 (Sand)** (#e7dfcb): 크림보다 한 단계 깊은 보조 지면·그라디언트 끝점.
- **나이트틸 (Night Teal)** (#0f1f22): 다크 테마 지면이자 라이트 테마 본문 잉크. 이미지 스크림·모달 backdrop은 테마와 무관하게 이 색의 알파.
- **카드 화이트 (Card White)** (#ffffff): 라이트 카드·패널 면. 다크에서는 흰색 4–6% 알파의 글래스 면으로 치환.

### Danger / Warning (기능색)
- **위험 잉크** (#b3402f) / **위험 솔리드** (#ed5c48): 파괴적 액션. 솔리드는 테마 불변, 흰 텍스트 전제.
- **경고 잉크** (#95670f): 대기·신고 PENDING 배지 계열.

### Named Rules
**토큰 단일 통로 규칙.** 모든 색은 `globals.css`의 CSS 토큰을 통해서만 쓴다. `dark ?` 삼항, Tailwind `dark:` 변형, 리터럴 hex의 컴포넌트 직접 사용은 금지 — 테마 전환은 토큰이 처리한다.

**민트 절제 규칙.** 민트는 화면의 10% 이하를 차지한다. CTA·포커스·활성 표시가 아닌 곳에 민트를 칠하기 시작하면 온실이 놀이공원이 된다.

## 3. Typography

**Display Font:** Black Han Sans (`var(--font-black-han)`, next/font 로딩 — 리터럴 폰트명 재선언 금지)
**Body Font:** 시스템 산세리프 (system-ui 스택)

**Character:** 묵직한 단일 웨이트의 한글 디스플레이(Black Han Sans)가 브랜드의 목소리를 내고, 본문은 시스템 폰트로 물러선다. 대비 축은 "브랜드 헤딩 vs 무표정 본문" — 두 번째 장식 폰트는 없다.

### Hierarchy
- **Display** (Black Han Sans 400, clamp 기반 대형, line-height 1.1–1.2): 랜딩 히어로·섹션 타이틀 전용.
- **Headline** (600–700, 1.25–1.875rem): 페이지 제목·카드 그룹 제목.
- **Body** (400, 0.875rem/14px, line-height 1.6): 기본 본문. 최대 행길이 65–75ch.
- **Label** (500, 12–13px): 칩·배지·메타 정보·버튼 텍스트.

### Named Rules
**한 목소리 규칙.** Black Han Sans는 브랜드가 말할 때(히어로·섹션 헤딩)만 쓴다. UI 크롬·본문·버튼에 스며들면 무게가 사라진다.

## 4. Elevation

평면 우선. 평상시 깊이는 1px 경계선(`--border`), 면 색 차이(카드 vs 지면), 글래스 패널(`--glass`, 백드롭 블러)로만 표현한다. 큰 소프트 쉐도우(예: `0 20px 45px -25px rgba(0,0,0,0.45)`)는 히어로 비주얼·모달·호버 부양 같은 예외적 순간에만 등장한다 — 쉐도우는 상태에 대한 응답이지 기본 장식이 아니다.

### Shadow Vocabulary
- **호버 부양** (`shadow-lg` + `hover:-translate-y-0.5`): 인터랙티브 카드·주요 버튼의 호버 응답. `motion-reduce:transform-none` 필수.
- **모달·히어로 딥 쉐도우** (`0 20px 45px -25px rgba(0,0,0,0.45)` 계열): 지면에서 분리된 최상위 면 전용.

### Named Rules
**응답으로서의 그림자 규칙.** 정지 상태의 컴포넌트에 그림자를 기본 적용하지 않는다. 그림자가 보이면 사용자가 방금 무언가를 했거나, 그 면이 페이지 위에 떠 있는 것이다.

## 5. Components

부드럽고 확신 있는 — 큰 라운딩의 온화한 형태에 단호한 대비(민트 위 나이트틸)를 얹는다.

### Buttons
- **Shape:** 부드러운 12px 라운딩(`rounded-xl`), 인라인 소형 버튼은 완전 원형(`rounded-full`)
- **Primary:** 민트 배경(#7dd3a3) + 나이트틸 텍스트(#0f1f22), `px-6 py-3`, 500 웨이트
- **Hover / Focus:** `hover:-translate-y-0.5 hover:shadow-lg`(모션 축소 시 변형 제거), 포커스는 전역 `focus-visible` 민트 아웃라인(2px, offset 3px)
- **Danger:** 위험 솔리드(#ed5c48) 배경 + 흰 텍스트, 호버 시 #d94e3c
- **Disabled:** `opacity-40~50` + `cursor-not-allowed`

### Chips
- **Style:** 완전 원형, `--glass-strong` 배경 + 잉크 12% 알파 경계선 + 헤딩 색 텍스트(12px), `px-3 py-1.5`
- **State:** 호버 시 `--chip-bg`, 선택 시 민트 틴트(`--accent-soft`) + 액센트 세컨더리 텍스트

### Cards / Containers
- **Corner Style:** 16px(`rounded-2xl`) 기본, 히어로급 24px(`rounded-3xl`)
- **Background:** 라이트 `--card`(흰색), 다크는 흰색 저알파 글래스; 강조 패널은 `--panel`
- **Shadow Strategy:** 평상시 없음(경계선만) — Elevation 참조
- **Border:** 1px `--border`
- **Internal Padding:** 16–24px

### Inputs / Fields
- **Style:** `.ui-control` — 1px 경계선, 12px 라운딩, `px-4 py-3`, 14px 텍스트
- **Focus:** 경계선 민트 전환 + 민트 18% 알파 3px 글로우 링
- **Error / Disabled:** 위험 잉크 텍스트·`--danger-soft` 틴트 / opacity 0.5

### Navigation
- 상단 헤더는 반투명 지면(`rgba(var(--surface-rgb), a)`) + 백드롭 블러의 글래스 바. 모바일은 하단 고정 내비(`mobile-bottom-nav`). 활성 항목은 민트 잉크, 비활성은 `--foreground-muted`.

### 배경 오브 (Signature)
페이지 배경에 500px 민트 원 + `blur(120–140px)`, 전체 opacity 20%. 페이지당 하나(left/right/center), `pointer-events-none`. 온실의 빛 번짐 — 이 시스템의 유일한 순수 장식이므로 더 늘리지 않는다.

## 6. Do's and Don'ts

### Do:
- **Do** 모든 색을 `globals.css` 토큰으로만 참조한다 — 새 색이 필요하면 토큰을 먼저 추가한다.
- **Do** 본문 대비 4.5:1을 지킨다. 크림 지면 위 뮤트 텍스트는 `--foreground-muted`(잉크 75% 알파, 크림 위 5.1:1)가 하한선이다.
- **Do** 모든 변형·전환에 `prefers-reduced-motion` 대응을 넣는다(전역 리듀스가 있지만 transform 은 `motion-reduce:` 로 직접 끈다).
- **Do** 민트 배경 위 텍스트는 항상 나이트틸(#0f1f22)로 — 흰 텍스트는 대비 미달이다.
- **Do** 빈 목록·로딩·오류 상태를 본 화면과 같은 정성으로 디자인한다(`list-empty-state`, `state-panel`, `skeleton-cards` 재사용).

### Don't:
- **Don't** `dark ?` 색 삼항, `useTheme` 색 분기, Tailwind `dark:` 변형을 쓰지 않는다 — 과거 버그의 원인이며 마이그레이션 완료 상태다.
- **Don't** 그라데이션 텍스트·통계 히어로 카드·보라 그라데이션 등 "전형적 SaaS/AI 랜딩" 문법을 들이지 않는다(단, 기존 `--hero-title-gradient`는 브랜드 유산으로 히어로 타이틀 한 곳에만 허용).
- **Don't** "관공서 환경 캠페인 톤"(초록 일색 + 지구 아이콘 + 구호 나열)으로 번역하지 않는다 — 친환경은 팔레트가 아니라 콘텐츠가 말한다.
- **Don't** 이모지·캐릭터 남발의 "유치한 카툰풍", 회색조 무표정의 "차가운 기업 웹" 어느 쪽으로도 기울지 않는다.
- **Don't** 카드에 2px 이상 색 스트라이프(`border-left`)를 긋거나, 정지 상태 컴포넌트에 그림자를 기본 적용하지 않는다.
- **Don't** Black Han Sans를 본문·버튼·UI 크롬에 쓰지 않는다. 배경 오브를 페이지당 둘 이상 두지 않는다.
