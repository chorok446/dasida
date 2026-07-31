"use client";

import { useSyncExternalStore } from "react";
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemeProvider>
  );
}

// 기존 컴포넌트 호환 래퍼: { theme, toggle } 시그니처 유지.
// next-themes는 클라이언트 첫 렌더에 localStorage 값을 즉시 반환하므로, 마운트 전에는
// 서버와 같은 light 로 고정해 하이드레이션 불일치(React #418)를 막는다 — 마운트 후 보정 재렌더.
const emptySubscribe = () => () => {};

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme();
  // 하이드레이션 렌더는 서버 스냅샷(false)을 쓰고, 이후 클라이언트 값(true)으로 보정된다.
  const hydrated = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const theme = hydrated && resolvedTheme === "dark" ? "dark" : "light";
  return { theme, toggle: () => setTheme(theme === "dark" ? "light" : "dark") };
}
