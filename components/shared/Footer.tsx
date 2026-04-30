"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-black text-gray-400 py-16 border-t border-gray-900">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:medical-kit-linear" className="text-white" />
                            Our Services
                        </h3>
                        <ul className="space-y-4">
                            {["Find Doctors", "Order Medicine", "Book Nurses", "Call Ambulance", "Health Packages", "Lab Tests"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-white transition-colors text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Payment Options */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:card-2-linear" className="text-white" />
                            Payment Options
                        </h3>
                        <div className="flex gap-4">
                            <div className="bg-white p-2 rounded w-12 h-8 flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                <Icon icon="logos:visa" width="32" />
                            </div>
                            <div className="bg-white p-2 rounded w-12 h-8 flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                <Icon icon="logos:mastercard" width="24" />
                            </div>
                            <div className="bg-white p-2 rounded w-12 h-8 flex items-center justify-center grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all">
                                <Icon icon="logos:paypal" width="20" />
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:help-outline-linear" className="text-white" />
                            24/7 Support
                        </h3>
                        <p className="text-sm leading-relaxed mb-6">
                            Emergency medical assistance available 24/7. Our dedicated team is always ready to help.
                        </p>
                        <div className="flex items-start gap-3">
                            <Icon icon="solar:map-point-linear" className="text-white text-xl mt-1" />
                            <div>
                                <h4 className="text-white font-semibold">Main Center</h4>
                                <p className="text-sm text-gray-500">123 Medical Avenue</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                            <Icon icon="solar:phone-calling-linear" className="text-white" />
                            Contact Us
                        </h3>
                        <div className="space-y-4">
                            <Link href="tel:1-800-HealthBridge" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white hover:text-black transition-colors group">
                                <Icon icon="solar:phone-linear" className="text-white group-hover:text-black transition-colors" />
                                <span className="text-sm">1-800-Care Sync</span>
                            </Link>
                            <Link href="mailto:support@Care Sync.com" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white hover:text-black transition-colors group">
                                <Icon icon="solar:letter-linear" className="text-white group-hover:text-black transition-colors" />
                                <span className="text-sm">support@Care Sync.com</span>
                            </Link>
                        </div>

                        <div className="flex gap-4 mt-8">
                            {["solar:facebook-linear", "solar:instagram-linear", "solar:linkedin-linear"].map(icon => (
                                <Link key={icon} href="#" className="h-10 w-10 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <Icon icon={icon} className="text-xl" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <p>© 2026 Care Sync. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
