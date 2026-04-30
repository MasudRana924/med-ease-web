"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { Nurse } from "@/types";
import GridSwitcher from "@/components/shared/GridSwitcher";
import { ListSkeleton } from "@/components/shared/Skeleton";
import ItemCard from "@/components/shared/ItemCard";
import NurseSearch from "./NurseSearch";
import ListingHeader from "@/components/shared/ListingHeader";
import { Section } from "@/components/ui";

interface NursesListProps {
    nurses: Nurse[];
    showView?: boolean;
    title?: string;
    subtitle?: string;
    viewAllLink?: string;
    loading?: boolean;
    showSearch?: boolean;
    initialName?: string;
    initialWork?: string;
}

export default function NursesList({
    nurses,
    showView = true,
    title,
    subtitle,
    viewAllLink,
    loading = false,
    showSearch = false,
    initialName = "",
    initialWork = ""
}: NursesListProps) {
    const [columns, setColumns] = useState(4);

    if (loading) {
        return (
            <div id="nurses" className="w-full">
                <ListingHeader title={title || "Nurses"} subtitle={subtitle || "Health Care"} />
                <ListSkeleton key="loading" columns={columns} count={8} />
            </div>
        );
    }

    if (!nurses || nurses.length === 0) {
        if (title) return null; // If it's a section, hide it
        return (
            <div className="text-center py-20 bg-gray-50 rounded-3xl w-full">
                <Icon icon="solar:user-block-linear" className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black">No nurses found</h3>
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
        <div id="nurses-list" className="w-full">
            {(showView || title) && (
                <ListingHeader
                    title={title || `${nurses.length} Nurses Available`}
                    subtitle={subtitle || "Health Care"}
                    viewAllLink={viewAllLink}
                >
                    <div className="flex items-center gap-4">
                        {showSearch && (
                            <div className="flex-grow max-w-xs">
                                <NurseSearch variant="minimal" initialName={initialName} initialWork={initialWork} />
                            </div>
                        )}
                        {showView && (
                            <div className="hidden sm:flex items-center gap-4">
                                <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">GridView:</span>
                                <GridSwitcher currentColumns={columns} onChange={setColumns} />
                            </div>
                        )}
                    </div>
                </ListingHeader>
            )}

            <div className={`grid ${getGridColsClass()} gap-8 transition-all duration-500`}>
                {nurses.map((nurse) => (
                    <ItemCard
                        key={nurse._id}
                        id={nurse._id}
                        title={nurse.name}
                        subtitle={nurse.work}
                        tag={nurse.degree || "Nursing Professional"}
                        image={nurse.images && nurse.images[0]?.url}
                        placeholderIcon="solar:user-speak-linear"
                        href={`/nurses/${nurse._id}`}
                        price={nurse.fees}
                        priceUnit="/ visit"
                        rating={nurse.ratings || "5.0"}
                        horizontal={columns === 1}
                        description={`Experienced nursing professional dedicated to providing compassionate care. Specialized in ${nurse.work} with a focus on patient well-being.`}
                        footerAction={
                            <button className={`${columns === 1 ? 'px-8 py-3' : 'px-6 py-2'} rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10`}>
                                <Icon icon="solar:calendar-linear" className="text-lg" /> Book Now
                            </button>
                        }
                    />
                ))}
            </div>
        </div>
    );

    if (!showView && title) {
        return (
            <Section>
                {listContent}
            </Section>
        );
    }

    return listContent;
}
