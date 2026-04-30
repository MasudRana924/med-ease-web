"use client";

import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Button from "@/components/Button";
import PageHero from "@/components/shared/PageHero";

// Mock Data
const donors = [
    { id: 1, name: "City Blood Bank", location: "Dhanmondi, Dhaka", group: "A+", availability: "High", contact: "01711223344", type: "Bank" },
    { id: 2, name: "Red Crescent Society", location: "Moghbazar, Dhaka", group: "O-", availability: "Critical", contact: "01811223344", type: "Bank" },
    { id: 3, name: "Rahim Ahmed", location: "Uttara, Dhaka", group: "B+", availability: "Available", contact: "01911223344", type: "Donor" },
    { id: 4, name: "Quantum Lab", location: "Shantinagar, Dhaka", group: "AB+", availability: "Medium", contact: "01611223344", type: "Bank" },
    { id: 5, name: "Sarah Khan", location: "Banani, Dhaka", group: "O+", availability: "Available", contact: "01511223344", type: "Donor" },
    { id: 6, name: "Police Blood Bank", location: "Rajarbagh, Dhaka", group: "All", availability: "High", contact: "01311223344", type: "Bank" },
    { id: 7, name: "Karim Uddin", location: "Mirpur, Dhaka", group: "A-", availability: "Unavailable", contact: "01411223344", type: "Donor" },
    { id: 8, name: "Square Hospital", location: "Panthapath, Dhaka", group: "All", availability: "High", contact: "01700000000", type: "Bank" },
];

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function BloodPage() {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredDonors = donors.filter(donor => {
        const matchGroup = selectedGroup ? (donor.group === selectedGroup || donor.group === "All") : true;
        const matchSearch = donor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donor.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchGroup && matchSearch;
    });

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <PageHero
                title="Gifting Life Through Blood"
                description="Join our network of donors and banks to ensure every patient gets the lifeline they need at the right time."
                image="/images/blood-hero.png"
                icon="solar:heart-bold"
            />

            <main className="flex-1 container mx-auto px-4 md:px-6 pb-20">
                {/* Search & Filters Section */}
                <div className="relative w-full max-w-4xl mx-auto -mt-24 z-20 mb-20">
                    <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 -m-4" />
                    <div className="relative bg-white rounded-xl shadow-xl p-4 flex flex-col gap-6">
                        {/* Blood Group Selection */}
                        <div className="w-full">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 block pl-2">Filter by Blood Group</label>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => setSelectedGroup("")}
                                    className={`h-9 px-5 rounded-lg text-xs font-bold transition-all duration-300 ${selectedGroup === ""
                                        ? "bg-black text-white shadow-lg shadow-black/20"
                                        : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                        }`}
                                >
                                    ALL GROUPS
                                </button>
                                {bloodGroups.map(bg => (
                                    <button
                                        key={bg}
                                        onClick={() => setSelectedGroup(selectedGroup === bg ? "" : bg)}
                                        className={`h-9 w-12 rounded-lg text-xs font-bold transition-all duration-300 ${selectedGroup === bg
                                            ? "bg-black text-white shadow-lg shadow-black/20"
                                            : "bg-gray-50 text-gray-500 hover:bg-gray-100"
                                            }`}
                                    >
                                        {bg}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-gray-100 w-full" />

                        {/* Search Input */}
                        <div className="relative group">
                            <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            <input
                                type="text"
                                placeholder="Search by name or location (e.g. Dhanmondi, Dhaka)..."
                                className="w-full pl-12 pr-6 py-4 rounded-xl bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-black transition-all font-medium text-black placeholder:text-gray-400"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Results Header */}
                <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-6">
                    <div>
                        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">Lifeline Network</p>
                        <h2 className="text-2xl font-bold text-black">{filteredDonors.length} Donors & Banks Available</h2>
                    </div>
                </div>

                {/* Donors Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredDonors.map(donor => (
                        <div key={donor.id} className="group bg-white rounded-2xl p-4 flex flex-col transition-all duration-300 border border-transparent hover:border-black/5 hover:shadow-xl">

                            {/* Card Header Illustration/Icon container */}
                            <div className="relative rounded-xl bg-gray-50 overflow-hidden h-48 w-full mb-4 flex items-center justify-center">
                                <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-lg text-sm font-bold shadow-sm">
                                    {donor.group}
                                </div>
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1.5 shadow-sm">
                                    <div className={`h-2 w-2 rounded-full ${donor.availability === "High" ? "bg-green-500" :
                                        donor.availability === "Critical" ? "bg-red-500 animate-pulse" : "bg-gray-400"
                                        }`} />
                                    <span className="text-[10px] font-bold text-black uppercase tracking-wider">{donor.availability}</span>
                                </div>
                            </div>

                            <div className="flex-1 flex flex-col">
                                <div className="space-y-1">
                                    {/* <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{donor.type === "Bank" ? "Certified Blood Bank" : "Voluntary Donor"}</p> */}
                                    <h3 className="text-lg font-bold text-black line-clamp-1 group-hover:underline cursor-pointer">{donor.name}</h3>

                                    {/* Contact Info under name as requested */}
                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-600 mt-1">
                                        <Icon icon="solar:phone-bold" className="text-gray-400" />
                                        {donor.contact}
                                    </div>

                                    <div className="flex items-start gap-1.5 text-xs text-gray-400 mt-2">
                                        <Icon icon="solar:map-point-linear" className="text-sm shrink-0" />
                                        <span className="line-clamp-1">{donor.location}</span>
                                    </div>
                                </div>

                                {/* <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50 mt-4">
                                    <button className="w-full py-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 text-sm font-bold shadow-lg shadow-black/10">
                                        <Icon icon="solar:letter-linear" className="text-lg" /> Request Blood
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* CTA Section */}
            <section className="py-24 bg-white border-t border-gray-100 text-center">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-8">
                        <Icon icon="solar:heart-pulse-bold" className="text-4xl text-black" />
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-black">Be a Hero. Save a Life.</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Your contribution can make a world of difference. Join our community of donors today and help us create a healthier tomorrow.
                    </p>
                    <button className="px-10 py-5 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10">
                        Register as a Donor
                    </button>
                </div>
            </section>
        </div>
    );
}
