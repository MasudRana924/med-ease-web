import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    className?: string;
    containerClassName?: string;
    id?: string;
    spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

export default function Section({
    children,
    className = "",
    containerClassName = "",
    id,
    spacing = "md"
}: SectionProps) {
    const spacingClasses = {
        none: "py-0",
        sm: "py-8 md:py-12",
        md: "py-16 md:py-24",
        lg: "py-24 md:py-32",
        xl: "py-32 md:py-48",
    };

    return (
        <section id={id} className={`${spacingClasses[spacing]} ${className}`}>
            <div className={`container mx-auto px-4 md:px-6 ${containerClassName}`}>
                {children}
            </div>
        </section>
    );
}
