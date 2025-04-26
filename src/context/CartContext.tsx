"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
}

// Type predicate function refactored with 'unknown' and safer checks
const isCartItem = (item: unknown): item is CartItem => {
  // Check if it's a non-null object first
  if (typeof item !== "object" || item === null) {
    return false;
  }
  // Now, safely check for properties using 'in' operator and typeof
  return (
    "id" in item &&
    typeof (item as { id: unknown }).id === "number" &&
    "name" in item &&
    typeof (item as { name: unknown }).name === "string" &&
    "price" in item &&
    typeof (item as { price: unknown }).price === "number" &&
    "imageUrl" in item &&
    typeof (item as { imageUrl: unknown }).imageUrl === "string" &&
    "quantity" in item &&
    typeof (item as { quantity: unknown }).quantity === "number" &&
    (item as { quantity: number }).quantity >= 0
  );
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          // Use the refactored type predicate
          const validCart = parsedCart.filter(isCartItem);
          setCartItems(validCart);
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        localStorage.removeItem("shoppingCart"); // Clear corrupted data
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("shoppingCart", JSON.stringify(cartItems));
    } else {
      // If cart becomes empty, remove the item from localStorage
      localStorage.removeItem("shoppingCart");
    }
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems: CartItem[]) => {
      const existingItem = prevItems.find(
        (item: CartItem) => item.id === product.id
      );
      if (existingItem) {
        // Increase quantity if item already exists
        return prevItems.map((item: CartItem) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems: CartItem[]) =>
      prevItems.filter((item: CartItem) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total: number, item: CartItem) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
