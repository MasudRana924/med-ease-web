import Link from "next/link";
import { Icon } from "@iconify/react";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export default function NotFound() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="text-center space-y-6 max-w-md">
                    <h1 className="text-6xl font-bold text-black">404</h1>
                    <h2 className="text-2xl font-bold text-black">Doctor Not Found</h2>
                    <p className="text-gray-600">
                        The doctor you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        href="/doctors"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                    >
                        <Icon icon="solar:arrow-left-linear" className="text-xl" />
                        Back to Doctors
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
