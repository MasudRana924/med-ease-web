"use client";

import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import Button from "../Button";

export default function Header() {
    const { user, logout, isAuthenticated } = useAuth();
    const { cart, wishlist } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
                : "bg-transparent"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-bold text-black tracking-tight">
                        Care Sync
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-10">
                    {[
                        { name: "Medicine", href: "/medicine" },
                        { name: "Nurses", href: "/nurses" },
                        { name: "Blood", href: "/blood" },
                        { name: "Doctors", href: "/doctors" },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-black font-medium hover:text-gray-600 transition-colors text-sm uppercase tracking-wide"
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-5">
                    <Link href="/cart" className="relative group">
                        <div className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                            <Icon icon="solar:cart-large-minimalistic-linear" className="text-xl text-black transition-colors" />
                        </div>
                        {cart.length > 0 && (
                            <span className="absolute top-0 right-0 h-5 w-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {cart.length}
                            </span>
                        )}
                    </Link>

                    <Link href="/wishlist" className="relative group">
                        <div className="p-2.5 rounded-full hover:bg-gray-100 transition-colors">
                            <Icon icon="solar:heart-linear" className="text-xl text-black transition-colors" />
                        </div>
                        {wishlist.length > 0 && (
                            <span className="absolute top-0 right-0 h-5 w-5 bg-black text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                                {wishlist.length}
                            </span>
                        )}
                    </Link>

                    {isAuthenticated && user ? (
                        <div className="flex items-center gap-3 pl-4 ml-2">
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer group"
                            >
                                <div className="relative w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
                                    {user.avatar?.url ? (
                                        <Image
                                            src={user.avatar.url}
                                            alt={user.name}
                                            fill
                                            className="object-cover"
                                            sizes="32px"
                                        />
                                    ) : (
                                        <Icon icon="solar:user-circle-linear" className="text-xl text-black" />
                                    )}
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <Link href="/auth/login">
                            <Button>Login</Button>
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <Icon icon={isMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="text-2xl text-black" />
                    </button>

                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white p-6 absolute w-full shadow-none h-screen z-50">
                    <nav className="flex flex-col gap-6">
                        {[
                            { name: "Medicine", href: "/medicine" },
                            { name: "Nurses", href: "/nurses" },
                            { name: "Blood", href: "/blood" },
                            { name: "Doctors", href: "/doctors" },
                        ].map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-xl font-bold text-black border-b border-gray-100 pb-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
