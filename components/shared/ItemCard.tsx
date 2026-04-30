"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Card, Badge, PriceDisplay } from "@/components/ui";

interface ItemCardProps {
    id: string;
    title: string;
    subtitle?: string;
    tag?: string;
    image?: string;
    placeholderIcon?: string;
    href: string;
    price?: number | string;
    priceUnit?: string;
    rating?: number | string;
    footerAction?: ReactNode;
    topAction?: ReactNode;
    horizontal?: boolean;
    description?: string;
}

export default function ItemCard({
    title,
    subtitle,
    tag,
    image,
    placeholderIcon = "solar:box-linear",
    href,
    price,
    priceUnit = "/ visit",
    rating,
    footerAction,
    topAction,
    horizontal = false,
    description
}: ItemCardProps) {
    return (
        <Card hover className={`p-4 flex flex-col ${horizontal ? 'sm:flex-row sm:items-center sm:gap-8' : ''}`}>
            {/* Image Container */}
            <Link
                href={href}
                className={`relative rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center cursor-pointer group/img ${horizontal ? 'h-64 w-full sm:w-80 mb-0' : 'h-64 w-full mb-4'
                    }`}
            >
                {topAction && (
                    <div className="absolute top-3 right-3 z-10">
                        {topAction}
                    </div>
                )}

                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, 30vw"
                    />
                ) : (
                    <Icon icon={placeholderIcon} className="text-6xl text-gray-200" />
                )}

                {rating && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Icon icon="solar:star-bold" className="text-black text-xs" />
                        <span className="text-xs font-bold text-black">{rating}</span>
                    </div>
                )}
            </Link>

            {/* Content Area */}
            <div className={`flex flex-col flex-grow ${horizontal ? 'justify-center' : ''}`}>
                <div className="space-y-1">
                    {tag && <Badge variant="outline" className="mb-1">{tag}</Badge>}

                    <Link href={href}>
                        <h3 className={`font-bold text-black line-clamp-1 hover:underline cursor-pointer transition-colors ${horizontal ? 'text-2xl' : 'text-lg'
                            }`}>
                            {title}
                        </h3>
                    </Link>

                    {subtitle && (
                        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            {subtitle}
                        </p>
                    )}

                    {horizontal && description && (
                        <p className="text-gray-500 text-sm mt-4 line-clamp-2 max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>

                <div className={`flex items-center justify-between pt-4 ${horizontal ? 'mt-4' : 'mt-auto pt-4 mt-4'
                    }`}>
                    {price !== undefined && (
                        <PriceDisplay amount={price} unit={priceUnit} size={horizontal ? "lg" : "md"} />
                    )}

                    <div className="shrink-0">
                        {footerAction}
                    </div>
                </div>
            </div>
        </Card>
    );
}
