"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { Nurse } from "@/types";
import GridSwitcher from "./shared/GridSwitcher";
import { ListSkeleton } from "./shared/Skeleton";

interface NursesListProps {
    nurses: Nurse[];
    showView?: boolean;
    title?: string;
    subtitle?: string;
    viewAllLink?: string;
    loading?: boolean;
}

export default function NursesList({
    nurses,
    showView = true,
    title,
    subtitle,
    viewAllLink,
    loading = false
}: NursesListProps) {
    const [columns, setColumns] = useState(4);

    if (loading) {
        return (
            <div id="nurses" className="w-full">
                <div className="flex items-center justify-between w-full pb-4 mb-8">
                    <div className="space-y-3">
                        <div className="h-3 bg-gray-100 rounded-full w-24 animate-pulse" />
                        <div className="h-8 bg-gray-100 rounded-full w-64 animate-pulse" />
                    </div>
                </div>
                <ListSkeleton key="loading" columns={columns} count={8} />
            </div>
        );
    }

    if (!nurses || nurses.length === 0) return null;

    const getGridColsClass = () => {
        switch (columns) {
            case 1: return "grid-cols-1";
            case 2: return "grid-cols-1 sm:grid-cols-2";
            case 3: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
            case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
            default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
        }
    };

    const content = (
        <div id="nurses" className="w-full">
            {(showView || title) && (
                <div className="flex items-center justify-between w-full  pb-4 mb-8">
                    <div>
                        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">{subtitle || "Health Care"}</p>
                        <h2 className="text-2xl md:text-4xl font-bold text-black tracking-tight">{title || `${nurses.length} Nurses Available`}</h2>
                    </div>
                    {(showView || viewAllLink) && (
                        <div className="flex items-center gap-6">
                            {showView && (
                                <div className="hidden sm:flex items-center gap-4">
                                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">GridView:</span>
                                    <GridSwitcher currentColumns={columns} onChange={setColumns} />
                                </div>
                            )}
                            {viewAllLink && (
                                <Link
                                    href={viewAllLink}
                                    className="hidden md:flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors group"
                                >
                                    View All <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className={`grid ${getGridColsClass()} gap-8 transition-all duration-500`}>
                {nurses.map((nurse) => (
                    <div key={nurse._id} className={`bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 hover:shadow-xl ${columns === 1 ? 'sm:flex-row sm:items-center sm:gap-8' : ''}`}>
                        <Link href={`/nurses/${nurse._id}`} className={`relative rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer ${columns === 1 ? 'h-64 w-full sm:w-80 mb-0' : 'h-64 w-full mb-4'}`}>
                            {nurse.images && nurse.images[0] ? (
                                <Image
                                    src={nurse.images[0].url}
                                    alt={nurse.name}
                                    fill
                                    className="object-cover transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                            ) : (
                                <Icon icon="solar:user-speak-linear" className="text-6xl text-gray-200" />
                            )}
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                <Icon icon="solar:star-bold" className="text-black text-xs" />
                                <span className="text-xs font-bold text-black">{nurse.ratings || "5.0"}</span>
                            </div>
                        </Link>

                        <div className={`flex flex-col flex-grow ${columns === 1 ? 'justify-center' : ''}`}>
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{nurse.degree || "Nursing Professional"}</p>
                                <Link href={`/nurses/${nurse._id}`}>
                                    <h3 className={`font-bold text-black line-clamp-1 hover:underline cursor-pointer ${columns === 1 ? 'text-2xl' : 'text-lg'}`}>{nurse.name}</h3>
                                </Link>
                                <p className="text-xs text-gray-400 uppercase tracking-wide">{nurse.work}</p>
                                {columns === 1 && (
                                    <p className="text-gray-500 text-sm mt-4 line-clamp-2 max-w-2xl">
                                        Experienced nursing professional dedicated to providing compassionate care and support to patients. Specialized in {nurse.work} with a focus on patient well-being.
                                    </p>
                                )}
                            </div>

                            <div className={`flex items-center justify-between pt-4 ${columns === 1 ? 'mt-4 border-t border-gray-50' : 'mt-2'}`}>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-sm font-medium text-gray-500">$</span>
                                    <span className={`${columns === 1 ? 'text-3xl' : 'text-2xl'} font-bold text-black`}>{nurse.fees}</span>
                                    <span className="text-xs text-gray-400 ml-1">/ visit</span>
                                </div>
                                <Link href={`/nurses/${nurse._id}`}>
                                    <button className={`${columns === 1 ? 'px-8 py-3' : 'px-6 py-2'} rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-black/10`}>
                                        <Icon icon="solar:calendar-linear" className="text-lg" /> Book Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {viewAllLink && (
                <div className="mt-12 text-center md:hidden">
                    <Link
                        href={viewAllLink}
                        className="inline-flex items-center gap-2 text-black font-semibold border-b border-black pb-0.5"
                    >
                        View All <Icon icon="solar:arrow-right-linear" />
                    </Link>
                </div>
            )}
        </div>
    );

    if (!showView && title) {
        return (
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    {content}
                </div>
            </section>
        );
    }

    return content;
}
