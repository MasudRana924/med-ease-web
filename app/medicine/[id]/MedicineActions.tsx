"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import { Medicine } from "@/types";

export default function MedicineActions({ medicine }: { medicine: Medicine }) {
    const router = useRouter();
    const { addToCart, addToWishlist, isInWishlist } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = () => {
        setIsAdding(true);
        addToCart({ ...medicine, image: medicine.image?.url || "", category: medicine.type || "Medicine" });
        setTimeout(() => setIsAdding(false), 500);
    };

    const handleBuyNow = () => {
        addToCart({ ...medicine, image: medicine.image?.url || "", category: medicine.type || "Medicine" });
        router.push("/checkout");
    };

    const inWishlist = isInWishlist(medicine._id);

    return (
        <div className="flex flex-col gap-4 pt-4 border-t border-zinc-100">
            {/* Quantity Selector could go here if needed, keeping it simple for now as per design "Add to Cart" usually implies 1, or we can add +/- */}

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                >
                    Buy Now <Icon icon="solar:card-send-linear" />
                </button>
                <div className="flex gap-3">
                    <button
                        onClick={handleAddToCart}
                        className="flex-1 sm:flex-none bg-zinc-100 text-black px-6 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {isAdding ? "Added" : "Add to Cart"} <Icon icon="solar:cart-plus-linear" />
                    </button>
                    <button
                        onClick={() => addToWishlist({ ...medicine, image: medicine.image?.url || "", category: medicine.type || "Medicine" })}
                        className={`px-6 py-4 rounded-xl border-2 transition-all flex items-center justify-center ${inWishlist
                            ? "border-red-500 bg-red-50 text-red-500"
                            : "border-zinc-200 text-zinc-400 hover:border-black hover:text-black"
                            }`}
                    >
                        <Icon icon={inWishlist ? "solar:heart-bold" : "solar:heart-linear"} className="text-2xl" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mt-2">
                <Icon icon="solar:verified-check-bold" />
                <span>In Stock & Ready to Ship</span>
            </div>
        </div>
    );
}
