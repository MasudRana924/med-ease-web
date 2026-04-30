"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/Button";
import { Icon } from "@iconify/react";

interface ReviewFormProps {
    entityId: string;
    entityType: 'doctor' | 'nurse';
}

export default function ReviewForm({ entityId, entityType }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState("");
    const [name, setName] = useState(""); // Simplified for now, ideally from auth
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (rating === 0) return;

        setIsSubmitting(true);

        try {
            // Import dynamically to avoid server/client issues if necessary, but here it is a client component
            const { DoctorService } = await import("@/lib/doctors/actions");
            const success = await DoctorService.addReview(entityId, {
                rating,
                comment,
                name
            });

            if (success) {
                setIsSuccess(true);
                setComment("");
                setName("");
                setRating(0);
                setTimeout(() => setIsSuccess(false), 3000);
            } else {
                alert("Failed to submit review. Please try again.");
            }
        } catch (error) {
            console.error("Failed to submit review", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-3xl border border-black/5 p-6 md:p-8 space-y-6">
            <h3 className="text-lg md:text-xl font-bold text-black">Write a Review</h3>

            {isSuccess ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3">
                    <Icon icon="solar:check-circle-bold" className="text-xl" />
                    <p className="font-medium">Review submitted successfully!</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Icon
                                        icon="solar:star-bold"
                                        className={`text-2xl md:text-3xl transition-colors ${star <= (hoverRating || rating)
                                            ? "text-yellow-400"
                                            : "text-gray-200"
                                            }`}
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-sm font-medium text-gray-500 self-center">
                                {rating > 0 ? `${rating}.0` : "Select a rating"}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Your Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="comment" className="block text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Your Review</label>
                            <textarea
                                id="comment"
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all resize-none placeholder:text-gray-400"
                                placeholder="Share your experience..."
                                required
                            ></textarea>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || rating === 0}
                        className="w-full md:w-auto"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <Icon icon="line-md:loading-loop" /> Submitting...
                            </span>
                        ) : (
                            "Submit Review"
                        )}
                    </Button>
                </form>
            )}
        </div>
    );
}
