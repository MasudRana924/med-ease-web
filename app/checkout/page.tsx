"use client";

import AuthGuard from "@/components/guards/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Icon } from "@iconify/react";
import Link from "next/link";

import { useState, useEffect } from "react";

export default function CheckoutPage() {
    const { user } = useAuth();
    const { cart } = useCart();

    const [shippingInfo, setShippingInfo] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        address: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setShippingInfo(prev => ({
                ...prev,
                name: prev.name || user.name || "",
                email: prev.email || user.email || "",
                phone: prev.phone || user.phone || ""
            }));
        }
    }, [user]);

    const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    const handlePayment = async () => {
        try {
            setLoading(true);

            // 🔹 STEP 1: CREATE TOKEN
            const tokenRes = await fetch(
                'https://taka-x-payment-gateway.onrender.com/api/version/1.00-beta/checkout/create/token',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        username: 'takatestUser',
                        password: 'test',
                    },
                    body: JSON.stringify({
                        app_key: 'takamr924',
                        appsecret: 'takamr16115924',
                    }),
                }
            );

            const tokenData = await tokenRes.json();
            const token = tokenData.token;

            console.log('TOKEN:', token);

            // 🔹 STEP 2: CREATE PAYMENT
            const paymentAmount = Math.round(total * 1.05);
            console.log('CART TOTAL:', total);
            console.log('PAYMENT AMOUNT (with tax):', paymentAmount);

            const paymentRes = await fetch(
                'https://taka-x-payment-gateway.onrender.com/api/version/1.00-beta/checkout/create/payment',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token,
                        app_key: 'takamr924',
                    },
                    body: JSON.stringify({
                        amount: paymentAmount, // Use paymentAmount variable
                        intent: 'sale',
                        currency: 'BDT',
                        callbackurl: 'https://your-callback-url.com',
                    }),
                }
            );

            const paymentData = await paymentRes.json();

            console.log('PAYMENT:', paymentData);

            // 🔹 STEP 3: REDIRECT TO PAYMENT URL
            if (paymentData.paymentURL) {
                window.location.href = paymentData.paymentURL;
            } else {
                alert('Payment URL not found');
            }

        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthGuard>
            <div className="flex flex-col min-h-screen bg-white text-black">
                <main className="flex-1 container mx-auto px-4 py-8 md:py-16 max-w-6xl">
                    <div className="w-full mb-6">
                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 text-zinc-500 hover:text-black transition-colors group px-4 py-2 "
                        >
                            <Icon icon="solar:alt-arrow-left-linear" className="text-xl group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back</span>
                        </Link>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">Checkout</h1>
                            <p className="text-gray-500">Complete your order by providing shipping details.</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-medium">
                            <Icon icon="solar:bag-check-bold" className="text-lg" />
                            <span>{cart.length} Items</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-24">
                        {/* Shipping Details */}
                        <div className="lg:col-span-2 space-y-12">
                            <section>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm">1</div>
                                    Shipping Information
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Full Name</label>
                                        <input
                                            type="text"
                                            value={shippingInfo.name}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Email Address</label>
                                        <input
                                            type="email"
                                            value={shippingInfo.email}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={shippingInfo.phone}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all"
                                            placeholder="+1 (555) 000-0000"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Delivery Address</label>
                                        <textarea
                                            rows={3}
                                            value={shippingInfo.address}
                                            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all resize-none"
                                            placeholder="123 Medical Avenue, NY"
                                        ></textarea>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-sm">2</div>
                                    Payment Method
                                </h3>
                                <div className="p-6 border-2 border-black rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Icon icon="solar:card-bold" className="text-2xl" />
                                        <div>
                                            <p className="font-bold">Cash on Delivery</p>
                                            <p className="text-sm text-gray-500">Pay when you receive your order</p>
                                        </div>
                                    </div>
                                    <Icon icon="solar:check-circle-bold" className="text-2xl" />
                                </div>
                            </section>
                        </div>

                        {/* Order Summary */}
                        <div className="relative">
                            <div className="sticky top-32 p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                                <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                    {cart.map((item, idx) => (
                                        <div key={`${item._id}-${idx}`} className="flex justify-between items-start gap-4 text-sm">
                                            <div className="flex-1">
                                                <p className="font-bold">{item.name}</p>
                                                <p className="text-gray-500">Qty: {item.quantity || 1}</p>
                                            </div>
                                            <span className="font-mono font-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-6 border-t border-gray-200">
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Subtotal</span>
                                        <span className="font-mono">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 text-sm">
                                        <span>Tax (5%)</span>
                                        <span className="font-mono">${(total * 0.05).toFixed(2)}</span>
                                    </div>
                                    <div className="pt-4 flex justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="font-mono">${(total * 1.05).toFixed(2)}</span>
                                    </div>
                                </div>

                                <button
                                    className="w-full mt-8 py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handlePayment}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            Confirm Order <Icon icon="solar:arrow-right-up-linear" />
                                        </>
                                    )}
                                </button>
                                <p className="text-xs text-center text-gray-400 mt-4">
                                    By clicking "Confirm Order", you agree to our Terms of Service.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </AuthGuard>
    );
}
