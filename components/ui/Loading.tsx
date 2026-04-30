import { Icon } from "@iconify/react";

interface LoadingProps {
    size?: "sm" | "md" | "lg";
    text?: string;
    className?: string;
}

export default function Loading({ size = "md", text, className = "" }: LoadingProps) {
    const sizeClasses = {
        sm: "h-4 w-4",
        md: "h-8 w-8",
        lg: "h-12 w-12"
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
            <Icon 
                icon="eos-icons:loading" 
                className={`${sizeClasses[size]} animate-spin text-black`} 
            />
            {text && <p className="text-gray-600 font-medium">{text}</p>}
        </div>
    );
}
