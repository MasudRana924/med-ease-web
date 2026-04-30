"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-red-50 p-6 rounded-full mb-6">
                <Icon icon="solar:danger-triangle-bold" className="text-4xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                We apologize for the inconvenience. Please try again or contact support if the problem persists.
            </p>
            <button
                onClick={reset}
                className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            >
                Try again
            </button>
        </div>
    );
}
