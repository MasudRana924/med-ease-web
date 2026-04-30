"use client";

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <CartProvider>{children}</CartProvider>
        </AuthProvider>
    );
}
