"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import NursesList from "@/components/NursesList";
import { NurseService } from "@/lib/nurses/actions";
import { Nurse } from "@/types";

function SearchableNursesList() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse initial state from URL
    const initialName = searchParams.get("name") || "";
    const initialWork = searchParams.get("work") || "";

    const [nurses, setNurses] = useState<Nurse[]>([]);
    const [loading, setLoading] = useState(true);

    // State for Search Inputs
    const [name, setName] = useState(initialName);
    const [work, setWork] = useState(initialWork);

    // Sync state with URL (Debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (name) params.set("name", name);
            else params.delete("name");

            if (work) params.set("work", work);
            else params.delete("work");

            const newSearch = params.toString();
            // Only push if the query string has effectively changed
            if (newSearch !== searchParams.toString()) {
                router.push(`?${newSearch}`, { scroll: false });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [name, work, router, searchParams]);

    // Fetch data when URL Params change
    useEffect(() => {
        const fetchNurses = async () => {
            setLoading(true);
            try {
                const data = await NurseService.getAll({
                    name: searchParams.get("name") || "",
                    work: searchParams.get("work") || "",
                    page: Number(searchParams.get("page")) || 1,
                    limit: Number(searchParams.get("limit")) || 10
                });
                setNurses(data);
            } catch (error) {
                console.error("Failed to fetch nurses", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNurses();
    }, [searchParams]);

    return (
        <>
            <section className="bg-primary/5 py-12 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Dedicated Nurses</h1>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4 mb-8">
                    Professional nursing care services available at your convenience.
                </p>

                {/* Search Inputs */}
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Icon icon="solar:user-rounded-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Search by name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                            />
                        </div>
                        <div className="relative flex-1">
                            <Icon icon="solar:hospital-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                            <input
                                type="text"
                                placeholder="Search by hospital/work..."
                                value={work}
                                onChange={(e) => setWork(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="text-center py-20 flex flex-col items-center gap-2">
                    <Icon icon="eos-icons:loading" className="text-4xl text-black animate-spin" />
                    <p className="text-gray-500">Searching nurses...</p>
                </div>
            ) : (
                <NursesList nurses={nurses} />
            )}
        </>
    );
}

export default function NursesPage() {
    return (
        <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
            <SearchableNursesList />
        </Suspense>
    );
}
