"use client";

import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useTheme } from "next-themes";
import AddProductForm from "@/components/AddProductForm";

export default function HomePage() {
  const { token, role } = useAuth();
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("Home");

  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false); // ✅ track hydration

  const [showAddProduct, setShowAddProduct] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isLight = resolvedTheme === "light";

  return (
    <div
      className="flex min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: isLight ? "#f5f7fb" : "#121212",
        color: isLight ? "#010114" : "#ededed",
      }}
    >
      {role && (
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} role={role} />
      )}

      <main className="flex-1 flex flex-col p-6">
        <Header/>

        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-2xl font-semibold"
            style={{ color: isLight ? "#010114" : "#ededed" }}
          >
            Home
          </h1>

          {token && role === "Manager" && !showAddProduct && (
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
            >
               Add Product
            </button>
          )}
        </div>

        {showAddProduct && <AddProductForm onClose={() => setShowAddProduct(false)} />}

        <section className="flex flex-col items-center justify-center flex-1 mt-6">
          {token ? (
            <>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: isLight ? "#010114" : "#ededed" }}
              >
                Welcome back!
              </h2>
              <p style={{ color: isLight ? "#4b5563" : "#d1d5db" }}>
                You are logged in as <strong>{role}</strong>.
              </p>
            </>
          ) : (
            <>
              <h2
                className="text-xl font-semibold mb-4"
                style={{ color: isLight ? "#010114" : "#ededed" }}
              >
                Welcome to Bitstore
              </h2>
              <p className="mb-6" style={{ color: isLight ? "#4b5563" : "#d1d5db" }}>
                Please log in to access your dashboard and manage your store.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="px-6 py-3 rounded-md text-sm font-medium transition-colors duration-300"
                style={{
                  backgroundColor: isLight ? "#9333ea" : "#a855f7",
                  color: "#fff",
                }}
              >
                Go to Login
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
