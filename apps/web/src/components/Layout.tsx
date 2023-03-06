import React from "react";

import { poppins } from "@/lib/fonts";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={clsx(
        poppins.className,
        "bg-gradient-to-r from-rose-100 to-teal-100",
        "w-[100vw] min-h-[100vh]"
      )}
    >
      {children}
    </main>
  );
}
