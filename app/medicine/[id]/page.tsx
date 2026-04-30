import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { MedicineService } from "@/lib/medicine/actions";
import MedicineActions from "./MedicineActions";

export const revalidate = 60;

interface MedicineDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function MedicineDetailsPage({ params }: MedicineDetailsPageProps) {
    const { id } = await params;
    const medicine = await MedicineService.getById(id);

    if (!medicine) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen ">
            <main className="flex-1 py-8 md:py-12">
                <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    {/* Breadcrumb & Back */}
                    <div className="mb-8">
                        <Link
                            href="/medicine"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors group px-4 py-2"
                        >
                            <Icon icon="solar:alt-arrow-left-linear" className="text-xl group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Medicines</span>
                        </Link>
                    </div>

                    <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                        {/* Left Column: Image */}
                        <div className="relative">
                            <div className="relative aspect-square w-full overflow-hidden flex items-center justify-center p-8 group">
                                {medicine.image ? (
                                    <Image
                                        src={medicine.image.url}
                                        alt={medicine.name}
                                        fill
                                        className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        priority
                                    />
                                ) : (
                                    <Icon icon="medical-icon:i-medicines" className="text-8xl text-zinc-200" />
                                )}
                            </div>
                        </div>

                        {/* Right Column: Details */}
                        <div className="flex flex-col justify-center space-y-8">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider">
                                        {medicine.type || "Medicine"}
                                    </span>
                                    {medicine.commonName && (
                                        <span className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                                            Generic: {medicine.commonName}
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-bold text-black tracking-tight mb-2">
                                    {medicine.name}
                                </h1>
                                <p className="text-lg text-zinc-500 font-medium">
                                    By <span className="text-black font-semibold">{medicine.company}</span>
                                </p>
                            </div>

                            <div className="flex items-end gap-2 border-b border-zinc-100 pb-8">
                                <span className="text-5xl font-bold text-black">${medicine.price}</span>
                                <span className="text-zinc-400 font-medium mb-1.5">/ per unit</span>
                            </div>

                            <div className="space-y-6">
                                <p className="text-zinc-600 leading-relaxed">
                                    {medicine.description || `Effective ${medicine.type} medication produced by ${medicine.company}. Please consult your physician for dosage and administration instructions.`}
                                </p>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Company</p>
                                        <p className="font-semibold text-black">{medicine.company}</p>
                                    </div>
                                    <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                                        <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Type</p>
                                        <p className="font-semibold text-black">{medicine.type}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Actions (Client Component) */}
                            <MedicineActions medicine={medicine} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
