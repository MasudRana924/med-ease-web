"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useCart } from "@/context/CartContext";
import { Medicine } from "@/types";
import { Section } from "@/components/ui";
import GridSwitcher from "@/components/shared/GridSwitcher";
import ListingHeader from "@/components/shared/ListingHeader";
import ItemCard from "@/components/shared/ItemCard";
import { ListSkeleton } from "@/components/shared/Skeleton";
import MedicineSearch from "./MedicineSearch";

interface MedicineListProps {
    medicines: Medicine[];
    showView?: boolean;
    title?: string;
    subtitle?: string;
    viewAllLink?: string;
    loading?: boolean;
    showSearch?: boolean;
    initialSearch?: string;
}

export default function MedicineList({
    medicines,
    showView = true,
    title,
    subtitle,
    viewAllLink,
    loading = false,
    showSearch = false,
    initialSearch = ""
}: MedicineListProps) {
    const { addToCart, addToWishlist, isInWishlist } = useCart();
    const [columns, setColumns] = useState(4);

    if (loading) {
        return (
            <Section>
                <ListingHeader title={title || "Medicines"} subtitle={subtitle || "Catalogue"} />
                <ListSkeleton key="loading" columns={columns} count={8} />
            </Section>
        );
    }

    if (!medicines || medicines.length === 0) {
        if (title) return null; // If it's a section, hide it
        return (
            <div className="text-center py-20 bg-gray-50 rounded-3xl w-full">
                <Icon icon="fluent:box-search-24-regular" className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black">No medicines found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
            </div>
        );
    }

    const getGridColsClass = () => {
        switch (columns) {
            case 1: return "grid-cols-1";
            case 2: return "grid-cols-1 sm:grid-cols-2";
            case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
            default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        }
    };

    const listContent = (
        <div className="w-full">
            {(showView || title) && (
                <ListingHeader
                    title={title || `${medicines.length} Medicines Available`}
                    subtitle={subtitle || "Catalogue"}
                    viewAllLink={viewAllLink}
                >
                    <div className="flex items-center gap-4">
                        {showSearch && (
                            <div className="flex-grow max-w-xs">
                                <MedicineSearch variant="minimal" initialSearch={initialSearch} />
                            </div>
                        )}
                        {showView && (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider hidden sm:block">View:</span>
                                <GridSwitcher currentColumns={columns} onChange={setColumns} />
                            </div>
                        )}
                    </div>
                </ListingHeader>
            )}

            <div className={`grid ${getGridColsClass()} gap-8 transition-all duration-500`}>
                {medicines.map((medicine) => (
                    <ItemCard
                        key={medicine._id}
                        id={medicine._id}
                        title={medicine.name}
                        subtitle={medicine.company}
                        tag={medicine.category || "General"}
                        image={medicine.image?.url}
                        placeholderIcon="solar:medical-kit-linear"
                        href={`/medicine/${medicine._id}`}
                        price={medicine.price}
                        priceUnit=""
                        horizontal={columns === 1}
                        description={medicine.description}
                        topAction={
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToWishlist({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' });
                                }}
                                className={`p-2 rounded-full transition-colors bg-white/80 backdrop-blur-sm ${isInWishlist(medicine._id) ? 'text-black' : 'text-gray-300 hover:text-black'}`}
                            >
                                <Icon icon={isInWishlist(medicine._id) ? "solar:heart-bold" : "solar:heart-linear"} className="text-xl" />
                            </button>
                        }
                        footerAction={
                            <button
                                onClick={() => addToCart({ ...medicine, image: medicine.image.url, category: medicine.category || 'Medicine' })}
                                className={`${columns === 1 ? 'px-8 py-3' : 'px-6 py-2'} rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10`}
                            >
                                <Icon icon="solar:cart-plus-linear" className="text-lg" /> Add to Cart
                            </button>
                        }
                    />
                ))}
            </div>
        </div>
    );

    if (!showView && title) {
        return (
            <Section id="medicines">
                {listContent}
            </Section>
        );
    }

    return listContent;
}
