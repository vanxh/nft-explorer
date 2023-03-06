import React from "react";

import { poppins } from "@/lib/fonts";
import clsx from "clsx";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className={clsx(poppins.className)}>{children}</main>;
}
