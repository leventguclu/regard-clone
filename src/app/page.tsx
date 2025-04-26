"use client"; // Need this for onClick in ProductCard via useCart

import React from "react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { useCart } from "@/context/CartContext"; // Import useCart to get cart item count

export default function Home() {
  const { cartItems } = useCart(); // Get cartItems to display the count

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Erkek Giyim</h1>
        <Link href="/cart" className="relative">
          <span className="text-2xl">🛒</span>
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItems.reduce((count, item) => count + item.quantity, 0)}{" "}
              {/* Show total quantity */}
            </span>
          )}
        </Link>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </div>
  );
}
