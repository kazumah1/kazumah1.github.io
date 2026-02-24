import { Suspense } from "react";

import { HomeClient } from "@/components/HomeClient";

const LoadingFallback = (): JSX.Element => (
  <main className="relative flex h-screen w-screen items-center justify-center bg-bg text-fg">
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
      Loading interface...
    </p>
  </main>
);

export default function HomePage(): JSX.Element {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeClient />
    </Suspense>
  );
}
