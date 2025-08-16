"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { TriangleAlert, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the form schema with Zod
const profileSchema = z.object({
  phone: z.string().min(11, "মোবাইল নম্বর কমপক্ষে ১১ ডিজিট হতে হবে"),
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  companyName: z.string().min(2, "দোকানের নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
  district: z.string().min(1, "জেলা নির্বাচন করুন"),
  address: z.string().min(5, "ঠিকানা বিস্তারিত লিখুন"),
});

type ProfileFormValues = {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  district: string | null;
  address: string | null;
  companyName: string | null;
} | null;

const ProfilePage = ({ initialData }: { initialData: ProfileFormValues }) => {
  const [loading, setLoading] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      phone: initialData?.phone || "",
      name: initialData?.name || "",
      companyName: initialData?.companyName || "",
      email: initialData?.email || "",
      district: initialData?.district || "",
      address: initialData?.address || "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    setLoading(true);
    toast.loading(
      process.env.LANGUAGE === 'bn'
        ? "পরিবর্তন হচ্ছে..."
        : "Updating profile..."
    );
    axios
      .patch("/api/store/profile", { id: initialData?.id, ...data })
      .then((res) => {
        setLoading(false);
        toast.dismiss();
        toast.success(res.data.message, {
          duration: 5000,
        });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.dismiss();
        toast.error(error.response.data.message, {
          duration: 5000,
          icon: <TriangleAlert className="h-4 w-4" />, // Replace with your desired icon component
          style: {
            borderRadius: "6px",
            fontSize: "16px",
            background: "red",
            color: "white",
            border: "1px solid #ff0000",
          },
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg border-t shadow-2xl shadow-orange-300 my-8">
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-2 text-orange-500">
          <User size={24} />
          <h2 className="text-xl font-semibold">
            {process.env.LANGUAGE === 'bn'
              ? "পার্সোনাল প্রোফাইল"
              : "Personal Profile"}
          </h2>
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
                  {process.env.LANGUAGE === 'bn'
                    ? "মোবাইল নং"
                    : "Mobile Number"} <span className="text-red-500 ml-1">*</span>
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
                  {process.env.LANGUAGE === 'bn'
                    ? "আপনার নাম"
                    : "Your Name"} <span className="text-red-500 ml-1">*</span>
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center">
                  {process.env.LANGUAGE === 'bn'
                    ? "শপ নাম / ব্যবসায়িক প্রতিষ্ঠান নাম"
                    : "Shop Name / Business Institution Name"} <span className="text-red-500 ml-1">*</span>
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
                <FormLabel className="flex items-center">
                  {process.env.LANGUAGE === 'bn'
                    ? "ইমেইল ঐচ্ছিক"
                    : "Email optional"} 
                </FormLabel>
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
                  {process.env.LANGUAGE === 'bn'
                    ? "জেলা"
                    : "District"} <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder={process.env.LANGUAGE === 'bn'
                    ? "আপনার জেলার নাম লিখুন"
                    : "Write your district name"} />
                </FormControl>
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
                  {process.env.LANGUAGE === 'bn'
                    ? "ঠিকানা"
                    : "Address"} <span className="text-red-500 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="min-h-[100px]"
                    placeholder={process.env.LANGUAGE === 'bn'
                    ? "আপনার বিস্তারিত ঠিকানা লিখুন"
                    : "Write your detailed address"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              disabled={loading}
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              {process.env.LANGUAGE === 'bn'
                ? "পরিবর্তন করুন"
                : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfilePage;
