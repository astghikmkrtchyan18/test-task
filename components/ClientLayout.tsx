"use client";

import React from "react";
import RoleBasedMenu from "./RoleBasedMenu";
import { useAuth } from "@/store/useAuth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role } = useAuth();

  return (
    <div>
      <RoleBasedMenu role={role} />
      <main>{children}</main>
    </div>
  );
}
