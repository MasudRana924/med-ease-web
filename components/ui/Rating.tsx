import { Icon } from "@iconify/react";

interface RatingProps {
    rating: number;
    numOfReviews?: number;
    size?: "sm" | "md" | "lg";
    showNumber?: boolean;
    className?: string;
}

export default function Rating({ 
    rating, 
    numOfReviews, 
    size = "md", 
    showNumber = true,
    className = "" 
}: RatingProps) {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg"
    };

    const starSize = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-xl"
    };

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            {showNumber && (
                <span className={`font-bold text-black ${sizeClasses[size]}`}>
                    {rating.toFixed(1)}
                </span>
            )}
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => {
                    if (i < fullStars) {
                        return <Icon key={i} icon="solar:star-bold" className={`${starSize[size]} text-black`} />;
                    } else if (i === fullStars && hasHalfStar) {
                        return <Icon key={i} icon="solar:star-bold" className={`${starSize[size]} text-black opacity-50`} />;
                    } else {
                        return <Icon key={i} icon="solar:star-linear" className={`${starSize[size]} text-gray-300`} />;
                    }
                })}
            </div>
            {numOfReviews !== undefined && (
                <span className={`text-gray-500 ${sizeClasses[size]}`}>
                    ({numOfReviews} {numOfReviews === 1 ? 'review' : 'reviews'})
                </span>
            )}
        </div>
    );
}
