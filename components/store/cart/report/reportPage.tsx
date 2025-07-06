"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import axios from "axios";
import { TriangleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

// Define the search result type
type CourierDetails = {
  courier_name: string;
  total_parcels: number;
  total_delivered_parcels: number;
  total_cancelled_parcels: number;
};

type SearchResultType = {
  mobile_number: string;
  total_parcels: number;
  total_delivered: number;
  total_cancel: number;
  apis: {
    [key: string]: CourierDetails;
  };
};

const ReportPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  // Handle phone number input change
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 11) {
      // Limit to 11 digits
      setPhoneNumber(value);
    }
  };

  // Handle search with API call
  const handleSearch = async () => {
    // Validate Bangladeshi phone number format
    const isValidBangladeshiNumber = (number: string) => {
      const regex = /^(?:\+88|88)?01[3-9]\d{8}$/;
      return regex.test(number);
    };

    if (!phoneNumber.trim() || !isValidBangladeshiNumber(phoneNumber)) {
      toast.error("নাম্বারটি সঠিক নয়", {
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
    if (!phoneNumber.trim() || phoneNumber.length < 11) return;

    setIsLoading(true);

    try {
      setIsLoading(true);
      // Using axios to handle CORS issues
      await axios
        .post("/api/store/fraudCheck", {
          number: phoneNumber,
        })
        .then((res) => {
          setIsLoading(false);
          console.log(res.data.data);
          setSearchResults(res.data.data);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("দুঃখিত, ডেটা লোড করা যায়নি", {
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
    } finally {
      setIsLoading(false);
    }
  };

  // Get color based on success rate
  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return "text-green-600 border-green-500";
    if (rate >= 50) return "text-yellow-600 border-yellow-500";
    return "text-red-600 border-red-500";
  };

  // Get background color for success rate
  const getSuccessRateBackground = (rate: number) => {
    if (rate >= 80) return "bg-green-500";
    if (rate >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card - Delivery Success Ratio */}
        <Card className="shadow-md">
          <CardHeader className="">
            <div className="flex justify-center items-center space-x-2">
              <Image
                src="/assets/logo.webp"
                alt="Restock BD"
                unoptimized
                width={40}
                height={40}
                className="h-12 w-auto"
              />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-8">
            <h2 className="text-xl font-semibold mb-6">
              Delivery Success Ratio
            </h2>

            {isLoading ? (
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-gray-500">Loading...</span>
                </div>
              </div>
            ) : searchResults ? (
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div
                  className={`w-full h-full rounded-full border-[16px] ${getSuccessRateBackground(
                    (searchResults.total_delivered /
                      searchResults.total_parcels) *
                      100
                  )} ${getSuccessRateColor(
                    (searchResults.total_delivered /
                      searchResults.total_parcels) *
                      100
                  )}`}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {searchResults.total_parcels > 0
                      ? Math.round(
                          (searchResults.total_delivered /
                            searchResults.total_parcels) *
                            100
                        )
                      : 0}
                    %
                  </span>
                </div>
                {searchResults.total_delivered === 0 && (
                  <div className="absolute bottom-0 w-full text-center text-red-600 font-semibold">
                    0%
                  </div>
                )}
              </div>
            ) : (
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="w-full h-full rounded-full border-[16px] border-gray-200"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-gray-400">0%</span>
                </div>
              </div>
            )}

            {searchResults &&
              (searchResults.total_delivered / searchResults.total_parcels) *
                100 ===
                100 && (
                <p className="mt-4 text-sm text-center text-gray-600">
                  এই কাস্টমারকে নিশ্চিন্তে প্রোডাক্ট দিতে পারেন।
                </p>
              )}
          </CardContent>
        </Card>

        {/* Right Card - Search and Results */}
        <Card className="shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl text-center">Fraud Checker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <Input
                type="tel"
                placeholder="Mobile Number (11 digits)"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="flex-1"
                maxLength={11}
                pattern="^(?:\+88|88)?01[3-9]\d{8}$"
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity(
                    "Please enter a valid Bangladeshi phone number"
                  );
                }}
                onInput={(e) => {
                  e.currentTarget.setCustomValidity("");
                }}
              />
              <Button
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600"
                disabled={isLoading || phoneNumber.length !== 11}
              >
                {isLoading ? "Loading..." : "রিপোর্ট দেখুন"}
              </Button>
            </div>

            {searchResults && !isLoading && (
              <div className="space-y-6">
                {/* Rest of the component remains the same */}
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 p-3 rounded-md">
                    <div className="text-blue-500 text-xl font-bold">
                      {searchResults.total_parcels}
                    </div>
                    <div className="text-xs text-gray-600">মোট অর্ডার</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-md">
                    <div className="text-green-500 text-xl font-bold">
                      {searchResults.total_delivered}
                    </div>
                    <div className="text-xs text-gray-600">মোট ডেলিভারি</div>
                  </div>
                  <div className="bg-red-50 p-3 rounded-md">
                    <div className="text-red-500 text-xl font-bold">
                      {searchResults.total_cancel}
                    </div>
                    <div className="text-xs text-gray-600">মোট বাতিল</div>
                  </div>
                </div>

                {/* Courier Tabs */}
                <div className="flex justify-between border-b border-gray-200 text-sm">
                  <button className="px-4 py-2 font-medium border-b-2 border-blue-500">
                    কুরিয়ার
                  </button>
                  <button className="px-4 py-2 text-gray-500">অর্ডার</button>
                  <button className="px-4 py-2 text-gray-500">ডেলিভারি</button>
                  <button className="px-4 py-2 text-gray-500">বাতিল</button>
                  <button className="px-4 py-2 text-gray-500">
                    ডেলিভারি হার
                  </button>
                </div>

                {/* Courier Data Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableBody>
                      {Object.entries(searchResults.apis).map(
                        ([key, courier]) => (
                          <TableRow key={key}>
                            <TableCell className="font-medium">
                              {courier.courier_name}
                            </TableCell>
                            <TableCell className="text-center">
                              {courier.total_parcels}
                            </TableCell>
                            <TableCell className="text-center">
                              {courier.total_delivered_parcels}
                            </TableCell>
                            <TableCell className="text-center">
                              {courier.total_cancelled_parcels}
                            </TableCell>
                            <TableCell className="text-center">
                              {courier.total_parcels > 0
                                ? `${Math.round(
                                    (courier.total_delivered_parcels /
                                      courier.total_parcels) *
                                      100
                                  )}%`
                                : "N/A"}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirm Order Button */}
      <div className="mt-8 text-center">
        <Link href="/store/cart/checkOut">
          <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 text-lg rounded-md shadow-md">
            অর্ডার কনফার্ম করুন
          </Button>
        </Link>
        {searchResults &&
          (searchResults.total_delivered / searchResults.total_parcels) * 100 <
            50 && (
            <p className="mt-2 text-red-500 text-sm">
              এই কাস্টমারের ডেলিভারি হার কম। অর্ডার কনফার্ম করার আগে সতর্কতা
              অবলম্বন করুন।
            </p>
          )}
      </div>
    </div>
  );
};

export default ReportPage;
