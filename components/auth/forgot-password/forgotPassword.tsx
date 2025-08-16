"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("একটি সঠিক ই-মেইল প্রদান করুন"),
});

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    setLoading(true);
    toast.loading("Sending OTP...");
    axios
      .post("/api/password/forgetPassword", values)
      .then((res) => {
        console.log(res.data)
        toast.dismiss();
        router.push(`/new-password?userEmail=${values.email}`);
        toast.success("OTP Sent", {
          duration: 5000,
          description: "Please check your email for the OTP code",
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.dismiss();
        toast.error(error.response.data.message, {
          duration: 5000,
          icon: <TriangleAlert className="h-4 w-4" />,
          style: {
            borderRadius: "6px",
            background: "red",
            color: "white",
            border: "1px solid #ff0000",
            fontSize: "16px",
            fontWeight: "bold",
          },
        });
        setLoading(false);
      });
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
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

          <CardTitle className="text-2xl text-orange-600 font-bold text-center">
            পাসওয়ার্ড রিসেট
          </CardTitle>
          <CardDescription className="text-center">
            আপনার ইমেইল এ একটি ওটিপি কোড পাঠানো হবে, কোডটি বসিয়ে পাসওয়ার্ড
            রিসেট করুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ইমেইল এড্রেস</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="example@email.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={loading}
              >
               {loading && <Loader2 className="animate-spin" /> } ওটিপি পাঠান
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
