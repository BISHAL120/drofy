"use client";

import { Filter, MapPin, Phone, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const orders = [
  {
    id: 22,
    date: "২০২৫-০৫-১৫",
    customer: "Kim Nieves",
    phone: "01752624523",
    location: "Pirojpur",
    status: "cancelled",
    statusText: "বিক্রিত ১৫",
    price: 300,
    sold: 1100,
    profit: 800,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 21,
    date: "২০২৫-০৪-১২",
    customer: "Mojahid",
    phone: "01733833907",
    location: "Munshiganj",
    status: "delivered",
    statusText: "বিক্রিত ১৫",
    price: 310,
    sold: 500,
    profit: 190,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 20,
    date: "২০২৫-০৪-১২",
    customer: "Mojahid",
    phone: "01733833907",
    location: "Munshiganj",
    status: "delivered",
    statusText: "বিক্রিত ১৫",
    price: 199,
    sold: 600,
    profit: 401,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 19,
    date: "২০২৫-০৩-০২",
    customer: "M.h Sohel Rana",
    phone: "01816234871",
    location: "Chittagong",
    status: "returned",
    statusText: "বিক্রিত ১৫",
    price: 650,
    sold: 1100,
    profit: 450,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 18,
    date: "২০২৫-০২-২৫",
    customer: "Moynul Hasan",
    phone: "01819010039",
    location: "Dhaka",
    status: "delivered",
    statusText: "বিক্রিত ১৫",
    price: 619,
    sold: 1000,
    profit: 381,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 17,
    date: "২০২৫-০২-২৫",
    customer: "Moynul Hasan",
    phone: "01819010039",
    location: "Dhaka",
    status: "delivered",
    statusText: "বিক্রিত ১৫",
    price: 1098,
    sold: 1000,
    profit: -98,
    image: "/placeholder.svg?height=60&width=60",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    case "returned":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "delivered":
      return "Delivered";
    case "processing":
      return "Processing";
    case "cancelled":
      return "Cancelled";
    case "returned":
      return "Returned";
    default:
      return status;
  }
};

export default function OrderList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm) ||
      order.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
                <TabsTrigger value="all" className="text-sm">
                  সব
                </TabsTrigger>
                <TabsTrigger value="delivered" className="text-sm">
                  পেইড
                </TabsTrigger>
                <TabsTrigger value="processing" className="text-sm">
                  প্রসেস
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="text-sm">
                  ক্যান্সেল
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Active Order Banner */}
      <div className="bg-orange-500 text-white">
        <Link href="/store/active-orders">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-3 flex items-center justify-center">
              <span className="text-sm font-medium">
                View Active Order (Advance Report)
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by customer, phone, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row lg:items-center">
                  {/* Product Image */}
                  <div className="lg:w-20 lg:h-20 w-full h-48 lg:m-4 relative bg-gray-100">
                    <Image
                      src={order.image || "/placeholder.svg"}
                      alt="Product"
                      fill
                      className="object-cover lg:rounded-md"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 p-4 lg:p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 lg:gap-6">
                      {/* Order Info */}
                      <div className="lg:col-span-2">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between lg:justify-start lg:space-x-4">
                            <span className="text-sm text-gray-500">
                              তারিখ: {order.date}
                            </span>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </div>
                          <h3 className="font-semibold text-gray-900">
                            {order.customer}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            {order.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-3 w-3 mr-1" />
                            {order.location}
                          </div>
                        </div>
                      </div>

                      {/* Pricing Info */}
                      <div className="lg:col-span-2">
                        <div className="grid grid-cols-3 gap-4 lg:gap-2">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">দাম</p>
                            <p className="font-semibold text-green-600">
                              ৳{order.price}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              বিক্রয়
                            </p>
                            <p className="font-semibold">
                              ৳{order.sold.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">প্রফিট</p>
                            <p
                              className={`font-semibold ${
                                order.profit >= 0
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              ৳{order.profit.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Order Number */}
                      <div className="lg:col-span-1 flex items-center justify-between lg:justify-center">
                        <span className="text-sm text-gray-500 lg:hidden">
                          Order #
                        </span>
                        <span className="font-bold text-lg text-gray-900">
                          #{order.id}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="lg:col-span-1 flex items-center justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No orders found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
