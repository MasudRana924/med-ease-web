"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { MedicineService } from "@/lib/medicine/actions";
import { Medicine } from "@/types";
import Button from "@/components/Button";

import GridSwitcher from "@/components/shared/GridSwitcher";

function SearchableMedicineList() {
    const router = useRouter(); // Import useRouter from next/navigation
    const searchParams = useSearchParams();
    const nameParam = searchParams.get("name") || "";
    const pageParam = Number(searchParams.get("page")) || 1;
    const limitParam = Number(searchParams.get("limit")) || 10;
    const initialSearch = nameParam || searchParams.get("search") || "";
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [columns, setColumns] = useState(4);
    const { addToCart, addToWishlist, isInWishlist } = useCart();

    // Effect to update URL when searchTerm changes (Debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (searchTerm) {
                params.set("name", searchTerm);
            } else {
                params.delete("name");
            }
            router.push(`?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm, router, searchParams]);

    // Effect to fetch data when URL params change
    useEffect(() => {
        const fetchMedicines = async () => {
            setLoading(true);
            try {
                const data = await MedicineService.getAll({
                    search: nameParam,
                    page: pageParam,
                    limit: limitParam
                });
                setMedicines(data);
            } catch (error) {
                console.error("Failed to fetch medicines", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicines();
    }, [nameParam, pageParam, limitParam]);

    const getGridColsClass = () => {
        switch (columns) {
            case 1: return "grid-cols-1";
            case 2: return "grid-cols-1 sm:grid-cols-2";
            case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
            default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-12 flex flex-col items-center">
                <h1 className="text-4xl font-bold mb-6 text-black tracking-tight">Find Your Medicine</h1>
                <div className="relative w-full max-w-xl mb-8">
                    <Icon icon="lucide:search" className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                    <input
                        type="text"
                        placeholder="Search for medicines..."
                        className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white shadow-sm text-black placeholder:text-gray-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between w-full border-b border-gray-100 pb-4">
                    <p className="text-gray-500 font-medium">{medicines.length} items found</p>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider hidden sm:block">View:</span>
                        <GridSwitcher currentColumns={columns} onChange={setColumns} />
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 flex flex-col items-center gap-2">
                    <Icon icon="eos-icons:loading" className="text-4xl text-black animate-spin" />
                    <p className="text-gray-500">Searching medicines...</p>
                </div>
            ) : medicines.length > 0 ? (
                <div className={`grid ${getGridColsClass()} gap-8 transition-all duration-500`}>
                    {medicines.map((medicine) => (
                        <div key={medicine._id} className={`bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 border border-transparent hover:border-black/5 hover:shadow-xl ${columns === 1 ? 'sm:flex-row sm:items-center sm:gap-8' : ''}`}>
                            <Link href={`/medicine/${medicine._id}`} className={`relative rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center p-6 cursor-pointer ${columns === 1 ? 'h-48 w-full sm:w-64 mb-0' : 'h-56 w-full mb-4'}`}>
                                {/* Wishlist Button - Prevent navigation when clicking wishlist */}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' });
                                    }}
                                    className={`absolute top-3 right-3 p-2 rounded-full z-10 transition-colors ${isInWishlist(medicine._id) ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                                >
                                    <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                                </button>
                                {medicine.image ? (
                                    <Image
                                        src={medicine.image.url}
                                        alt={medicine.name}
                                        fill
                                        className="object-contain mix-blend-multiply"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                ) : (
                                    <Icon icon="medical-icon:i-medicines" className="text-6xl text-gray-200" />
                                )}
                            </Link>

                            <div className={`flex flex-col flex-grow ${columns === 1 ? 'justify-center' : ''}`}>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{medicine.category || "General"}</p>
                                    <Link href={`/medicine/${medicine._id}`}>
                                        <h3 className={`font-bold text-black line-clamp-1 hover:underline cursor-pointer ${columns === 1 ? 'text-2xl' : 'text-lg'}`}>{medicine.name}</h3>
                                    </Link>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">{medicine.company}</p>
                                    {columns === 1 && (
                                        <p className="text-gray-500 text-sm mt-4 line-clamp-2 max-w-2xl">
                                            {medicine.description || "High-quality medicine provided by trustable manufacturers to ensure your health and well-being."}
                                        </p>
                                    )}
                                </div>

                                <div className={`flex items-center justify-between pt-4 ${columns === 1 ? 'mt-4 border-t border-gray-50' : 'mt-2'}`}>
                                    <div className="flex items-baseline gap-0.5">
                                        <span className="text-sm font-medium text-gray-500">$</span>
                                        <span className={`${columns === 1 ? 'text-3xl' : 'text-2xl'} font-bold text-black`}>{medicine.price}</span>
                                    </div>
                                    <button
                                        onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                        className={`${columns === 1 ? 'px-8 py-3' : 'px-6 py-2'} rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10`}
                                    >
                                        <Icon icon="solar:cart-plus-linear" className="text-lg" /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl">
                    <Icon icon="fluent:box-search-24-regular" className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-black">No medicines found</h3>
                    <p className="text-gray-500">Try adjusting your search terms</p>
                </div>
            )}
        </div>
    );
}

export default function MedicinePage() {
    return (
        <Suspense fallback={<div className="text-center p-10 text-gray-500">Loading Search...</div>}>
            <SearchableMedicineList />
        </Suspense>
    );
}
