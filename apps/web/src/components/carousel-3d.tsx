"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, animate } from "motion/react";
import { fashionPhotos, marketPhotos, naturePhotos, peoplePhotos, objectPhotos, workshopPhotos } from "@/data/photos";

const items = [
  { tag: "패션", title: "파리패션위크 런웨이 오른 업사이클링 원피스", img: fashionPhotos[0] },
  { tag: "철도", title: "코레일, 고객과 함께하는 업사이클링 캠페인 개최", img: peoplePhotos[1] },
  { tag: "금융", title: "우리금융, 플라스틱 업사이클링 화분 키트 기부", img: naturePhotos[2] },
  { tag: "푸드", title: "뚜레쥬르, 푸드 업사이클링 ‘착한 빵식 통밀 식빵’ 출시", img: marketPhotos[2] },
  { tag: "공공", title: "환경공단, 전직원 기증 청바지 수거 업사이클링 추진", img: fashionPhotos[3] },
  { tag: "도시", title: "성동구, 노숙인 ‘희망 화수분’ 폐화분 업사이클링", img: naturePhotos[5] },
  { tag: "음악", title: "래코드 x 하이브, BTS 무대의상 업사이클 굿즈", img: fashionPhotos[6] },
  { tag: "산업", title: "지속가능한 삶을 꿈꾸는 미래산업, 업사이클", img: objectPhotos[0] },
  { tag: "공방", title: "주말마다 열리는 동네 공방 클래스", img: workshopPhotos[1] },
];

export function Carousel3D() {
  const rotation = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  // 640px 미만에서는 반경·카드를 줄여 화면 밖 클리핑을 막는다.
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const radius = small ? 210 : 420;
  const cardW = small ? 180 : 260;
  const cardH = small ? 240 : 340;
  const step = 360 / items.length;

  const reduce = useReducedMotion();
  // 호버·드래그의 일시 정지와 별개로, 키보드 사용자를 위한 명시적 정지(WCAG 2.2.2).
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    if (paused || userPaused || reduce) return;
    const controls = animate(rotation, rotation.get() - 360, {
      duration: 40,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [paused, userPaused, rotation, reduce]);

  function onDrag(_: unknown, info: { delta: { x: number } }) {
    rotation.set(rotation.get() + info.delta.x * 0.4);
  }

  return (
    <section
      className="relative py-32 overflow-hidden transition-colors"
      style={{
        background: "var(--band-gradient)",
      }}
    >
      <div className="text-center mb-20 px-8">
        <h2
          style={{
            fontFamily: "var(--font-black-han), sans-serif",
            fontSize: "clamp(40px, 5vw, 72px)",
            color: "var(--foreground)",
          }}
        >
          업사이클링, 지금 일어나는 일
        </h2>
        <p
          className="mt-6 max-w-2xl mx-auto"
          style={{ color: "rgba(var(--ink-rgb), 0.75)" }}
        >
          언론이 먼저 전한 업사이클링 소식을 모았습니다.
        </p>
      </div>

      <div
        className="relative mx-auto"
        // rotateX(-8)+translateZ 투영으로 전면 카드가 카드 높이보다 아래로 내려온다 —
        // 컨테이너를 투영 높이만큼 키워 하단 문단과의 겹침을 막는다.
        style={{ perspective: 1600, height: small ? 380 : 560 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDrag={onDrag}
          // 호버가 없는 터치 환경에서도 드래그로 자동 회전을 멈출 수 있게 한다.
          onDragStart={() => setPaused(true)}
          className="relative w-full h-full cursor-grab active:cursor-grabbing"
          style={{ transformStyle: "preserve-3d", rotateY: rotation, rotateX: -8 }}
        >
          {items.map((it, i) => {
            const angle = i * step;
            return (
              <div
                key={it.title}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: cardW,
                  height: cardH,
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] border border-white/20"
                  style={{
                    background: "var(--news-card-gradient)",
                  }}
                >
                  <Image
                    src={it.img}
                    alt={`${it.title} 관련 보도 이미지`}
                    fill
                    sizes="(max-width: 639px) 180px, 260px"
                    className="object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(var(--surface-dark-rgb),0.9)] via-[rgba(var(--surface-dark-rgb),0.4)] to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div>
                      {/* 상단은 스크림이 옅어 이미지 위 텍스트 대비가 불안정 — 칩 자체에 어두운 면을 깐다. */}
                      <span
                        className="inline-flex text-[12px] px-2.5 py-1 rounded-full backdrop-blur"
                        style={{ background: "rgba(var(--surface-dark-rgb), 0.6)" }}
                      >
                        {it.tag}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold" style={{ fontSize: small ? 14 : 18, lineHeight: 1.35 }}>
                        {it.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      <div className="text-center mt-8 px-8">
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-pressed={userPaused}
          className="inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-medium transition-colors hover:bg-[color:var(--chip-bg)]"
          style={{ borderColor: "rgba(var(--ink-rgb), 0.16)", color: "var(--heading)" }}
        >
          {userPaused ? "자동 회전 재생" : "자동 회전 멈추기"}
        </button>
      </div>

      <div className="text-center mt-10 px-8">
        <p
          className="max-w-xl mx-auto leading-relaxed"
          style={{ color: "rgba(var(--ink-rgb), 0.75)" }}
        >
          폐자원이 자산이라는 인식이 확산됨에 따라, 단순한 재활용과 달리 새로운 가치를 불어넣는 산업이
          주목받고 있습니다.
        </p>
      </div>
    </section>
  );
}
