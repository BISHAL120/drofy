"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Sample data based on the image
const salesData = [
  {
    date: "2025-04-12",
    pieces: 1,
    purchasePrice: 299,
    salePrice: 600,
    profit: 301,
  },
  {
    date: "2025-04-12",
    pieces: 1,
    purchasePrice: 130,
    salePrice: 500,
    profit: 190,
  },
  {
    date: "2025-03-25",
    pieces: 1,
    purchasePrice: 699,
    salePrice: 1000,
    profit: 301,
  },
  {
    date: "2025-03-12",
    pieces: 1,
    purchasePrice: 470,
    salePrice: 1200,
    profit: 730,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 850,
    salePrice: 850,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 700,
    salePrice: 700,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 850,
    salePrice: 850,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 780,
    salePrice: 780,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 780,
    salePrice: 780,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 750,
    salePrice: 750,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 750,
    salePrice: 750,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 620,
    salePrice: 620,
    profit: 0,
  },
  {
    date: "2025-03-09",
    pieces: 1,
    purchasePrice: 680,
    salePrice: 680,
    profit: 0,
  },
  {
    date: "2025-01-24",
    pieces: 1,
    purchasePrice: 699,
    salePrice: 1000,
    profit: 301,
  },
  {
    date: "2025-01-16",
    pieces: 1,
    purchasePrice: 130,
    salePrice: 500,
    profit: 190,
  },
];

type SortField = "date" | "pieces" | "purchasePrice" | "salePrice" | "profit";
type SortDirection = "asc" | "desc";

export default function SalesProfitDashboard() {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Calculate totals
  const totalPieces = salesData.reduce((sum, item) => sum + item.pieces, 0);
  const totalPurchase = salesData.reduce(
    (sum, item) => sum + item.purchasePrice,
    0
  );
  const totalRevenue = salesData.reduce((sum, item) => sum + item.salePrice, 0);
  const totalProfit = salesData.reduce((sum, item) => sum + item.profit, 0);
  const profitMargin =
    totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0";

  // Sort data
  const sortedData = [...salesData].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "date") {
      aValue = new Date(a.date).getTime();
      bValue = new Date(b.date).getTime();
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  /*    const formatCurrency = (amount: number) => {
           return new Intl.NumberFormat("bn-BD", {
               style: "currency",
               currency: "BDT",
               minimumFractionDigits: 0,
           }).format(amount)
       } */

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-2">
          <TrendingUp className="h-8 w-8 text-green-600" />
          সেলস & প্রফিট ড্যাশবোর্ড
        </h1>
        <p className="text-gray-600">বিক্রয় এবং মুনাফার বিস্তারিত তথ্য</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট পিস</CardTitle>
            <Package className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPieces}</div>
            <p className="text-xs text-blue-100">বিক্রিত পণ্যের সংখ্যা</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              মোট ক্রয়মূল্য
            </CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{totalPurchase.toLocaleString()}
            </div>
            <p className="text-xs text-orange-100">পণ্য ক্রয়ের খরচ</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট বিক্রয়</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-green-100">মোট বিক্রয়ের পরিমাণ</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">মোট প্রফিট</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{totalProfit.toLocaleString()}
            </div>
            <p className="text-xs text-purple-100">মার্জিন: {profitMargin}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            বিক্রয়ের বিস্তারিত তথ্য
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("date")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      অর্ডার তারিখ
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("pieces")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      পিস
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("purchasePrice")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      ক্রয়মূল্য
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("salePrice")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      বিক্রয়মূল্য
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("profit")}
                      className="h-auto p-0 font-semibold hover:bg-transparent"
                    >
                      প্রফিট
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((row, index) => (
                  <TableRow
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      {formatDate(row.date)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{row.pieces}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ৳{row.purchasePrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      ৳{row.salePrice.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      <span
                        className={`flex items-center justify-end gap-1 ${
                          row.profit > 0
                            ? "text-green-600"
                            : row.profit < 0
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {row.profit > 0 && <TrendingUp className="h-4 w-4" />}
                        {row.profit < 0 && <TrendingDown className="h-4 w-4" />}
                        ৳{row.profit.toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Total Row */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm font-semibold bg-gray-50 p-4 rounded-lg">
              <div className="text-center md:text-left">
                <span className="text-gray-600">টোটাল সেলস & প্রফিট</span>
              </div>
              <div className="text-center">
                <Badge variant="secondary">{totalPieces} পিস</Badge>
              </div>
              <div className="text-center md:text-right">
                <span className="text-orange-600">
                  ৳{totalPurchase.toLocaleString()}
                </span>
              </div>
              <div className="text-center md:text-right">
                <span className="text-green-600">
                  ৳{totalRevenue.toLocaleString()}
                </span>
              </div>
              <div className="text-center md:text-right">
                <span className="text-purple-600 flex items-center justify-center md:justify-end gap-1">
                  <TrendingUp className="h-4 w-4" />৳
                  {totalProfit.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
