"use client";
import { useCart } from "@/context/CartContext";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";

export default function WishlistPage() {
    const { wishlist, removeFromWishlist, addToCart, isInCart } = useCart();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white flex items-center gap-3">
                <Icon icon="lucide:heart" className="text-red-500" /> Wishlist
            </h1>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-3xl dark:bg-gray-900/50">
                    <Icon icon="lucide:heart-crack" className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your wishlist is empty</h2>
                    <Link href="/medicine" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                        Explore Medicines
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div key={item._id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow group relative flex flex-col">
                            <div className="relative h-48 w-full rounded-xl bg-gray-50 dark:bg-gray-700 mb-4 overflow-hidden flex items-center justify-center">
                                <button
                                    onClick={() => removeFromWishlist(item._id)}
                                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors z-10 backdrop-blur-sm"
                                >
                                    <Icon icon="lucide:x" />
                                </button>
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                ) : (
                                    <Icon icon="medical-icon:i-medicines" className="text-6xl text-gray-300" />
                                )}
                            </div>

                            <div className="space-y-2 flex-grow">
                                <p className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded w-fit">{item.category || "General"}</p>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                            </div>

                            <div className="flex items-center justify-between pt-4 mt-2 border-t border-dashed border-gray-200 dark:border-gray-700">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">${item.price}</span>
                                <button
                                    onClick={() => addToCart(item)}
                                    disabled={isInCart(item._id)}
                                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm font-medium disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-gray-600"
                                >
                                    <Icon icon="lucide:shopping-cart" /> {isInCart(item._id) ? "Added" : "Add"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
