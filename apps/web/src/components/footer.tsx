"use client";


export function Footer() {
  return (
    <footer
      className="py-10 px-8 transition-colors"
      style={{ background: "var(--surface-deep)", color: "rgba(255,255,255,0.75)" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p style={{ fontFamily: "var(--font-black-han), sans-serif", fontSize: 22, color: "var(--accent)" }}>다시, 다</p>
        <p className="text-[12px]">© 2026 다시,다 — 다시 쓰는 일을 함께 하는 곳</p>
      </div>
    </footer>
  );
}
