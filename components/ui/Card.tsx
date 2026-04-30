import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
}

export default function Card({ children, className = "", hover = false }: CardProps) {
    return (
        <div className={`bg-white rounded-3xl overflow-hidden transition-all duration-500 ${hover ? 'hover:shadow-xl' : ''} ${className}`}>
            {children}
        </div>
    );
}
