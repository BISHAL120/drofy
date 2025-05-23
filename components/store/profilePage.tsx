"use client";

import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { User } from "lucide-react";

// Define the form schema with Zod
const profileSchema = z.object({
    phone: z.string().min(11, "মোবাইল নম্বর কমপক্ষে ১১ ডিজিট হতে হবে"),
    name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
    shopName: z.string().min(2, "দোকানের নাম কমপক্ষে ২ অক্ষর হতে হবে"),
    email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal('')),
    district: z.string().min(1, "জেলা নির্বাচন করুন"),
    address: z.string().min(5, "ঠিকানা বিস্তারিত লিখুন")
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
    // Default values for the form
    const defaultValues: ProfileFormValues = {
        phone: "01704667915",
        name: "Redwanul Islam Rimon",
        shopName: "ReStock BD",
        email: "",
        district: "Faridpur",
        address: "Bhanga, Faridpur, Dhaka, Bangladesh"
    };

    // Initialize the form
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues,
    });

    // Handle form submission
    const onSubmit = (data: ProfileFormValues) => {
        console.log("Updated profile data:", data);
        toast.success("পরিবর্তন সফল হয়েছে");
    };

    return (
        <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg border-t shadow-2xl shadow-orange-300 my-8">
            <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-2 text-orange-500">
                    <User size={24} />
                    <h2 className="text-xl font-semibold">পার্সোনাল প্রোফাইল</h2>
                </div>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center">
                                    মোবাইল নং <span className="text-red-500 ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} disabled className="bg-gray-100" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center">
                                    আপনার নাম <span className="text-red-500 ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shopName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center">
                                    শপ নাম / ব্যবসায়িক প্রতিষ্ঠান নাম <span className="text-red-500 ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>ইমেইল (ঐচ্ছিক)</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center">
                                    জেলা <span className="text-red-500 ml-1">*</span>
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="জেলা নির্বাচন করুন" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Dhaka">ঢাকা</SelectItem>
                                        <SelectItem value="Faridpur">ফরিদপুর</SelectItem>
                                        <SelectItem value="Chittagong">চট্টগ্রাম</SelectItem>
                                        <SelectItem value="Khulna">খুলনা</SelectItem>
                                        <SelectItem value="Rajshahi">রাজশাহী</SelectItem>
                                        <SelectItem value="Sylhet">সিলেট</SelectItem>
                                        <SelectItem value="Barisal">বরিশাল</SelectItem>
                                        <SelectItem value="Rangpur">রংপুর</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center">
                                    ঠিকানা <span className="text-red-500 ml-1">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        className="min-h-[100px]"
                                        placeholder="আপনার বিস্তারিত ঠিকানা লিখুন"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            পরিবর্তন করুন
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProfilePage;