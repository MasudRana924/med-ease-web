"use client";

import { ListSkeleton } from "@/components/shared/Skeleton";

export default function Loading() {
    return (
        <div className="pb-20">
            {/* Hero Skeleton */}
            <div className="relative h-[400px] w-full bg-gray-50 animate-pulse mb-12">
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                    <div className="h-4 bg-gray-200 rounded-full w-24" />
                    <div className="h-12 bg-gray-200 rounded-full w-64" />
                    <div className="h-4 bg-gray-200 rounded-full w-96" />
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Title Skeleton */}
                <div className="flex items-center justify-between w-full border-b border-gray-100 pb-4 mb-8">
                    <div>
                        <div className="h-4 bg-gray-100 rounded-full w-24 mb-2" />
                        <div className="h-8 bg-gray-100 rounded-full w-48" />
                    </div>
                    <div className="h-10 bg-gray-100 rounded-full w-32" />
                </div>

                <ListSkeleton />
            </div>
        </div>
    );
}
