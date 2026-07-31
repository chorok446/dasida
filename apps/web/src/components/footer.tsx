"use client";


export function Footer() {
  return (
    <footer
      // 우하단 고정 테마 토글이 카피를 가리지 않도록 하단·우측 여유를 둔다.
      className="py-10 px-8 pb-24 transition-colors md:pb-10 md:pr-28"
      style={{ background: "var(--surface-deep)", color: "var(--on-deep)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p style={{ fontFamily: "var(--font-black-han), sans-serif", fontSize: 22, color: "var(--accent)" }}>다시, 다</p>
        <p className="text-[12px]">© 2026 다시,다 — 다시 쓰는 일을 함께 하는 곳</p>
      </div>
    </footer>
  );
}
