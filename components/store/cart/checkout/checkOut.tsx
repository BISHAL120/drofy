"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart, Trash2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea"; // <- your JSON
import { FormSchema } from "@/lib/zod/checkOut";
import { location } from "@/constants/location";
import useCart from "@/lib/zustand/store";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { convertToBengaliNumber } from "@/hooks/convertNum";

type ThanaProps = {
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
};

export default function CheckoutPage() {
  const [upazilas, setUpazilas] = useState<ThanaProps[]>([]);
  const [loading, setLoading] = useState(false);
  const cart = useCart();
  const cartItems = cart.items;
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      name: "",
      district: "",
      upazila: "",
      address: "",
      deliveryCharge: "130",
      advanceCharge: "no",
      comments: "",
    },
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.sellPrice * item.quantity,
    0
  );
  const deliveryCharge = Number(form.watch("deliveryCharge") || 0);
  const total = subtotal + deliveryCharge;

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (cart.items.length === 0) {
      toast.error(process.env.LANGUAGE === 'bn' ? "প্রথমে প্রোডাক্ট এড করুন" : "Please add products first", {
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
      return;
    }

    toast.loading(process.env.LANGUAGE === 'bn' ? "প্রসেস হচ্ছে..." : "Processing...");
    setLoading(true);
    axios
      .post("/api/store/order", {
        values,
        cartItems,
        subtotal,
      })
      .then((res) => {
        router.push(`/store/order/success/${res.data.id}`);
        cart.removeAll();
        toast.dismiss();
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss();
        setLoading(false);
        router.push(
          `/store/order/failed?message=${err.response.data.message.split(" ").join("-")}`
        );
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

  const removeItem = (id: string, size: string) => cart.removeItem(id, size);

  const handleDistrictChange = (districtValue: string) => {
    const Thana = location.find((d) => d.name === districtValue)?.thana;
    setUpazilas(Thana || []);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {process.env.LANGUAGE === 'bn' ? "চেকআউট" : "Checkout"}
          </h1>
          <p className="text-gray-600">
            {process.env.LANGUAGE === 'bn' ? "আপনার অর্ডার পর্যালোচনা করুন এবং আপনার ক্রয় সম্পূর্ণ করুন" : "Review your order and complete your purchase"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* -------------------- Cart -------------------- */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  {process.env.LANGUAGE === 'bn' ? "অর্ডার তালিকা" : "Order List"} ({process.env.LANGUAGE === 'bn' ? convertToBengaliNumber(cartItems.length) : cartItems.length} {process.env.LANGUAGE === 'bn' ? "টি" : "items"})


                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 border rounded-lg"
                  >
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md w-18 h-18 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {process.env.LANGUAGE === 'bn' ? "সাইজ" : "Size"}: {process.env.LANGUAGE === 'bn' ? convertToBengaliNumber(item.size) : item.size}

                      </p>
                      <p className="text-lg font-semibold text-gray-900">
                        {process.env.LANGUAGE === 'bn' ? "পরিমাণ" : "Quantity"}:{process.env.LANGUAGE === 'bn' ? convertToBengaliNumber(item.quantity) : item.quantity} x ৳

                        {convertToBengaliNumber(item.sellPrice)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={loading}
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeItem(item.id, item.size)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{process.env.LANGUAGE === 'bn' ? "সর্বমোট পণ্যের দাম:" : "Subtotal:"}</span>
                    <span>৳{process.env.LANGUAGE === 'bn' ? convertToBengaliNumber(subtotal) : subtotal}</span>

                  </div>
                  <div className="flex justify-between text-sm">
                    <span>{process.env.LANGUAGE === 'bn' ? "ডেলিভারি চার্জ:" : "Delivery Charge:"}</span>
                    <span>{process.env.LANGUAGE === 'bn' ? "৳" : ""}{process.env.LANGUAGE === 'bn' ? convertToBengaliNumber(deliveryCharge) : deliveryCharge}</span>


                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>{process.env.LANGUAGE === 'bn' ? "মোট:" : "Total:"}</span>

                    <span>{process.env.LANGUAGE === 'bn' ? "৳" : ""}{process.env.LANGUAGE === 'bn' ? convertToBengaliNumber(total) : total}</span>


                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* -------------------- Form -------------------- */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{process.env.LANGUAGE === 'bn' ? "কাস্টমারের বিবরণ" : "Customer Information"}</CardTitle>
                <p className="text-sm text-red-500">
                  {process.env.LANGUAGE === 'bn' ? "অনুগ্রহ করে সঠিক তথ্য প্রদান করুন" : "Please provide accurate information"}
                </p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            {process.env.LANGUAGE === 'bn' ? "কাস্টমারের মোবাইল নম্বর" : "Customer's Mobile Number"}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={process.env.LANGUAGE === 'bn' ? "০১৬২৩৯৩৯৮৩৪" : "01623939834"}
                              disabled={loading}
                              maxLength={11}
                              {...field}
                            />
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
                          <FormLabel className="text-base font-medium">
                            {process.env.LANGUAGE === 'bn' ? "কাস্টমারের নাম" : "Customer's Name"}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              placeholder={process.env.LANGUAGE === 'bn' ? "কাস্টমারের সম্পূর্ণ নাম লিখুন" : "Write your full name"}

                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* District */}
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {process.env.LANGUAGE === 'bn' ? "কাস্টমারের জেলা" : "Customer's District"}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(v) => {
                                field.onChange(v);
                                handleDistrictChange(v);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={process.env.LANGUAGE === 'bn' ? "জেলা নির্বাচন করুন" : "Select district"}

                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {location.map((d, idx) => (
                                  <SelectItem key={idx} value={d.name}>
                                    {d.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Upazila */}
                      <FormField
                        control={form.control}
                        name="upazila"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {process.env.LANGUAGE === 'bn' ? "কাস্টমারের থানা/এরিয়া" : "Customer's Upazila/Area"}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(v) => {
                                field.onChange(v);
                              }}
                              defaultValue={field.value}
                              disabled={!form.watch("district") || loading}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      form.watch("district")
                                        ? process.env.LANGUAGE === 'bn' ? "থানা/এরিয়া নির্বাচন করুন" : "Select upazila"
                                        : process.env.LANGUAGE === 'bn' ? "জেলা নির্বাচন করুন" : "select district first"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {upazilas.map((u, idx) => (
                                  <SelectItem key={idx} value={u.name}>
                                    {process.env.LANGUAGE === 'bn' ? u.bn_name : u.name}

                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Address */}
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {process.env.LANGUAGE === 'bn' ? "ডেলিভারির ঠিকানা" : "Delivery Address"}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={process.env.LANGUAGE === 'bn' ? "কাস্টমারের সম্পূর্ণ ঠিকানা লিখুন" : "Write your full address"}

                              className="min-h-[100px]"
                              {...field}
                              disabled={loading}
                            />
                          </FormControl>
                          <FormDescription className="text-red-500 text-xs">
                            {process.env.LANGUAGE === 'bn'
                              ? "সঠিক ডেলিভারির জন্য অনুগ্রহ করে কাস্টমারের সম্পূর্ণ ঠিকানা, বাড়ির নম্বর, রাস্তা এবং কাছাকাছি ল্যান্ডমার্ক প্রদান করুন।"
                              : "Please provide your full address, house number, road, and landmark for accurate delivery."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Advance charge */}
                    <FormField
                      control={form.control}
                      name="advanceCharge"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base font-medium">
                            {process.env.LANGUAGE === 'bn' ? "চার্জ অগ্রিম নিয়েছেন?" : "Have you paid advance charge?"}
                            *
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-6"
                              disabled={loading}
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes" className="text-[20px]">
                                  {process.env.LANGUAGE === 'bn' ? "হ্যাঁ" : "Yes"}
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no" className="text-[20px]">
                                  {process.env.LANGUAGE === 'bn' ? "না" : "No"}
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription className="text-[16px]">
                            {process.env.LANGUAGE === 'bn'
                              ? "আপনি যদি ডেলিভারি চার্জ অগ্রিম নিয়ে থাকেন, তাহলে আমরা চার্জ বাদ দিয়ে কাস্টমারের কাছ থেকে শুধু প্রোডাক্টের দাম কালেক্ট করব।"
                              : "If you have paid advance charge, we will collect only the product price from the customer's side."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Delivery charge */}
                    <FormField
                      control={form.control}
                      name="deliveryCharge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {process.env.LANGUAGE === 'bn' ? "ডেলিভারি চার্জ" : "Delivery Charge"}
                            *
                          </FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription className="text-red-500 text-xs">
                            {process.env.LANGUAGE === 'bn'
                              ? "ডেলিভারি চার্জ বা কার্যক্রমের বিভিন্ন অংশগ্রহণের জন্য প্রয়োজনীয় চার্জ।"
                              : "Delivery charge or any other necessary charge for different parts of the order."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Comments */}
                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {process.env.LANGUAGE === 'bn' ? "কমেন্টস (অপশনাল)" : "Comments (Optional)"}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={loading}
                              placeholder={process.env.LANGUAGE === 'bn' ? "অর্ডার সম্পর্কে কোন অতিরিক্ত নির্দেশনা থাকলে লিখুন।" : "Write any additional instructions about the order."}
                              className="min-h-[80px]"
                            />
                          </FormControl>
                          <FormDescription className="text-red-500 text-xs">
                            {process.env.LANGUAGE === 'bn'
                              ? "অর্ডার সম্পর্কে কোন অতিরিক্ত নির্দেশনা থাকলে লিখুন।"
                              : "Write any additional instructions about the order."}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 text-lg"
                      size="lg"
                    >
                      {process.env.LANGUAGE === 'bn' ? "অর্ডার করুন" : "Place Order"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
