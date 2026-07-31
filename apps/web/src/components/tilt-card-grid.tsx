"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Leaf, Recycle, Sprout, Shirt, Coffee, Package } from "lucide-react";
import { useTilt } from "@/lib/use-tilt";

type Card = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
};

const cards: Card[] = [
  { icon: <Recycle size={28} />, title: "폐자원 재발견", desc: "버려진 자원에 새 가치를 부여합니다.", href: "/search?q=재활용" },
  { icon: <Shirt size={28} />, title: "패션 업사이클", desc: "런웨이에 오른 업사이클링 의류.", href: "/search?q=패션" },
  { icon: <Coffee size={28} />, title: "푸드 업사이클", desc: "버려질 식재료로 만드는 새로운 맛.", href: "/search?q=푸드" },
  { icon: <Sprout size={28} />, title: "도시 화분", desc: "플라스틱이 화분으로 다시 태어납니다.", href: "/search?q=화분" },
  { icon: <Package size={28} />, title: "패키지 순환", desc: "포장재를 줄이고 재사용 합니다.", href: "/search?q=패키지" },
  { icon: <Leaf size={28} />, title: "그린 캠페인", desc: "함께 참여하고, 직접 개최하세요.", href: "/campaigns" },
];

function TiltCard({ card }: { card: Card }) {
  const { ref, sx, sy, rotateX, rotateY, onMouseMove, reset } = useTilt({
    stiffness: 200,
    damping: 20,
    rotateYRange: [-22, 22],
    rotateXRange: [18, -18],
  });
  const glare = useTransform(() => {
    const x = 50 + sx.get() * 60;
    const y = 50 + sy.get() * 60;
    return `radial-gradient(400px circle at ${x}% ${y}%, rgba(255,255,255,0.35), transparent 50%)`;
  });

  return (
    <Link href={card.href} className="block" style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={reset}
        whileHover={{ scale: 1.03 }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, var(--surface-deep), var(--surface-dark))",
        }}
        className="relative h-[280px] rounded-3xl p-7 text-white overflow-hidden transition-shadow hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)]"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: glare }}
        />
        <div style={{ transform: "translateZ(40px)" }} className="flex flex-col h-full justify-between relative">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center">
            {card.icon}
          </div>
          <div>
            <h3 className="text-[20px] font-bold">{card.title}</h3>
            <p className="mt-2 text-white/80">{card.desc}</p>
          </div>
        </div>
        <div
          style={{ transform: "translateZ(80px)" }}
          className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center text-white/80"
        >
          →
        </div>
      </motion.div>
    </Link>
  );
}

export function TiltCardGrid() {
  const ref = useRef<HTMLDivElement>(null);
  // JS 주도 스크롤 패럴랙스는 전역 CSS reduce 로 멈추지 않는다 — 직접 분기한다.
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const headerYRaw = useTransform(scrollY, [400, 1600], ["80px", "-80px"]);
  const gridYRaw = useTransform(scrollY, [400, 1600], ["40px", "-40px"]);
  const headerY = reduce ? "0px" : headerYRaw;
  const gridY = reduce ? "0px" : gridYRaw;

  return (
    <section
      ref={ref}
      className="relative py-32 px-8 transition-colors"
      style={{ position: "relative", background: "var(--card)" }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div className="mb-16 text-center" style={{ y: headerY }}>
          <h2
            style={{ fontFamily: "var(--font-black-han), sans-serif", fontSize: "clamp(40px, 5vw, 72px)", color: "var(--heading)" }}
          >
            다시, 다 — 새 가치를 더하다
          </h2>
          <p className="mt-6 max-w-2xl mx-auto" style={{ color: "var(--foreground-muted)" }}>
            관심 있는 주제를 골라 관련 이야기와 캠페인을 찾아보세요.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ y: gridY }}
        >
          {cards.map((c) => (
            <TiltCard key={c.title} card={c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
