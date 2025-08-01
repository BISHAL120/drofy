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
import { Textarea } from "@/components/ui/textarea";
import locationData from "@/constants/location.json"; // <- your JSON
import { FormSchema } from "@/lib/zod/checkOut";
import useCart from "@/lib/zustand/store";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

/* ------------------------------------------------------------------ */
/* Types helpers                                                      */
/* ------------------------------------------------------------------ */
type Format = { name: string; value: string };

type District = {
  name: Format;
  upazila: Array<{
    name: Format;
    union: Format[];
  }>;
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function CheckoutPage() {
  /* ---------------- cart state ------------------------------------ */
  const cart = useCart();
  const cartItems = cart.items;

  /* ---------------- location state -------------------------------- */
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<District["upazila"][number][]>([]);
  const [unions, setUnions] = useState<Format[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  /* ---------------- react-hook-form ------------------------------- */
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
      deliveryCharge: "130",
      advanceCharge: "no",
      comments: "",
    },
  });

  /* ---------------- totals ---------------------------------------- */
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.sellPrice * item.quantity,
    0
  );
  const deliveryCharge = Number(form.watch("deliveryCharge") || 0);
  const total = subtotal + deliveryCharge;

  function onSubmit(values: z.infer<typeof FormSchema>) {
    if (cart.items.length === 0) {
      toast.error("প্রথমে প্রোডাক্ট এড করুন", {
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

    toast.loading("প্রসেস হচ্ছে...");
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
          `/store/order/failed?message=${err.response.data.message
            .split(" ")
            .join("-")}`
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

  /* ---------------- handlers -------------------------------------- */
  const removeItem = (id: string, size: string) => cart.removeItem(id, size);

  const handleDivisionChange = (divisionValue: string) => {
    const divisionObj = locationData.find(
      (d) => d.name.value === divisionValue
    );
    setDistricts((divisionObj?.district as District[]) ?? []);
    form.setValue("district", "");
    form.setValue("upazila", "");
    form.setValue("union", "");
    setUpazilas([]);
    setUnions([]);
  };

  const handleDistrictChange = (districtValue: string) => {
    const districtObj = districts.find((d) => d.name.value === districtValue);
    setUpazilas(districtObj?.upazila ?? []);
    form.setValue("upazila", "");
    form.setValue("union", "");
    setUnions([]);
  };

  const handleUpazilaChange = (upazilaValue: string) => {
    const upazilaObj = upazilas.find((u) => u.name.value === upazilaValue);
    setUnions(upazilaObj?.union ?? []);
    form.setValue("union", "");
  };

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */
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
          {/* -------------------- Cart -------------------- */}
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
                        ৳{item.sellPrice.toLocaleString()} x {item.quantity}
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

          {/* -------------------- Form -------------------- */}
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
                            <Input
                              placeholder="01639393834"
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
                            Customer Name{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={loading}
                              placeholder="Enter your full name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Division */}
                      <FormField
                        control={form.control}
                        name="division"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Division <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(v) => {
                                field.onChange(v);
                                handleDivisionChange(v);
                              }}
                              disabled={loading}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select division" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {locationData.map((d, idx) => (
                                  <SelectItem key={idx} value={d.name.value}>
                                    {d.name.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* District */}
                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              District <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(v) => {
                                field.onChange(v);
                                handleDistrictChange(v);
                              }}
                              defaultValue={field.value}
                              disabled={!form.watch("division") || loading}
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
                                {districts.map((d, idx) => (
                                  <SelectItem key={idx} value={d.name.value}>
                                    {d.name.name}
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
                              Thana <span className="text-red-500">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={(v) => {
                                field.onChange(v);
                                handleUpazilaChange(v);
                              }}
                              defaultValue={field.value}
                              disabled={!form.watch("district") || loading}
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
                                {upazilas.map((u, idx) => (
                                  <SelectItem key={idx} value={u.name.value}>
                                    {u.name.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Union */}
                      <FormField
                        control={form.control}
                        name="union"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Union (Optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={!form.watch("upazila") || loading}
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
                                {unions.map((u, idx) => (
                                  <SelectItem key={idx} value={u.value}>
                                    {u.name}
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
                            Delivery Address{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your complete delivery address with landmarks"
                              className="min-h-[100px]"
                              {...field}
                              disabled={loading}
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

                    {/* Advance charge */}
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
                              disabled={loading}
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

                    {/* Delivery charge */}
                    <FormField
                      control={form.control}
                      name="deliveryCharge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Delivery Charge{" "}
                            <span className="text-red-500">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} disabled />
                          </FormControl>
                          <FormDescription className="text-red-500 text-xs">
                            Delivery charge varies based on location. Standard
                            charge is 120 Taka within Dhaka city.
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
                          <FormLabel>Comments (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              disabled={loading}
                              placeholder="Any special instructions or comments for your order"
                              className="min-h-[80px]"
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
