"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useTilt } from "@/lib/use-tilt";

export function Hero3D() {
  const { ref, rotateX, rotateY, onMouseMove, reset } = useTilt({
    stiffness: 120,
    damping: 18,
    rotateYRange: [-18, 18],
    rotateXRange: [14, -14],
  });

  // JS 주도 스크롤 패럴랙스는 전역 CSS reduce 로 멈추지 않는다 — 직접 분기한다.
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const bgYRaw = useTransform(scrollY, [0, 800], ["0%", "40%"]);
  const titleYRaw = useTransform(scrollY, [0, 800], ["0%", "-30%"]);
  const titleOpacityRaw = useTransform(scrollY, [0, 600], [1, 0]);
  const blobYRaw = useTransform(scrollY, [0, 800], ["0%", "60%"]);
  const bgY = reduce ? "0%" : bgYRaw;
  const titleY = reduce ? "0%" : titleYRaw;
  const titleOpacity = reduce ? 1 : titleOpacityRaw;
  const blobY = reduce ? "0%" : blobYRaw;

  const [hover, setHover] = useState(false);

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        reset();
      }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden transition-colors"
      style={{
        position: "relative",
        perspective: 1400,
        backgroundImage: "var(--hero-gradient)",
      }}
    >
      <motion.div className="absolute inset-0 opacity-40" style={{ y: blobY }}>
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px]"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-[700px] h-[700px] rounded-full blur-[140px]"
          style={{ background: "var(--accent-secondary)", opacity: 0.4 }}
        />
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div
          className="absolute top-1/4 left-10 w-40 h-40 rounded-full border"
          style={{ borderColor: "rgba(var(--ink-rgb), 0.17)" }}
        />
        <div
          className="absolute bottom-1/3 right-16 w-24 h-24 rounded-full border"
          style={{ borderColor: "rgba(var(--ink-rgb), 0.17)" }}
        />
      </motion.div>

      <motion.div
        className="relative"
        style={{ rotateX, rotateY, y: titleY, opacity: titleOpacity, transformStyle: "preserve-3d" }}
      >
        <motion.div
          // 배지 뒤에 민트 blur 오브가 지나가 텍스트 대비가 무너질 수 있어(다크에서 1.67:1)
          // 표면색 배경을 깔아 어떤 배경 위에서도 4.5:1 을 보장한다.
          style={{ transform: "translateZ(40px)", background: "rgba(var(--surface-rgb), 0.8)" }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full border backdrop-blur-md whitespace-nowrap tracking-[0.3em] uppercase"
        >
          <span
            style={{
              color: "var(--heading)",
            }}
          >
            Re · Cycle · Up
          </span>
        </motion.div>

        <motion.h1
          style={{ transform: "translateZ(90px)" }}
          className="text-center px-10 py-12 select-none"
        >
          <span
            className="block"
            style={{
              fontFamily: "var(--font-black-han), sans-serif",
              fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 1.05,
              color: "var(--foreground)",
              textShadow: "0 20px 60px rgba(0,0,0,0.35)",
            }}
          >
            당 신 은 지 구 를 위해
          </span>
          <span
            className="block mt-3"
            style={{
              fontFamily: "var(--font-black-han), sans-serif",
              fontSize: "clamp(48px, 7vw, 110px)",
              lineHeight: 1.05,
              backgroundImage: "var(--hero-title-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            어떤 노력을 하고 있나요?
          </span>
        </motion.h1>

        <motion.div
          style={{ transform: "translateZ(140px)" }}
          className="hidden sm:flex absolute -right-10 -top-8 w-28 h-28 rounded-2xl bg-[var(--accent)] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] items-center justify-center"
        >
          <span style={{ fontFamily: "var(--font-black-han), sans-serif", fontSize: 28, color: "var(--surface-dark)" }}>
            다시,<br />다
          </span>
        </motion.div>

        <motion.div
          style={{
            transform: "translateZ(120px)",
            borderColor: "rgba(var(--ink-rgb), 0.55)",
          }}
          className="absolute -left-16 -bottom-10 w-24 h-24 rounded-full border-4 backdrop-blur-md"
        />

        <motion.div
          style={{ transform: "translateZ(60px)" }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 px-10"
        >
          <Link
            href="/campaigns"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[14px] font-medium transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 motion-reduce:transform-none"
            style={{ background: "var(--accent)", color: "var(--surface-dark)" }}
          >
            캠페인 둘러보기
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full border px-8 py-4 text-[14px] font-medium transition-colors hover:bg-[color:var(--chip-bg)]"
            style={{
              borderColor: "rgba(var(--ink-rgb), 0.4)",
              color: "var(--heading)",
              background: "rgba(var(--surface-rgb), 0.6)",
            }}
          >
            회원가입
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        animate={reduce ? undefined : { y: hover ? 6 : 0, opacity: hover ? 0.4 : 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 tracking-[0.4em] uppercase"
        style={{ color: "rgba(var(--ink-rgb), 0.65)" }}
      >
        scroll ↓
      </motion.div>
    </section>
  );
}
