'use client';

import { useEffect, useState } from 'react';

const MIN_VISIBLE_MS = 600;

export function SplashScreen() {
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadingOut(true), MIN_VISIBLE_MS);
    const hideTimer = setTimeout(() => setHidden(true), MIN_VISIBLE_MS + 300);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      id="app-splash"
      aria-hidden={fadingOut}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-fd-background transition-opacity duration-300 ${
        fadingOut ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <img
        src="/logo/logo.svg"
        alt="Edoma"
        width={88}
        height={88}
        className="splash-logo"
      />
      <span className="text-xl font-semibold tracking-tight text-fd-foreground">
        Edoma
      </span>
      <span className="text-xs text-fd-muted-foreground">
        Hecho por vypsoft
      </span>
    </div>
  );
}
