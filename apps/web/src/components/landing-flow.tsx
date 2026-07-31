"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

// 실제 3단계 시퀀스이므로 번호는 유지한다. 각 스텝은 해당 행동으로 바로 가는 링크다.
const steps = [
  {
    title: "기록하다",
    desc: "버려질 뻔한 것의 변신을 사진과 이야기로 남기세요.",
    href: "/posts/new",
    action: "글 쓰러 가기",
  },
  {
    title: "나누다",
    desc: "피드에서 서로의 아이디어에 좋아요와 댓글로 응답하세요.",
    href: "/feed",
    action: "피드 보러 가기",
  },
  {
    title: "함께하다",
    desc: "캠페인에 참여하거나 직접 개최해 변화를 넓히세요.",
    href: "/campaigns",
    action: "캠페인 보러 가기",
  },
];

export function LandingFlow() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative py-32 px-8 transition-colors"
      style={{ background: "var(--surface-muted)" }}
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-20">
          <h2
            style={{
              fontFamily: "var(--font-black-han), sans-serif",
              fontSize: "clamp(40px, 5vw, 72px)",
              color: "var(--foreground)",
            }}
          >
            참여는 이렇게 시작됩니다
          </h2>
        </ScrollReveal>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {steps.map((step, i) => (
            <li key={step.title} className="list-none">
              <ScrollReveal delay={i * 0.15} className="h-full">
                <Link
                  href={step.href}
                  className="group relative flex h-full flex-col rounded-3xl border p-8 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transform-none"
                  style={{
                    borderColor: "rgba(var(--ink-rgb), 0.12)",
                    background: "var(--card)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute top-6 right-7 text-[12px] tracking-[0.3em]"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="text-[20px] font-bold group-hover:underline" style={{ color: "var(--heading)" }}>
                    {step.title}
                  </h3>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {step.desc}
                  </p>
                  <span
                    className="mt-auto inline-flex items-center gap-1 pt-5 text-[13px] font-medium"
                    style={{ color: "var(--accent-secondary)" }}
                  >
                    {step.action} <ArrowRight size={14} aria-hidden />
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal className="text-center">
          <h3
            style={{
              fontFamily: "var(--font-black-han), sans-serif",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "var(--foreground)",
            }}
          >
            오늘, 당신의 다시가 시작됩니다
          </h3>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={reduce ? undefined : { y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/campaigns"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[14px] font-medium transition-shadow hover:shadow-lg"
                style={{ background: "var(--accent)", color: "var(--surface-dark)" }}
              >
                캠페인 둘러보기
              </Link>
            </motion.div>
            <motion.div whileHover={reduce ? undefined : { y: -3 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full px-8 py-4 text-[14px] font-medium border"
                style={{
                  borderColor: "rgba(var(--ink-rgb), 0.4)",
                  color: "var(--heading)",
                }}
              >
                회원가입
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
