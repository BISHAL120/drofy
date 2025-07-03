"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle,
  ChevronRight,
  Folder,
  Gift,
  Headphones,
  HelpCircle,
  Image as ImageIcon,
  Star,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ServiceItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  route: string;
}

const topBannerButtons = [
  { title: "অফার ডিটেইলস ", route: "/order-details" },
  { title: "টপ সেলিং প্রোডাক্ট", route: "/top-selling" },
  { title: "অ্যাক্টিভ অর্ডারস ", route: "/update-order" },
  { title: "কাস্টমাইজ প্রিন্ট", route: "/customize-print" },
];

const services: ServiceItem[] = [
  {
    id: "1",
    title: "সকল প্রোডাক্ট",
    icon: <Folder className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "store/categories",
  },
  {
    id: "2",
    title: "ছবি দিয়ে সার্চ করুন",
    icon: <ImageIcon className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/product-search",
  },
  /* {
        id: "2",
        title: "প্রোডাক্টের নতুন পোস্ট",
        icon: <Facebook className="w-8 h-8" />,
        color: "bg-blue-500",
        route: "/facebook-page",
    }, */
  {
    id: "3",
    title: "ভেরিফাইড প্রোডাক্ট",
    icon: <Star className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/favorites",
  },
  /*  {
         id: "4",
         title: "বুস্টিং প্রোডাক্ট",
         icon: <Megaphone className="w-8 h-8" />,
         color: "bg-orange-500",
         route: "/promotion",
     }, */
  {
    id: "5",
    title: "সেলস গাইডলাইন",
    icon: <Gift className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/guide-line",
  },
  /* {
        id: "6",
        title: "লার্নিং ভিডিও",
        icon: <Video className="w-8 h-8" />,
        color: "bg-orange-500",
        route: "/live-video",
    },
    {
        id: "7",
        title: "ডিজিটাল পেমেন্ট",
        icon: <CreditCard className="w-8 h-8" />,
        color: "bg-blue-500",
        route: "/payment",
    },
    {
        id: "8",
        title: "মোবাইল রিচার্জ",
        icon: <Smartphone className="w-8 h-8" />,
        color: "bg-orange-500",
        route: "/mobile-recharge",
    },
    {
        id: "9",
        title: "ই-কমার্স ওয়েবসাইট",
        icon: <Monitor className="w-8 h-8" />,
        color: "bg-blue-500",
        route: "/ecommerce",
    },
    {
        id: "10",
        title: "সেবা ভ্যালুয়েশন",
        icon: <Clock className="w-8 h-8" />,
        color: "bg-emerald-500",
        route: "/service-valuation",
    },
    {
        id: "11",
        title: "ব্যবসায় পরিকল্পনা",
        icon: <FileText className="w-8 h-8" />,
        color: "bg-blue-500",
        route: "/business-plan",
    },
    {
        id: "12",
        title: "সামাজিক দায়বদ্ধতা",
        icon: <Users className="w-8 h-8" />,
        color: "bg-emerald-500",
        route: "/social-responsibility",
    }, */
  {
    id: "13",
    title: "ব্যালেন্স স্টেটমেন্ট",
    icon: <HelpCircle className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/balance",
  },
  {
    id: "14",
    title: "টেলিগ্রাম সাপোর্ট গ্রুপ",
    icon: <CheckCircle className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "#",
  },
  {
    id: "15",
    title: "সাপোর্ট সেন্টার",
    icon: <Headphones className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/support",
  },
];

export function DashboardMenu() {
  const router = useRouter();
  const [showMobileBanner, setShowMobileBanner] = useState(true);

  const handleServiceClick = (route: string) => {
    router.push(route);
  };

  const handleBannerClick = (route: string) => {
    router.push(route);
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Mobile Promotional Banner */}
      {showMobileBanner && (
        <div className=" relative">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg overflow-hidden">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-white hover:bg-white/20"
              onClick={() => setShowMobileBanner(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">
                  এই ঈদে টপ ৩০ জন সেলার পাবেন সর্বোচ্চ
                </h3>
                <p className="text-2xl font-bold text-yellow-300">
                  ৫০ হাজার টাকা বোনাস
                </p>
                <p className="text-sm opacity-90 mt-1">
                  ক্যাম্পেইনে অংশগ্রহণ করে আজই ঈদ বোনাস পান
                </p>
                <p className="text-xs opacity-75 mt-2">
                  এখন টপ ৩০ জন সেলার পাবেন কর্পোরেট গিফট ও আকর্ষণীয় পুরস্কার
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="flex space-x-2">
                  <Gift className="w-8 h-8 text-yellow-300" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="h-full flex flex-col justify-between">
        <div className="space-y-5">
          {/* Top Banner Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {topBannerButtons.map((button, index) => (
              <Button
                key={index}
                onClick={() => handleBannerClick(button.route)}
                className="bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-medium text-sm md:text-base transition-all duration-200 hover:shadow-lg hover:scale-105 group"
              >
                {button.title}
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            ))}
          </div>

          {/* Service Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {services.map((service) => (
              <Card
                key={service.id}
                className={`${service.color} hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-0`}
                onClick={() => handleServiceClick(service.route)}
              >
                <div className="p-6 text-center text-white">
                  <div className="flex justify-center mb-3 group-hover:scale-110 transition-transform duration-200">
                    {service.icon}
                  </div>
                  <h3 className="font-semibold text-sm leading-tight">
                    {service.title}
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Info Section for Desktop */}
        <div className="hidden md:block mt-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <div className="p-6 text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                আমাদের সেবা সমূহ ব্যবহার করুন এবং আপনার ব্যবসা বৃদ্ধি করুন
              </h4>
              <p className="text-gray-600 text-sm">
                ২৪/৭ কাস্টমার সাপোর্ট • দ্রুত সেবা • নির্ভরযোগ্য প্ল্যাটফর্ম
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
