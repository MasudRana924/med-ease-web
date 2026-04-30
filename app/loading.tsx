import { ListSkeleton } from "@/components/shared/Skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="h-48 w-full bg-gray-100 rounded-3xl mb-8 animate-pulse" />
            <ListSkeleton count={8} />
        </div>
    );
}
