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
import { registerSchema } from "@/lib/zod/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ChevronsRight, Eye, EyeClosed, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      number: "",
      password: "",
      referralCode: "1",
      confirmPassword: "",
      email: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      if (values.password !== values.confirmPassword) {
        toast.dismiss(); // Dismiss any existing toast if there is one
        toast.error("ভুল কনফার্ম পাসওয়ার্ড!", {
          duration: 5000,
          icon: "⚠️",
          style: {
            background: "red",
            border: "2px solid #DC2626", // Adjusted to a darker red border
            color: "white",
            fontWeight: "600",
            fontSize: "16px", // Adjusted font size
            padding: "10px 20px", // Adjusted padding
          },
        });
        return;
      }
      setIsLoading(true);
      toast.loading("প্রসেসিং...", {
        style: {
          background: "#FFA500",
          border: "2px solid #FF8C00",
          color: "white",
          fontWeight: "600",
          fontSize: "16px",
          padding: "10px 20px",
        },
      });
      axios
        .post("/api/register", values)
        .then((res) => {
          console.log("Response :", res.data.data);
          // toast.success("OTP sent to your mobile number");
          toast.dismiss();
          toast.success("রেজিস্ট্রেশন সম্পন্ন হয়েছে", {
            style: {
              background: "#22C55E", // Green background
              border: "2px solid #16A34A", // Darker green border
              color: "white",
              fontWeight: "600",
              fontSize: "16px",
              padding: "10px 20px",
            },
            position: "top-center",
            icon: "✅",
          });
          signIn("credentials", {
            number: values.number,
            password: values.password,
            redirect: true,
            callbackUrl: "/register/success",
          });
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error :", err);
          setIsLoading(false);
          toast.dismiss();
          toast.error(err.response.data.message, {
            duration: 5000,
            icon: "⚠️",
            style: {
              background: "red",
              border: "2px solid #DC2626", // Adjusted to a darker red border
              color: "white",
              fontWeight: "600",
              fontSize: "16px", // Adjusted font size
              padding: "10px 20px", // Adjusted padding
            },
          });
        });
    } catch (error) {
      setIsLoading(false);
      toast.dismiss();
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
            আপনার ইমেইল এ একটি ওটিপি কোড পাঠানো হবে, কোডটি বসিয়ে রেজিস্ট্রেশন
            সম্পূর্ণ করুন।
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <FormLabel
                          htmlFor="name"
                          className="text-sm text-gray-600"
                        >
                          নাম *
                        </FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="আপনার নাম"
                          type="text"
                          autoCapitalize="none"
                          autoComplete="name"
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
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <FormLabel
                          htmlFor="mobile"
                          className="text-sm text-gray-600"
                        >
                          মোবাইল নং *
                        </FormLabel>
                        <Input
                          {...field}
                          id="mobile"
                          placeholder="01700000000"
                          autoCapitalize="none"
                          autoComplete="mobile"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="mt-1"
                          maxLength={11}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value.length <= 11) {
                              field.onChange(value);
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referralCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <FormLabel
                          htmlFor="referralCode"
                          className="text-sm text-gray-600"
                        >
                          রেফারেল কোড
                        </FormLabel>
                        <Input
                          {...field}
                          id="referralCode"
                          placeholder="রেফারেল কোড"
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
                      <div className="relative">
                        <FormLabel
                          htmlFor="password"
                          className="text-sm text-gray-600"
                        >
                          পাসওয়ার্ড *
                        </FormLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="password"
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="mt-1"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <Eye className="w-5 h-5 cursor-pointer" />
                            ) : (
                              <EyeClosed className="w-5 h-5 cursor-pointer" />
                            )}
                          </button>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <FormLabel
                          htmlFor="confirmPassword"
                          className="text-sm text-gray-600"
                        >
                          কনফার্ম পাসওয়ার্ড *
                        </FormLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="confirmPassword"
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            autoCapitalize="none"
                            autoComplete="new-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            className="mt-1"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {showPassword ? (
                              <Eye className="w-5 h-5 cursor-pointer" />
                            ) : (
                              <EyeClosed className="w-5 h-5 cursor-pointer" />
                            )}
                          </button>
                        </div>
                      </div>
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
                    <FormControl>
                      <div>
                        <FormLabel
                          htmlFor="email"
                          className="text-sm text-gray-600"
                        >
                          ইমেইল
                        </FormLabel>
                        <Input
                          {...field}
                          id="email"
                          placeholder="example@email.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
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
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <FormLabel
                          htmlFor="address"
                          className="text-sm text-gray-600"
                        >
                          ঠিকানা * (Optional)
                        </FormLabel>
                        <textarea
                          {...field}
                          id="address"
                          placeholder="আপনার বর্তমান ঠিকানা"
                          rows={3}
                          autoCapitalize="none"
                          autoCorrect="off"
                          disabled={isLoading}
                          className="mt-1 w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                রেজিস্ট্রেশন করুন <ChevronsRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              ইতিমধ্যে একাউন্ট আছে?{" "}
              <Link
                href="/login"
                className="font-semibold text-orange-600 hover:text-orange-500"
              >
                লগইন করুন
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              পাসওয়ার্ড ভুলে গেছেন?{" "}
              <Link
                href="/forgot-password"
                className="font-semibold text-orange-600 hover:text-orange-500"
              >
                পাসওয়ার্ড রিসেট করুন
              </Link>
            </p>
            <p className="text-xs text-gray-500 mt-4">
              রেজিস্ট্রেশন করার মাধ্যমে আপনি আমাদের{" "}
              <Link
                href="/terms"
                className="underline text-orange-600 hover:text-orange-500"
              >
                শর্তাবলী
              </Link>{" "}
              এবং{" "}
              <Link
                href="/privacy"
                className="underline text-orange-600 hover:text-orange-500"
              >
                গোপনীয়তা নীতি
              </Link>{" "}
              মেনে নিচ্ছেন
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
