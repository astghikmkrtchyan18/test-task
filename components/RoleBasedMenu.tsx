"use client";
import React from "react";
import Link from "next/link";
import { Role } from "@/store/useAuth";

interface RoleBasedMenuProps {
  role: Role;
}

const RoleBasedMenu: React.FC<RoleBasedMenuProps> = ({ role }) => {
  if (!role) return null;

  const menuItems = [
    { label: "Dashboard", path: "/dashboard", roles: ["Manager"] },
    { label: "Products", path: "/products", roles: ["Manager", "Store Keeper"] },
    { label: "Add Product", path: "/add-product", roles: ["Manager", "Store Keeper"] },
  ];

  return (
    <nav className="flex gap-4 p-4 bg-gray-100 dark:bg-gray-800">
      {menuItems
        .filter((item) => item.roles.includes(role))
        .map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="text-gray-800 dark:text-white hover:underline"
          >
            {item.label}
          </Link>
        ))}
    </nav>
  );
};

export default RoleBasedMenu;
