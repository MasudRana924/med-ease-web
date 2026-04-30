"use client";

export default function CardSkeleton({ horizontal = false }: { horizontal?: boolean }) {
    if (horizontal) {
        return (
            <div className="bg-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:gap-8 border border-black/5 animate-pulse">
                {/* Image Skeleton */}
                <div className="h-64 w-full sm:w-80 rounded-xl bg-gray-100 flex-shrink-0" />

                {/* Content Skeleton */}
                <div className="flex flex-col flex-grow justify-center space-y-4 py-4">
                    <div className="space-y-2">
                        <div className="h-3 bg-gray-100 rounded-full w-24" />
                        <div className="h-8 bg-gray-100 rounded-full w-3/4" />
                        <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                    </div>
                    {/* Description lines */}
                    <div className="space-y-2 hidden sm:block">
                        <div className="h-3 bg-gray-50 rounded-full w-full" />
                        <div className="h-3 bg-gray-50 rounded-full w-5/6" />
                    </div>
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="h-10 bg-gray-100 rounded-full w-32" />
                        <div className="h-12 bg-gray-100 rounded-full w-40" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-4 flex flex-col border border-black/5 animate-pulse">
            {/* Image Skeleton */}
            <div className="rounded-xl bg-gray-100 h-64 w-full mb-4" />

            {/* Content Skeleton */}
            <div className="flex flex-col flex-grow space-y-3">
                <div className="space-y-2">
                    {/* Category Tag */}
                    <div className="h-3 bg-gray-100 rounded-full w-1/4" />
                    {/* Title */}
                    <div className="h-6 bg-gray-100 rounded-full w-3/4" />
                    {/* Subtitle/Work */}
                    <div className="h-4 bg-gray-100 rounded-full w-1/2" />
                </div>

                {/* Footer Section */}
                <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 mt-4">
                    {/* Price */}
                    <div className="h-8 bg-gray-100 rounded-full w-1/4" />
                    {/* Button */}
                    <div className="h-10 bg-gray-100 rounded-full w-1/3" />
                </div>
            </div>
        </div>
    );
}

export function ListSkeleton({ count = 8, columns = 4 }: { count?: number; columns?: number }) {
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
        <div className={`grid ${getGridColsClass()} gap-8`}>
            {Array.from({ length: count }).map((_, i) => (
                <CardSkeleton key={i} horizontal={columns === 1} />
            ))}
        </div>
    );
}
