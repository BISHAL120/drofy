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
  UserPlus2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ServiceItem {
  id: string;
  title: {
    bn: string;
    en: string;
  };
  icon: React.ReactNode;
  color: string;
  route: string;
}

const topBannerButtons = [
  { title: { bn: "অফার ডিটেইলস", en: "Offer Details" }, route: "/order-details" },
  { title: { bn: "টপ সেলিং প্রোডাক্ট", en: "Top Selling Products" }, route: "/top-selling" },
  { title: { bn: "অ্যাক্টিভ অর্ডারস", en: "Active Orders" }, route: "/update-order" },
  { title: { bn: "কাস্টমাইজ প্রিন্ট", en: "Customize Print" }, route: "/customize-print" },
];

const services: ServiceItem[] = [
  {
    id: "1",
    title: {
      bn: "সকল প্রোডাক্ট",
      en: "All Products",
    },
    icon: <Folder className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "store/categories",
  },
  {
    id: "2",
    title: {
      bn: "ছবি দিয়ে সার্চ করুন",
      en: "Search by Image",
    },
    icon: <ImageIcon className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/product-search",
  },
  /* {
        id: "2",
        title: {
            bn: "প্রোডাক্টের নতুন পোস্ট",
            en: "New Product Post",
        },
        icon: <Facebook className="w-8 h-8" />,
        color: "bg-blue-500",
        route: "/facebook-page",
    }, */
  {
    id: "3",
    title: {
      bn: "ভেরিফাইড প্রোডাক্ট",
      en: "Verified Products",
    },
    icon: <Star className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/favorites",
  },
  /*  {
         id: "4",
         title: {
            bn: "বুস্টিং প্রোডাক্ট",
            en: "Boosting Products",
         },
         icon: <Megaphone className="w-8 h-8" />,
         color: "bg-orange-500",
         route: "/promotion",
     }, */
  {
    id: "5",
    title: {
      bn: "সেলস গাইডলাইন",
      en: "Sales Guidelines",
    },
    icon: <Gift className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/guide-line",
  },
  {
    id: "6",
    title: {
      bn: "প্যাসিভ ইনকাম",
      en: "Passive Income",
    },
    icon: <UserPlus2 className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/pasive-income",
  },
  /*  {
        id: "7",
        title: {
            bn: "ডিজিটাল পেমেন্ট",
            en: "Digital Payment",
        },
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
    title: {
      bn: "ব্যালেন্স স্টেটমেন্ট",
      en: "Balance Statement",
    },
    icon: <HelpCircle className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "/store/balance",
  },
  {
    id: "14",
    title: {
      bn: "টেলিগ্রাম সাপোর্ট গ্রুপ",
      en: "Telegram Support Group",
    },
    icon: <CheckCircle className="w-8 h-8" />,
    color: "bg-emerald-500",
    route: "#",
  },
  {
    id: "15",
    title: {
      bn: "সাপোর্ট সেন্টার",
      en: "Support Center",
    },
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
        <div className="relative">
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
                  {process.env.LANGUAGE === 'bn' 
                    ? "এই ঈদে টপ ৩০ জন সেলার পাবেন সর্বোচ্চ"
                    : "This Eid, top 30 sellers will receive maximum"}
                </h3>
                <p className="text-2xl font-bold text-yellow-300">
                  {process.env.LANGUAGE === 'bn'
                    ? "৫০ হাজার টাকা বোনাস"
                    : "50 thousand taka bonus"}
                </p>
                <p className="text-sm opacity-90 mt-1">
                  {process.env.LANGUAGE === 'bn'
                    ? "ক্যাম্পেইনে অংশগ্রহণ করে আজই ঈদ বোনাস পান"
                    : "Participate in the campaign and get Eid bonus today"}
                </p>
                <p className="text-xs opacity-75 mt-2">
                  {process.env.LANGUAGE === 'bn'
                    ? "এখন টপ ৩০ জন সেলার পাবেন কর্পোরেট গিফট ও আকর্ষণীয় পুরস্কার"
                    : "Now top 30 sellers will receive corporate gifts and attractive prizes"}
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
                {process.env.LANGUAGE === 'bn' ? button.title.bn : button.title.en}
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
                    {process.env.LANGUAGE === 'bn' ? service.title.bn : service.title.en}
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
