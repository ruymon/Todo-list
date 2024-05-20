"use client";

import { ReactNode } from "react";
import { Toaster } from "sonner";

interface IProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: IProvidersProps) {
  return (
    <>
      <Toaster richColors />
      {children}
    </>
  );
}
