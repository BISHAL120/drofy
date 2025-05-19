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
import { loginSchema as registerSchema } from "@/lib/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronsRight, Loader2 } from "lucide-react";
import Image from "next/image";
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            number: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerSchema>) {
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
        <div className="flex flex-col min-h-[calc(100vh-72px)]">
            <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
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
                        রিসেলার রেজিস্ট্রেশন
                    </h1>
                    <p className="text-sm text-gray-600 text-center mb-6">
                        আপনার মোবাইলে একটি ওটিপি কোড পাঠানো হবে, কোড টি বসিয়ে রেজিস্ট্রেশন সম্পূর্ণ করুন।
                    </p>

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

                            <Button
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                                disabled={isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                ওটিপি পাঠান <ChevronsRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
}