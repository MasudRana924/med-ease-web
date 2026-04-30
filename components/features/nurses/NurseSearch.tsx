"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

export default function NurseSearch({
    initialName = "",
    initialWork = "",
    variant = "hero"
}: {
    initialName?: string;
    initialWork?: string;
    variant?: "hero" | "minimal";
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [name, setName] = useState(initialName);
    const [work, setWork] = useState(initialWork);

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (name) params.set("name", name);
            else params.delete("name");

            if (work) params.set("work", work);
            else params.delete("work");

            const newSearch = params.toString();
            if (newSearch !== searchParams.toString()) {
                router.push(`?${newSearch}`, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [name, work, router, searchParams]);

    if (variant === "minimal") {
        return (
            <div className="relative w-full max-w-xs">
                <Icon icon="solar:user-rounded-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                <input
                    type="text"
                    placeholder="Search nurses..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-100 focus:outline-none focus:ring-2 focus:ring-black transition-all bg-gray-50/50 text-black placeholder:text-gray-400 text-sm font-medium"
                />
            </div>
        );
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto -mt-24 z-20 mb-20">
            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 -m-4" />
            <div className="relative flex flex-col md:flex-row gap-4 p-2 bg-white rounded-xl shadow-xl">
                <div className="relative flex-1">
                    <Icon icon="solar:user-rounded-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-4 rounded-lg border-none focus:ring-0 text-black placeholder:text-gray-400 font-medium"
                    />
                </div>
                <div className="hidden md:block w-px h-8 bg-gray-100 self-center" />
                <div className="relative flex-1">
                    <Icon icon="solar:hospital-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                    <input
                        type="text"
                        placeholder="Search by hospital/work..."
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                        className="w-full pl-10 pr-4 py-4 rounded-lg border-none focus:ring-0 text-black placeholder:text-gray-400 font-medium"
                    />
                </div>
            </div>
        </div>
    );
}
