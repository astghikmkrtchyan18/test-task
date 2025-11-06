"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/store/useAuth";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AddProductForm from "@/components/AddProductForm";
import { useTheme } from "next-themes";

interface Product {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: number;
}

export default function ProductsPage() {
  const { token, role } = useAuth();
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const [isHydrated, setIsHydrated] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Products");
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!token) router.replace("/login");
  }, [token, router, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    let mounted = true;
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        if (mounted) setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, [isHydrated]);

  const handleProductAdded = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    setShowForm(false);
  };

  const handleProductUpdated = (updated: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    setEditingProduct(null);
    setShowForm(false);
  };

  // ✅ Don’t render until hydration is complete
  if (!isHydrated || !token) return null;

  return (
    <div
      className="flex min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: isLight ? "#f5f7fb" : "#121212",
        color: isLight ? "#010114" : "#ededed",
      }}
    >
      {role && (
        <Sidebar
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          role={role}
        />
      )}

      <main className="flex-1 flex flex-col p-6">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-2xl font-semibold"
            style={{ color: isLight ? "#010114" : "#ededed" }}
          >
            Products
          </h1>

          {role === "Manager" && (
            <button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
            >
              Add Product
            </button>
          )}
        </div>

        {showForm && (
          <AddProductForm
            onClose={() => {
              setEditingProduct(null);
              setShowForm(false);
            }}
            onAdded={editingProduct ? handleProductUpdated : handleProductAdded}
            editingProduct={editingProduct}
          />
        )}

        <div className="overflow-x-auto mt-4">
          <table className="min-w-full border border-gray-300 dark:border-zinc-700 rounded-lg">
            <thead
              className={`text-left ${
                isLight
                  ? "bg-gray-100 text-gray-700"
                  : "bg-zinc-800 text-gray-200"
              }`}
            >
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                {role === "Manager" && <th className="px-4 py-2">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`border-t border-gray-200 dark:border-zinc-700 ${
                    isLight ? "" : "hover:bg-zinc-700"
                  }`}
                >
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                  {role === "Manager" && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => {
                          setEditingProduct(product);
                          setShowForm(true);
                        }}
                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                      >
                        ✏️ Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td
                    colSpan={role === "Manager" ? 4 : 3}
                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
