import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: "default" | "dark" | "outline" | "red" | "blue" | "green";
    className?: string;
}

export default function Badge({
    children,
    variant = "default",
    className = ""
}: BadgeProps) {
    const variants = {
        default: "bg-gray-100 text-gray-500",
        dark: "bg-black text-white",
        outline: "border border-black/5 text-gray-400",
        red: "bg-red-50 text-red-600",
        blue: "bg-blue-50 text-blue-600",
        green: "bg-green-50 text-green-600",
    };

    return (
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
