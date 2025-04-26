"use client";

import React from "react";
import Image from "next/image"; // Import Image from next/image
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const openTryOnWindow = () => {
    const tryOnUrl = `/try-on?imageUrl=${encodeURIComponent(product.imageUrl)}`;
    // Define features for the new window (optional)
    const windowFeatures = "width=1000,height=750,resizable=yes,scrollbars=yes";
    window.open(tryOnUrl, "_blank", windowFeatures);
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200 flex flex-col">
      <div className="relative w-full h-64 mb-4 overflow-hidden rounded">
        {/* Use Next.js Image component */}
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 flex-grow">{product.name}</h3>
      <p className="text-gray-700 mb-3">${product.price.toFixed(2)}</p>
      {/* Buttons container */}
      <div className="mt-auto flex gap-2">
        {" "}
        {/* Use flex container for buttons */}
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 text-sm"
        >
          Sepete Ekle
        </button>
        <button
          onClick={openTryOnWindow}
          title="Sanal Dene"
          className="bg-purple-500 text-white py-2 px-3 rounded hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center"
        >
          {/* Simple icon (e.g., sparkle emoji) */}
          <span role="img" aria-label="try on">
            ✨
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
