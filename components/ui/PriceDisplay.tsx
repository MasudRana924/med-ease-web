interface PriceDisplayProps {
    amount: number | string;
    currency?: string;
    unit?: string;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export default function PriceDisplay({
    amount,
    currency = "$",
    unit,
    size = "md",
    className = ""
}: PriceDisplayProps) {
    const sizeClasses = {
        sm: "text-lg",
        md: "text-2xl",
        lg: "text-3xl",
    };

    return (
        <div className={`flex items-baseline gap-0.5 font-bold text-black ${className}`}>
            <span className="text-sm font-medium text-gray-500">{currency}</span>
            <span className={sizeClasses[size]}>{amount}</span>
            {unit && <span className="text-xs text-gray-400 ml-1 font-normal">{unit}</span>}
        </div>
    );
}
