"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Medicine } from "@/types";

interface MedicineListProps {
    medicines: Medicine[];
}

export default function MedicineList({ medicines }: MedicineListProps) {
    const { addToCart, addToWishlist, isInCart, isInWishlist } = useCart();

    if (!medicines || medicines.length === 0) return null;

    return (
        <section className="py-24 bg-white">
            <div className="w-full lg:w-9/12 mx-auto px-4 md:px-6">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-2">
                        <span className="text-gray-500 font-bold tracking-[0.2em] text-xs uppercase pl-1">Online Pharmacy</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">Featured Medicines</h2>
                    </div>
                    <Link
                        href="/medicine"
                        className="hidden md:flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors group"
                    >
                        Browse Store <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {medicines.map((medicine) => (
                        <div key={medicine._id} className="group flex flex-col">
                            {/* Image Container */}
                            <div className="relative h-[280px] w-full rounded-2xl bg-gray-50 mb-6 flex items-center justify-center p-8 transition-transform duration-500 group-hover:-translate-y-1">

                                {/* Wishlist */}
                                <button
                                    onClick={() => addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                    className={`absolute top-4 right-4 z-20 h-8 w-8 flex items-center justify-center rounded-full transition-all duration-200 ${isInWishlist(medicine._id) ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                                >
                                    <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                                </button>

                                {/* Badge */}
                                {medicine.type && (
                                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black border border-black/5">
                                        {medicine.type}
                                    </div>
                                )}

                                {medicine.image ? (
                                    <Image
                                        src={medicine.image.url}
                                        alt={medicine.name}
                                        fill
                                        className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    />
                                ) : (
                                    <Icon icon="solar:medical-kit-linear" className="text-8xl text-gray-200" />
                                )}
                            </div>

                            <div className="flex-1 flex flex-col">
                                <h3 className="text-lg font-bold text-black leading-tight mb-1"><Link href={`/medicine/${medicine._id}`}>{medicine.name}</Link></h3>
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-4">{medicine.company}</p>

                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="text-sm font-medium text-gray-500">$</span>
                                        <span className="text-2xl font-bold text-black">{medicine.price}</span>
                                    </div>

                                    <button
                                        onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                        disabled={isInCart(medicine._id)}
                                        className={`h-10 px-6 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${isInCart(medicine._id)
                                            ? 'bg-black text-white'
                                            : 'bg-white border border-black text-black hover:bg-black hover:text-white'
                                            }`}
                                    >
                                        {isInCart(medicine._id) ? "Added" : "Add"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 text-center md:hidden">
                    <Link
                        href="/medicine"
                        className="inline-flex items-center gap-2 text-black font-semibold border-b border-black pb-0.5"
                    >
                        Browse Store <Icon icon="solar:arrow-right-linear" />
                    </Link>
                </div>

            </div>
        </section>
    );
}
