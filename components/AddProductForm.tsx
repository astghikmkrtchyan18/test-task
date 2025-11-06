'use client';

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

interface AddProductFormProps {
  onClose: () => void;
  onAdded?: (product: any) => void;
  editingProduct?: any;
}

export default function AddProductForm({
  onClose,
  onAdded,
  editingProduct,
}: AddProductFormProps) {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name || "");
      setDescription(editingProduct.description || "");
      setCategory(editingProduct.category || "");
      setPrice(editingProduct.price || "");
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !description || !category || price === "") {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: editingProduct ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProduct?.id,
          name,
          description,
          category,
          price,
        }),
      });

      if (!res.ok) throw new Error("Failed to save product");
      const savedProduct = await res.json();
      if (onAdded) onAdded(savedProduct);
      onClose();
    } catch (err: any) {
      setError(err.message || "Error saving product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-lg p-6 rounded-lg shadow-lg mt-6 transition-colors duration-300 ${
        isLight ? 'bg-white text-gray-900' : 'bg-zinc-800 text-gray-200'
      }`}
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`w-full p-3 rounded border transition-colors duration-300 ${
            isLight
              ? 'border-gray-300 bg-white text-gray-900'
              : 'border-zinc-600 bg-zinc-700 text-gray-200'
          }`}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`w-full p-3 rounded border transition-colors duration-300 ${
            isLight
              ? 'border-gray-300 bg-white text-gray-900'
              : 'border-zinc-600 bg-zinc-700 text-gray-200'
          }`}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`w-full p-3 rounded border transition-colors duration-300 ${
            isLight
              ? 'border-gray-300 bg-white text-gray-900'
              : 'border-zinc-600 bg-zinc-700 text-gray-200'
          }`}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className={`w-full p-3 rounded border transition-colors duration-300 ${
            isLight
              ? 'border-gray-300 bg-white text-gray-900'
              : 'border-zinc-600 bg-zinc-700 text-gray-200'
          }`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition"
          >
            {loading
              ? "Saving..."
              : editingProduct
              ? "Update Product"
              : "Add Product"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className={`px-4 py-2 rounded transition ${
              isLight
                ? 'bg-gray-300 hover:bg-gray-400 text-gray-900'
                : 'bg-zinc-700 hover:bg-zinc-600 text-gray-200'
            }`}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
