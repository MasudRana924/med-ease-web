import { ReactNode } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

interface ListingHeaderProps {
    title: string;
    subtitle?: string;
    description?: string;
    viewAllLink?: string;
    className?: string;
    children?: ReactNode; // For GridSwitcher or other controls
}

export default function ListingHeader({
    title,
    subtitle,
    description,
    viewAllLink,
    className = "",
    children
}: ListingHeaderProps) {
    return (
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 ${className}`}>
            <div className="space-y-2">
                {subtitle && (
                    <span className="text-gray-400 font-bold tracking-[0.2em] text-[10px] uppercase pl-1">
                        {subtitle}
                    </span>
                )}
                <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">
                    {title}
                </h2>
                {description && (
                    <p className="text-gray-500 max-w-2xl font-medium">
                        {description}
                    </p>
                )}
            </div>

            <div className="flex items-center gap-6">
                {children}
                {viewAllLink && (
                    <Link
                        href={viewAllLink}
                        className="flex items-center gap-2 text-black font-semibold hover:text-gray-600 transition-colors group whitespace-nowrap"
                    >
                        View All <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                )}
            </div>
        </div>
    );
}
