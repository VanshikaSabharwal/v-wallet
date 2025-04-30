// app/(dashboard)/pay/page.tsx
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const PayClient = dynamic(() => import("../../components/PayClient"), {
  ssr: false,
});

export default function PayPage() {
  return (
    <Suspense fallback={<div className="p-4 text-center">Loading…</div>}>
      <PayClient />
    </Suspense>
  );
}
