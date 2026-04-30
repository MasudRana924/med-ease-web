"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import Button from "@/components/Button";
import { AuthService } from "@/lib/auth/actions";
import { signupSchema, type SignupFormData } from "@/lib/auth/schemas";
import Link from "next/link";
import Image from "next/image";

export default function SignupPage() {
    const [error, setError] = useState("");
    const { login } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        mode: "onBlur", // Validate on blur for better UX
    });

    const onSubmit = async (data: SignupFormData) => {
        setError("");
        try {
            const response = await AuthService.signup({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (response.success) {
                login(response.token, response.user);
                router.push("/");
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Signup failed. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <main className="flex-1 flex w-full">
            {/* Left Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24">
                <div className="max-w-md w-full space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-black tracking-tight">
                            Create account
                        </h2>
                        <p className="text-gray-500 text-lg">
                            Please enter your details to sign up.
                        </p>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-black">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        id="name"
                                        type="text"
                                        className={`w-full pb-4 pt-2 border-b-2 focus:outline-none transition-colors bg-transparent text-xl font-medium placeholder:text-gray-300 ${errors.name
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-200 focus:border-black"
                                            }`}
                                        placeholder="John Doe"
                                        disabled={isSubmitting}
                                        {...register("name")}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-black">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        id="email"
                                        type="email"
                                        className={`w-full pb-4 pt-2 border-b-2 focus:outline-none transition-colors bg-transparent text-xl font-medium placeholder:text-gray-300 ${errors.email
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-200 focus:border-black"
                                            }`}
                                        placeholder="yourrmail.com"
                                        disabled={isSubmitting}
                                        {...register("email")}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-bold uppercase tracking-wider text-black">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type="password"
                                        className={`w-full pb-4 pt-2 border-b-2 focus:outline-none transition-colors bg-transparent text-xl font-medium placeholder:text-gray-300 ${errors.password
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-200 focus:border-black"
                                            }`}
                                        placeholder="••••••••"
                                        disabled={isSubmitting}
                                        {...register("password")}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="text-sm font-bold uppercase tracking-wider text-black">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        className={`w-full pb-4 pt-2 border-b-2 focus:outline-none transition-colors bg-transparent text-xl font-medium placeholder:text-gray-300 ${errors.confirmPassword
                                                ? "border-red-500 focus:border-red-500"
                                                : "border-gray-200 focus:border-black"
                                            }`}
                                        placeholder="••••••••"
                                        disabled={isSubmitting}
                                        {...register("confirmPassword")}
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-900 text-sm font-medium">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            className="w-full py-5 text-lg font-bold"
                        >
                            Sign Up
                        </Button>

                        <p className="text-center text-gray-500 text-sm">
                            Already have an account?{" "}
                            <Link href="/auth/login" className="font-bold text-black border-b border-gray-300 hover:border-black transition-all">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:block w-1/2 relative bg-gray-100">
                <div className="absolute inset-0 bg-black/10 z-10" />
                <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
                    alt="Medical Focus"
                    fill
                    className="object-cover grayscale"
                    priority
                />
                <div className="absolute bottom-12 left-12 right-12 z-20 text-white">
                    <blockquote className="text-3xl font-bold leading-tight mb-4">
                        "The art of medicine consists of amusing the patient while nature cures the disease."
                    </blockquote>
                    <cite className="text-lg opacity-80 not-italic">— Voltaire</cite>
                </div>
            </div>
        </main>
    );
}
