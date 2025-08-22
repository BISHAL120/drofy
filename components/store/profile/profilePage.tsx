"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Building2,
  MapPin,
  Medal,
  Phone,
  TriangleAlert,
  User,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileSchema = z.object({
  name: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  companyName: z.string().min(2, "দোকানের নাম কমপক্ষে ২ অক্ষর হতে হবে"),
  district: z.string().min(1, "জেলা নির্বাচন করুন"),
  address: z.string().min(5, "ঠিকানা বিস্তারিত লিখুন"),
});

type UserProfile = {
  id: string;
  phone: string;
  name: string;
  email: string;
  district: string | null;
  address: string | null;
  companyName: string | null;
  profileImage: string | null;
  wallet: number;
  orderCount: number;
  totalRevenue: number;
  resellerLevel: string;
  referralCode: number;
  verified: boolean;
  isActive: boolean;
} | null;

const ProfilePage = ({ initialData }: { initialData: UserProfile }) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name || "",
      companyName: initialData?.companyName || "",
      district: initialData?.district || "",
      address: initialData?.address || "",
    },
  });

  const onSubmit = (data: z.infer<typeof profileSchema>) => {
    setLoading(true);
    toast.loading("পরিবর্তন হচ্ছে...");
    axios
      .patch("/api/store/profile", {
        id: initialData?.id,
        ...data,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong", {
          icon: <TriangleAlert className="h-4 w-4" />,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (!initialData) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
      {/* Profile Overview */}
      <Card className="bg-white">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-orange-100 flex items-center justify-center">
              {initialData.profileImage ? (
                <Image
                  width={160}
                  height={160}
                  src={initialData.profileImage}
                  alt={initialData.name}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User size={40} className="text-orange-500" />
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{initialData.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {initialData.companyName}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-4 bg-orange-50 rounded-lg">
              <Wallet className="text-orange-500" />
              <div>
                <p className="text-sm text-muted-foreground">Wallet Balance</p>
                <p className="font-semibold">
                  ৳{initialData.wallet.toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg">
              <Building2 className="text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="font-semibold">{initialData.orderCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg">
              <Medal className="text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Reseller Level</p>
                <p className="font-semibold">{initialData.resellerLevel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 bg-purple-50 rounded-lg">
              <MapPin className="text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-semibold">{initialData.district}</p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Contact Information */}
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{initialData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{initialData.email}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Profile Form */}
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
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
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <Textarea {...field} className="min-h-[100px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white"
              >
                Save Changes
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
