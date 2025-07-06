"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ShoppingCart, Trash2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import location from "@/constants/location.json";
import { FormSchema } from "@/lib/zod/checkOut";
import useCart from "@/lib/zustand/store";
import axios from "axios";
import { useState } from "react";

type districtType = {
  name: string;
  value: string;
};

type upazilaType = {
  name: string;
  value: string;
};

export default function CheckoutPage() {
  const [districts, setDistricts] = useState<districtType[]>([]);
  const [upazilas, setUpazilas] = useState<upazilaType[]>([]);
  const [union, setUnion] = useState<string[]>([]);
  const cart = useCart();
  const cartItems = cart.items;

  const handleDivisionChange = (value: string) => {
    const district = location.find(
      (division) => division.name === value
    )?.district;

    const array = [];

    if (district) {
      for (const item of district) {
        const obj = {
          name: item.name,
          value: item.name,
        };
        array.push(obj);
      }
    }

    setDistricts(array);
  };

  const handleDistrictChange = (value: string) => {
    const upazila = location
      .find((division) => division.district?.find((d) => d.name === value))
      ?.district?.find((d) => d.name === value)?.upazila;

    const array = [];

    if (upazila) {
      for (const item of upazila) {
        const obj = {
          name: item.name,
          value: item.name,
        };
        array.push(obj);
      }
    }

    setUpazilas(array);
  };

  const handleUpazilaChange = (value: string) => {
    const result = location
      .find((division) =>
        division.district?.find((d) => d.upazila?.find((u) => u.name === value))
      )
      ?.district?.find((d) => d.upazila?.find((u) => u.name === value))
      ?.upazila.find((i) => i.name === value);

    const array = [];

    if (result && "union" in result && result.union) {
      for (const item of result.union) {
        array.push(item);
      }
    }

    setUnion(array);
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      phone: "",
      name: "",
      division: "",
      district: "",
      upazila: "",
      union: "",
      address: "",
      deliveryCharge: "120",
      advanceCharge: "yes",
      comments: "",
    },
  });

  const removeItem = (id: string, size: string) => {
    cart.removeItem(id, size);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = Number.parseInt(form.watch("deliveryCharge") || "0");
  const total = subtotal + deliveryCharge;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    axios
      .post("/api/store/order", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Order ({cartItems.length} items)
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
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                      <p className="text-lg font-semibold text-gray-900">
                        ৳{item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
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
                    <span>Subtotal:</span>
                    <span>৳{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Charge:</span>
                    <span>৳{deliveryCharge}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>৳{total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Details Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
                <p className="text-sm text-red-500">
                  * Please provide accurate information for delivery
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
                            Customer Phone Number{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Input
                                placeholder="01639393834"
                                className=""
                                max={11}
                                {...field}
                              />
                            </div>
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
                            Customer Name{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your full name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                      {/* Division Field */}
                      <FormField
                        control={form.control}
                        name="division"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Division <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleDivisionChange(value);
                              }}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select division" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {location.map((division, idx) => (
                                  <SelectItem key={idx} value={division.name}>
                                    {division.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* District Field */}
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              District <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleDistrictChange(value);
                              }}
                              defaultValue={field.value}
                              disabled={!form.watch("division")}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      form.watch("division")
                                        ? "Select district"
                                        : "select division first"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {districts.map((district) => (
                                  <SelectItem
                                    key={district.value}
                                    value={district.value}
                                  >
                                    {district.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Upazila Field */}
                      <FormField
                        control={form.control}
                        name="upazila"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Upazila <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(value) => {
                                field.onChange(value);
                                handleUpazilaChange(value);
                              }}
                              defaultValue={field.value}
                              disabled={!form.watch("district")}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      form.watch("district")
                                        ? "Select upazila"
                                        : "select district first"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {upazilas.map((upazila) => (
                                  <SelectItem
                                    key={upazila.value}
                                    value={upazila.value}
                                  >
                                    {upazila.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Union Field (Optional) */}
                      <FormField
                        control={form.control}
                        name="union"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Union (Optional)
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!form.watch("upazila")}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      form.watch("upazila")
                                        ? "Select union"
                                        : "select upazila first"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {union.map((union, idx) => (
                                  <SelectItem key={idx} value={union}>
                                    {union}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Delivery Address{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your complete delivery address with landmarks"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-red-500 text-xs">
                            Please provide your complete address with house
                            number, road, and nearby landmarks for accurate
                            delivery.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="advanceCharge"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-base font-medium">
                            চার্জ অগ্রিম নিয়েছেন?*
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-row space-x-6"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="yes" />
                                <Label htmlFor="yes" className="text-[20px]">
                                  হাঁ
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="no" />
                                <Label htmlFor="no" className="text-[20px]">
                                  না
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormDescription className="text-[16px]">
                            আপনি যদি ডেলিভারি চার্জ অগ্রিম নিয়ে থাকেন, তাহলে
                            আমরা চার্জ বাদ দিয়ে কাস্টমারের কাছ থেকে শুধু
                            প্রোডাক্টের দাম কালেক্ট করব।
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deliveryCharge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Delivery Charge{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="120" {...field} disabled />
                          </FormControl>
                          <FormDescription className="text-red-500 text-xs">
                            Delivery charge varies based on location. Standard
                            charge is 120 Taka within Dhaka city.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="comments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Comments (Optional)
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any special instructions or comments for your order"
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-red-500 text-xs">
                            Please mention any special delivery instructions or
                            preferences.
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
                      Place Order
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
