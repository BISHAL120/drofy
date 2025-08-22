"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WalletTransactionType } from "@prisma/client";
import { format, formatDistanceToNow } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";


interface StatementsProps {
  statements: {
    id: string;
    createdAt: Date;
    amount: number;
    walletBalance: number;
    type: WalletTransactionType;
    details: string;
  }[];
}

export default function BalanceStatement({ statements }: StatementsProps) {

  const formatAmount = (amount: number) => {
    const isPositive = amount > 0;
    const isZero = amount === 0;
    return {
      value: Math.abs(amount).toLocaleString(),
      isPositive,
      isZero,
    };
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          ব্যালেন্স স্টেটমেন্ট
        </h1>
      </div>

      {/* Search and Controls */}
      {/* <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden sm:inline">Show:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-600 hidden sm:inline">
            entries
          </span>
        </div>
      </div> */}

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    তারিখ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ট্রানজেকশন ডিটেইলস
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    টাকা
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ব্যালেন্স
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {statements.map((transaction) => {
                  const amount = formatAmount(transaction.amount);
                  return (
                    <tr
                      key={transaction.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <div className="font-medium">{format(transaction.createdAt, 'yyyy-MM-dd')}</div>
                          <div className="text-gray-500 text-xs">
                            {formatDistanceToNow(transaction.createdAt)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                        <div className="line-clamp-2">
                          {transaction.details}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        {amount.isZero ? (
                          <span className="text-gray-500">0</span>
                        ) : (
                          <span
                            className={
                              amount.isPositive
                                ? "text-green-600 font-medium"
                                : "text-red-600 font-medium"
                            }
                          >
                            {transaction.amount > 0 ? "+" : ""}
                            {transaction.amount}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                        {transaction.walletBalance}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden space-y-4">
        {statements.map((transaction) => {
          const amount = formatAmount(transaction.amount);
          return (
            <Card
              key={transaction.id}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-900">
                      {format(transaction.createdAt, 'yyyy-MM-dd')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDistanceToNow(transaction.createdAt)}
                    </div>
                  </div>
                  <div className="text-right">
                    {amount.isZero ? (
                      <Badge variant="secondary">0</Badge>
                    ) : (
                      <Badge
                        variant={amount.isPositive ? "default" : "destructive"}
                        className={
                          amount.isPositive
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : ""
                        }
                      >
                        {amount.isPositive ? "+" : ""}
                        {amount.value}
                      </Badge>
                    )}
                    <div className="text-sm text-gray-600 mt-1">
                      Balance: {transaction.walletBalance.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {transaction.details}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="text-sm text-gray-700">
          Showing 1 to 10 of 40 entries
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            /*  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1} */
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={pageNum === 1 ? "default" : "outline"}
                  size="sm"
                  //   onClick={() => setCurrentPage(pageNum)}
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            /* onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, filteredTransactions.length))
            }
            disabled={currentPage === filteredTransactions.length} */
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
