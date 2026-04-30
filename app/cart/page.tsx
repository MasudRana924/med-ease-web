"use client";
import { useCart } from "@/context/CartContext";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity } = useCart();

    const hasItems = cart && cart.length > 0;
    const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    return (
        <div className="container mx-auto px-4 py-8 md:py-16 max-w-6xl">
            <div className="w-full mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors group px-4 py-2 "
                >
                    <Icon icon="solar:alt-arrow-left-linear" className="text-xl group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Back</span>
                </Link>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Shopping Cart</h1>
                    <p className="text-gray-500">Review your selected items before checkout.</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-medium">
                    <Icon icon="solar:bag-check-bold" className="text-lg" />
                    <span>{cart.length} Items</span>
                </div>
            </div>

            {!hasItems ? (
                <div className="text-center py-32 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Icon icon="solar:cart-large-minimalistic-linear" className="text-4xl text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything yet. Explore our medicines and healthcare products.</p>
                    <Link href="/medicine">
                        <Button>Start Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                    {/* Cart Items List */}
                    <div className="lg:col-span-2 space-y-8">
                        {cart.map((item, index) => (
                            <div key={`${item._id}-${index}`} className="group flex flex-col sm:flex-row gap-6 items-start sm:items-center py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors p-4 rounded-2xl">
                                <div className="relative h-24 w-24 bg-gray-50 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain mix-blend-multiply"
                                            sizes="96px"
                                        />
                                    ) : (
                                        <Icon icon="solar:pill-linear" className="text-3xl text-gray-400" />
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-bold truncate pr-4">{item.name}</h3>
                                            <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="p-2 text-gray-300 hover:text-black transition-colors"
                                            title="Remove item"
                                        >
                                            <Icon icon="solar:trash-bin-trash-linear" className="text-xl" />
                                        </button>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => updateQuantity(item._id, (item.quantity || 1) - 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                                                disabled={(item.quantity || 1) <= 1}
                                                aria-label="Decrease quantity"
                                            >
                                                <Icon icon="lucide:minus" className="text-sm" />
                                            </button>
                                            <div className="w-12 text-center">
                                                <span className="font-mono font-bold text-lg leading-none">
                                                    {item.quantity || 1}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => updateQuantity(item._id, (item.quantity || 1) + 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors"
                                                aria-label="Increase quantity"
                                            >
                                                <Icon icon="lucide:plus" className="text-sm" />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Subtotal</p>
                                            <span className="font-mono text-2xl font-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="relative">
                        <div className="sticky top-32 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-8 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-mono">${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (5%)</span>
                                    <span className="font-mono">${(total * 0.05).toFixed(2)}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200 flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span className="font-mono">${(total * 1.05).toFixed(2)}</span>
                                </div>
                            </div>

                            <Link href="/checkout" className="block w-full">
                                <Button className="w-full text-base py-4 bg-black text-white hover:bg-gray-800 rounded-xl transition-all">Proceed to Checkout</Button>
                            </Link>

                            <p className="text-xs text-center text-gray-400 mt-4">
                                Secure Checkout by Med-Ease
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
