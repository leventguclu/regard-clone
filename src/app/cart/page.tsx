"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sepetiniz</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Alışverişe Devam Et
        </Link>
      </header>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Sepetiniz boş.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {/* Cart Items */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={64} // Specify width
                    height={64} // Specify height
                    className="rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Adet: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-lg font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Ürünü Kaldır"
                  >
                    &times; {/* Multiplication sign for remove */}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-6 p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Toplam Tutar:</h2>
              <p className="text-xl font-semibold">
                ${getCartTotal().toFixed(2)}
              </p>
            </div>
            <button
              onClick={clearCart}
              className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors duration-200"
            >
              Sepeti Boşalt
            </button>
            {/* Ödeme butonu (şimdilik işlevsiz) */}
            <button
              disabled
              className="mt-2 w-full bg-gray-400 text-white py-2 px-4 rounded cursor-not-allowed"
            >
              Ödemeye Geç (Devre Dışı)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
