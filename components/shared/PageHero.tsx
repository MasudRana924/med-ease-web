"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";

interface PageHeroProps {
    title: string;
    description: string;
    image: string;
    icon?: string;
}

export default function PageHero({ title, description, image, icon }: PageHeroProps) {
    return (
        <section className="relative h-[400px] w-full overflow-hidden flex items-center mb-12">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in">
                        {icon && <Icon icon={icon} className="text-lg" />}
                        <span>Trusted Care</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight animate-slide-up">
                        {title}
                    </h1>
                    <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed animate-slide-up delay-100 italic">
                        "{description}"
                    </p>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent dark:from-gray-950" />
        </section>
    );
}
