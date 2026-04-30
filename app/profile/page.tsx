
"use client";

import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/guards/AuthGuard";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Button from "@/components/Button";
import { useState } from "react";
import Link from "next/link";

type Tab = 'profile' | 'orders' | 'consultations' | 'prescriptions';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('profile');

    const sidebarItems = [
        { id: 'profile', label: 'My Profile', icon: 'solar:user-circle-bold' },
        { id: 'orders', label: 'Order History', icon: 'solar:box-minimalistic-point-bold' },
        { id: 'consultations', label: 'Consultation History', icon: 'solar:stethoscope-bold' },
        { id: 'prescriptions', label: 'Prescription History', icon: 'solar:document-medical-bold' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm animate-fade-in">
                        <h2 className="text-2xl font-bold mb-8">Personal Information</h2>

                        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 pb-8 border-b border-gray-100">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center border-4 border-white shadow-lg">
                                {user?.avatar?.url ? (
                                    <Image
                                        src={user.avatar.url}
                                        alt={user?.name || "User"}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <Icon icon="solar:user-circle-bold" className="text-6xl text-gray-300" />
                                )}
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-3xl font-bold text-black mb-1">{user?.name}</h3>
                                <p className="text-gray-500 mb-3">{user?.email}</p>
                                <span className="inline-flex items-center gap-1 px-3 py-1 bg-black text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                    {user?.role || "User"}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                                <p className="text-lg font-medium text-black border-b border-gray-100 pb-2">{user?.name}</p>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Email Address</label>
                                <p className="text-lg font-medium text-black border-b border-gray-100 pb-2">{user?.email}</p>
                            </div>

                            {user?.phone && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Phone Number</label>
                                    <p className="text-lg font-medium text-black border-b border-gray-100 pb-2">{user.phone}</p>
                                </div>
                            )}

                            {user?.createdAt && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400">Member Since</label>
                                    <p className="text-lg font-medium text-black border-b border-gray-100 pb-2">
                                        {new Date(user.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6">Order History</h2>
                        {[1, 2, 3].map((order) => (
                            <div key={order} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-mono font-bold text-lg">#ORD-2024-00{order}</span>
                                            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${order === 1 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                                                {order === 1 ? 'Pending' : 'Delivered'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500">Placed on Oct {10 + order}, 2024</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">${(order * 45.50).toFixed(2)}</p>
                                        <p className="text-xs text-gray-400 font-bold uppercase">{order + 2} Items</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].slice(0, order).map((i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs">
                                                <Icon icon="solar:pill-linear" className="text-gray-400" />
                                            </div>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="h-9 text-xs px-4">View Details</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'consultations':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6">Consultation History</h2>
                        {[1, 2].map((consult) => (
                            <div key={consult} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                        <Icon icon="solar:user-id-linear" className="text-3xl text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-bold text-lg">Dr. Sarah Smith</h4>
                                                <p className="text-sm text-gray-500">Cardiologist • Video Consultation</p>
                                            </div>
                                            <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-bold">Completed</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                                            <div className="flex items-center gap-1">
                                                <Icon icon="solar:calendar-linear" />
                                                <span>Oct {12 + consult}, 2024</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Icon icon="solar:clock-circle-linear" />
                                                <span>10:30 AM</span>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex gap-2">
                                            <Button variant="outline" className="h-9 text-xs flex-1">View Prescription</Button>
                                            <Button className="h-9 text-xs flex-1 bg-black text-white">Book Again</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'prescriptions':
                return (
                    <div className="space-y-6 animate-fade-in">
                        <h2 className="text-2xl font-bold mb-6">My Prescriptions</h2>
                        <div className="bg-gray-50 rounded-2xl p-8 text-center">
                            <Icon icon="solar:document-medical-linear" className="text-6xl text-gray-300 mx-auto mb-4" />
                            <h3 className="font-bold text-lg mb-2">No Prescriptions Yet</h3>
                            <p className="text-gray-500 text-sm mb-6">Consult with a doctor to get a prescription.</p>
                            <Link href="/doctors">
                                <Button>Find a Doctor</Button>
                            </Link>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AuthGuard>
            <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
                <div className="w-full mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors group px-4 py-2 "
                    >
                        <Icon icon="solar:alt-arrow-left-linear" className="text-xl group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <div className="space-y-1">
                                    {sidebarItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id as Tab)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm ${activeTab === item.id
                                                ? 'text-black font-bold'
                                                : 'text-gray-600 font-medium hover:bg-white hover:text-black'
                                                }`}
                                        >
                                            <Icon icon={item.icon} className="text-xl" />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200/50">
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium text-sm"
                                    >
                                        <Icon icon="solar:logout-2-linear" className="text-xl" />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </AuthGuard>
    );
}
