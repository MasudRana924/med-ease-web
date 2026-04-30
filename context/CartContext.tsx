"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    quantity?: number;
    // Add other necessary fields
}

interface CartContextType {
    cart: Product[];
    wishlist: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInCart: (productId: string) => boolean;
    isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);
    const [wishlist, setWishlist] = useState<Product[]>([]);

    // Load from local storage on mount
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        const storedWishlist = localStorage.getItem("wishlist");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            // Migration: Ensure all items have a quantity of at least 1
            const migratedCart = parsedCart.map((item: Product) => ({
                ...item,
                quantity: item.quantity || 1
            }));
            setCart(migratedCart);
        }
        if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    }, []);

    // Save to local storage whenever cart/wishlist changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existingItem = prev.find((item) => item._id === product._id);
            if (existingItem) {
                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: (item.quantity || 1) + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item._id !== productId));
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map((item) =>
                item._id === productId ? { ...item, quantity } : item
            )
        );
    };

    const addToWishlist = (product: Product) => {
        if (!wishlist.some((item) => item._id === product._id)) {
            setWishlist((prev) => [...prev, product]);
        }
    };

    const removeFromWishlist = (productId: string) => {
        setWishlist((prev) => prev.filter((item) => item._id !== productId));
    };

    const isInCart = (productId: string) => cart.some((item) => item._id === productId);
    const isInWishlist = (productId: string) => wishlist.some((item) => item._id === productId);

    return (
        <CartContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                removeFromCart,
                updateQuantity,
                addToWishlist,
                removeFromWishlist,
                isInCart,
                isInWishlist,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
