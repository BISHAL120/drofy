"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowRight,
  CheckCircle,
  CreditCard,
  Loader,
  OrigamiIcon,
  TriangleAlert,
  Wallet,
} from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { withdrawSchema } from "@/lib/zod/withdraw";
import { useState } from "react";
import { useRouter } from "next/navigation";

const paymentMethods = [
  {
    id: "bkash",
    name: "bKash",
    icon: OrigamiIcon,
    color: "bg-pink-500",
    minAmount: 50,
    maxAmount: 25000,
    fee: "5",
    processingTime: "24 Hours",
  },
  {
    id: "nagad",
    name: "Nagad",
    icon: Wallet,
    color: "bg-orange-500",
    minAmount: 50,
    maxAmount: 25000,
    fee: "5",
    processingTime: "24 Hours",
  },
];

export default function WithdrawPage({ userId }: { userId: string }) {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      paymentType: "",
      amount: "",
      accountNumber: "",
    },
  });

  function onSubmit(values: z.infer<typeof withdrawSchema>) {
    setLoading(true);
    toast.loading("অপেক্ষা করুন...");
    axios
      .post("/api/store/withdraw", {
        ...values,
        resellerId: userId,
        amount: Number(values.amount) + 5,
      })
      .then((res) => {
        toast.dismiss();
        // router.push("/store/balance");
        toast.success(res.data.message, {
          duration: 5000
        });
        setLoading(false);
        form.reset();
        
      })
      .catch((err) => {
        toast.dismiss();
        setLoading(false);
        form.reset();
        router.refresh();
        toast.error(err.response.data.message, {
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
      });
  }

  const watchedValues = form.watch();
/*   const selectedMethod = paymentMethods.find(
    (m) => m.id === watchedValues.paymentType
  ); */

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex flex-col gap-10 items-center justify-center">
      <Card className="w-full max-w-2xl shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            উত্তোলন করুন
          </CardTitle>
          <CardDescription className="text-lg text-slate-600">
            উত্তোলনের মাধ্যম নির্বাচন করুন এবং পরিমাণ প্রদান করুন
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel className="text-lg font-semibold text-slate-800">
                      উত্তোলনের মাধ্যম নির্বাচন করুন
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        {paymentMethods.map((method) => (
                          <FormItem key={method.id}>
                            <div className="relative">
                              <FormControl>
                                <RadioGroupItem
                                  value={method.id}
                                  id={method.id}
                                  className="peer sr-only"
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={method.id}
                                className="flex items-center justify-between p-6 rounded-xl border-2 border-slate-200 bg-white cursor-pointer transition-all hover:border-violet-300 hover:shadow-md peer-data-[state=checked]:border-violet-500 peer-data-[state=checked]:bg-violet-50 peer-data-[state=checked]:shadow-lg"
                              >
                                <div className="flex items-center space-x-4">
                                  <div
                                    className={`w-12 h-12 bg-violet-500 rounded-xl flex items-center justify-center`}
                                  >
                                    <method.icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-semibold text-slate-800">
                                      {method.name}
                                    </div>
                                    <div className="text-sm text-slate-500">
                                      ৳{method.minAmount} - ৳ {method.maxAmount}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right space-y-1">
                                  <Badge
                                    variant="secondary"
                                    className="bg-slate-100"
                                  >
                                    Fee: ৳{method.fee}
                                  </Badge>
                                  <div className="text-xs text-slate-500">
                                    In {method.processingTime}
                                  </div>
                                </div>
                                {form.getValues("paymentType") ===
                                  method.id && (
                                  <CheckCircle className="absolute top-1 right-1 w-6 h-6 text-violet-500" />
                                )}
                              </FormLabel>
                            </div>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Ammount Input */}
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-slate-800">
                        {" "}
                        টাকার পরিমাণ
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter amount"
                          {...field}
                          className="pl-8 h-14 text-lg border-2 focus:border-violet-500 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Account Number Input */}
              <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                <FormField
                  control={form.control}
                  name="accountNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-slate-800">
                        {" "}
                        অ্যাকাউন্ট নাম্বার
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter account number"
                          maxLength={11}
                          className="pl-8 h-14 text-lg border-2 focus:border-violet-500 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Withdrawal Summary */}
              {watchedValues.paymentType &&
                watchedValues.amount &&
                watchedValues.accountNumber && (
                  <div className="bg-violet-50 p-6 rounded-xl border-2 border-violet-100 space-y-3">
                    <h3 className="font-semibold text-lg text-violet-900">
                      উত্তোলনের সারসংক্ষেপ
                    </h3>
                    <div className="space-y-2 text-violet-700">
                      <div className="flex justify-between">
                        <span>উত্তোলনের মাধ্যম:</span>
                        <span className="font-medium">
                          {watchedValues?.paymentType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>টাকার পরিমাণ:</span>
                        <span className="font-medium">
                          ৳{watchedValues.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>বিকাশ নাম্বার:</span>
                        <span className="font-medium">
                          {watchedValues.accountNumber}
                        </span>
                      </div>
                      <div className="flex justify-between ">
                        <span>ফি:</span>
                        <span className="font-medium">
                          ৳{paymentMethods.find((method) => method.id === watchedValues.paymentType)?.fee}
                        </span>
                      </div>
                      <div className="flex justify-between border-violet-200 pt-2 mt-2 border-t">
                        <span>মোট:</span>
                        <span className="font-medium">
                          ৳
                          {Number(watchedValues.amount) +
                            Number(paymentMethods.find((method) => method.id === watchedValues.paymentType)?.fee)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

              <Button
                disabled={loading}
                type="submit"
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-500"
              >
                {loading && <Loader className="w-5 h-5 animate-spin" />}
                উত্তোলন
                {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
              </Button>
            </form>
          </Form>

          {/* Security Notice */}
          <div className="text-center text-sm text-slate-500 bg-slate-50 rounded-lg p-4">
            🔒 আপনার ট্রানজেকশন ব্যাংকের স্তরের এনক্রিপশন দিয়ে সংরক্ষিত।
            প্রসেসিং সময় আপনার নির্বাচিত পেমেন্ট মেথড অনুযায়ী ভিন্ন হতে পারে।
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
