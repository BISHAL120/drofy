"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            number: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        try {
            console.log("Form Values :", values);
            setIsLoading(false);
            router.refresh();
        } catch (error) {
            setIsLoading(false);
            toast.error("Invalid Credentials");
            console.log("Error :", error);
        }
    }

    return (
        <div className="flex flex-col min-h-[calc(100vh-72px)] bg-gray-50 border">
            <div className="flex-grow flex items-center justify-center  p-4">
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <div className="flex justify-center mb-6">
                        <div className="p-2 bg-purple-100 rounded-lg">
                            <Image
                                src="/assets/logo.webp"
                                alt="Logo"
                                width={350}
                                height={150}
                            />
                        </div>
                    </div>

                    <h1 className="text-3xl font-semibold text-center text-orange-600 mb-6">
                        রিস্টক রিসেলার-প্লেস
                    </h1>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Label htmlFor="mobile" className="text-sm text-gray-600">মোবাইল নং *</Label>
                                                <Input
                                                    {...field}
                                                    id="mobile"
                                                    placeholder="01700000000"
                                                    type="number"
                                                    autoCapitalize="none"
                                                    autoComplete="mobile"
                                                    autoCorrect="off"
                                                    disabled={isLoading}
                                                    className="mt-1"
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div>
                                                <Label htmlFor="password" className="text-sm text-gray-600">পাসওয়ার্ড *</Label>
                                                <div className="relative mt-1">
                                                    <Input
                                                        {...field}
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        disabled={isLoading}
                                                        placeholder="••••••••"
                                                    />

                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <Eye className="h-4 w-4" />
                                                        ) : (
                                                            <EyeOff className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                লগইন করুন
                            </Button>

                            <div className="flex justify-center mt-4">
                                <Link
                                    href="/register"
                                    className="flex items-center justify-center gap-1 text-md font-medium text-orange-600 hover:underline"
                                >
                                    <span>
                                        রেজিস্ট্রেশন করুন
                                    </span>
                                    <ArrowRightCircle size={18} />
                                </Link>
                            </div>
                            <div className="flex justify-center mt-4">
                                <Link
                                    href="/reset-password"
                                    className="text-sm text-green-600 hover:underline"
                                >
                                    পাসওয়ার্ড ভুলে গেছেন?
                                </Link>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}