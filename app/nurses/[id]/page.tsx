import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import Button from "@/components/Button";
import Rating from "@/components/ui/Rating";
import ReviewForm from "@/components/ReviewForm";
import { NurseService } from "@/lib/nurses/actions";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60;

interface NurseDetailsPageProps {
    params: Promise<{ id: string }>;
}

export default async function NurseDetailsPage({ params }: NurseDetailsPageProps) {
    const { id } = await params;
    const nurse = await NurseService.getById(id);

    if (!nurse) {
        notFound();
    }

    return (
        <div className="flex flex-col min-h-screen ">
            <main className="flex-1 py-8">
                {/* Back Button */}
                <div className="w-full lg:w-9/12 mx-auto px-4 md:px-6 mb-6">
                    <Link
                        href="/doctors"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors group px-4 py-2 "
                    >
                        <Icon icon="solar:alt-arrow-left-linear" className="text-xl group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </Link>
                </div>

                <div className="w-full lg:w-9/12 mx-auto px-4 md:px-6 mb-16">
                    <div className="overflow-hidden">
                        {/* Profile Section */}
                        <div className="relative px-8 md:px-12 pb-12">
                            {/* Profile Image & Action Buttons Wrapper */}
                            <div className="flex flex-col md:flex-row items-start md:items-end -mt-20 md:-mt-16 mb-6 gap-6">
                                {/* Profile Image */}
                                <div className="relative z-10 shrink-0">
                                    <div className="mt-16 relative h-40 w-40 md:h-48 md:w-48 rounded-full border-[6px] border-white shadow-lg bg-white overflow-hidden">
                                        {nurse.images && nurse.images[0] ? (
                                            <Image
                                                src={nurse.images[0].url}
                                                alt={nurse.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-100">
                                                <Icon icon="solar:user-speak-linear" className="text-6xl text-zinc-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-gray-500 text-white p-1.5 rounded-full border-4 border-white" title="Verified Nurse">
                                        <Icon icon="solar:check-circle-bold" className="text-lg" />
                                    </div>
                                </div>

                                {/* Name & Basic Info - Desktop Alignment */}
                                <div className="flex-1 pt-2 md:pb-4 min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div>
                                            <h1 className="text-3xl md:text-4xl font-bold text-black mb-1 truncate">
                                                {nurse.name}
                                            </h1>
                                            <p className="text-lg text-zinc-500 font-medium flex items-center gap-2">
                                                {nurse.degree}
                                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                                                {nurse.work}
                                            </p>
                                        </div>

                                        {/* Action Buttons (Desktop) */}
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="primary"
                                                icon="solar:calendar-linear"
                                                className="py-3 px-6 rounded-full font-bold shadow-lg shadow-gray-500/20 bg-gray-600 hover:bg-gray-700 border-gray-600"
                                            >
                                                Book Now
                                            </Button>
                                            <button className="h-12 w-12 rounded-full border border-black/10 flex items-center justify-center hover:bg-zinc-50 transition-colors text-black">
                                                <Icon icon="solar:chat-line-linear" className="text-xl" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-8">
                                {/* Left Side - Info Card */}
                                <div className="lg:col-span-1 space-y-6">
                                    {/* Stats Card */}
                                    <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 space-y-6">
                                        <div>
                                            <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Service Fee</p>
                                            <p className="text-3xl font-bold text-black">${nurse.fees}</p>
                                        </div>

                                        <div className="h-px w-full bg-zinc-200"></div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Location</p>
                                                <p className="text-lg font-bold text-black truncate" title={nurse.location}>{nurse.location || "N/A"}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-wider text-zinc-400 font-bold mb-1">Rating</p>
                                                <div className="flex items-center gap-1 font-bold text-black">
                                                    <span>{nurse.ratings || "5.0"}</span>
                                                    <Icon icon="solar:star-bold" className="text-yellow-400 text-sm" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info */}
                                    <div className="bg-white rounded-3xl border border-black/5 p-6 space-y-5">
                                        <h3 className="font-bold text-black text-lg">Contact Info</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                                                    <Icon icon="solar:phone-linear" className="text-xl" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-xs text-zinc-500 font-semibold uppercase">Phone</p>
                                                    <p className="text-black font-medium truncate">{nurse.phone}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                                                    <Icon icon="solar:letter-linear" className="text-xl" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-xs text-zinc-500 font-semibold uppercase">Email</p>
                                                    <p className="text-black font-medium truncate">{nurse.email}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center shrink-0">
                                                    <Icon icon="solar:map-point-linear" className="text-xl" />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-xs text-zinc-500 font-semibold uppercase">Details</p>
                                                    <p className="text-black font-medium truncate">{nurse.location}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Images (Gallery) */}
                                    {nurse.images && nurse.images.length > 1 && (
                                        <div className="bg-white rounded-3xl border border-black/5 p-6 space-y-4">
                                            <h3 className="font-bold text-black text-lg">Photos</h3>
                                            <div className="grid grid-cols-3 gap-2">
                                                {nurse.images.slice(1, 7).map((image, index) => (
                                                    <div key={image._id || index} className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100">
                                                        <Image src={image.url} alt="Gallery" fill className="object-cover hover:scale-110 transition-transform duration-500" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Right Side - About & Reviews */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* About Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-black">About Nurse {nurse.name}</h3>
                                        <div className="text-zinc-600 leading-relaxed space-y-4">
                                            {nurse.description ? (
                                                <p>{nurse.description}</p>
                                            ) : (
                                                <p>
                                                    {nurse.name} is a dedicated nursing professional specializing in {nurse.degree}.
                                                    Currently working at {nurse.work}, providing compassionate care and support to patients.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Reviews Section */}
                                    <div>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-xl font-bold text-black">Patient Reviews</h3>
                                            <span className="px-3 py-1 bg-zinc-100 rounded-full text-sm font-semibold text-zinc-600">
                                                {nurse.reviews?.length || 0} Reviews
                                            </span>
                                        </div>

                                        {nurse.reviews && nurse.reviews.length > 0 ? (
                                            <div className="space-y-4 mb-8">
                                                {nurse.reviews.map((review) => (
                                                    <div key={review._id} className="bg-zinc-50 rounded-2xl p-6 transition-colors hover:bg-zinc-100/80">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div className="flex items-center gap-3">
                                                                <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold">
                                                                    {review.name.charAt(0)}
                                                                </div>
                                                                <div>
                                                                    <h4 className="font-bold text-black text-sm">{review.name}</h4>
                                                                    <Rating rating={review.rating} size="sm" showNumber={false} />
                                                                </div>
                                                            </div>
                                                            {nurse.createdAt && (
                                                                <span className="text-xs text-zinc-400">
                                                                    {new Date(nurse.createdAt).toLocaleDateString()}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {review.comment && (
                                                            <p className="text-zinc-600 text-sm pl-13">{review.comment}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="bg-zinc-50 rounded-2xl p-8 text-center border border-dashed border-zinc-200 mb-8">
                                                <p className="text-zinc-400">No reviews yet for this nurse.</p>
                                            </div>
                                        )}

                                        <ReviewForm entityId={nurse._id} entityType="nurse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
