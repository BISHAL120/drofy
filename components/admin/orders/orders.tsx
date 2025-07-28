"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { jsPDF } from "jspdf";
import {
  Download,
  Eye,
  MoreVertical,
  Printer,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const getStatusColor = (status: string) => {
  switch (status) {
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "PROCESSING":
      return "bg-blue-100 text-blue-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "DELIVERED":
      return "bg-purple-100 text-purple-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPaymentMethodColor = (method: string) => {
  switch (method) {
    case "COD":
      return "bg-orange-100 text-orange-800";
    case "PREPAID":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface OrderProps {
  id: string;
  orderCount: number;
  customerName: string;
  reseller: {
    name: string;
  };
  cartItems: {
    productName: string;
  }[];
  status: string;
  chargeStatus: string;
  totalPrice: string;
  totalProfit: number | null;
  createdAt: Date;
}

export default function OrdersPage({ orders }: { orders: OrderProps[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const router = useRouter();

  useEffect(() => {
    // Create timeout to delay URL update
    const timeoutId = setTimeout(() => {
      // Build query params object
      const params = new URLSearchParams();

      if (searchTerm) params.set("search", searchTerm);
      if (statusFilter && statusFilter !== "all")
        params.set("status", statusFilter);
      if (paymentFilter && paymentFilter !== "all")
        params.set("payment", paymentFilter);

      // Construct URL with query params
      const url = `/admin/orders${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      // Only update URL if params changed
      if (url !== window.location.pathname + window.location.search) {
        router.push(url);
      }
    }, 100); // 1 second delay

    // Cleanup timeout on unmount or when dependencies change
    return () => clearTimeout(timeoutId);
  }, [searchTerm, statusFilter, paymentFilter, router]);

  const downloadPDF = async () => {
    try {
      // Create PDF document
      const doc = new jsPDF();

      // Add title and header
      doc.setFontSize(18);
      doc.text("Orders Report", 14, 20);

      doc.setFontSize(12);
      doc.text(
        `Generated on: ${format(new Date(), "dd MMM yyyy HH:mm")}`,
        14,
        30
      );
      doc.text(`Total Orders: ${orders.length}`, 14, 40);

      // Draw a line
      doc.line(14, 45, 196, 45);

      let yPosition = 55;
      const pageHeight = doc.internal.pageSize.height;
      const margin = 14;
      const lineHeight = 6;

      // Table headers
      doc.setFontSize(10);
      // doc.setFont(undefined, 'bold');
      doc.text("Order ID", margin, yPosition);
      doc.text("Customer", margin + 25, yPosition);
      doc.text("Reseller", margin + 60, yPosition);
      // doc.text("Status", margin + 95, yPosition);
      doc.text("Payment", margin + 120, yPosition);
      doc.text("Amount", margin + 145, yPosition);
      doc.text("Date", margin + 170, yPosition);

      yPosition += 5;
      doc.line(margin, yPosition, 196, yPosition);
      yPosition += 10;

      // doc.setFont(undefined, 'normal');

      // Add order data
      orders.forEach((order) => {
        // Check if we need a new page
        if (yPosition > pageHeight - 30) {
          doc.addPage();
          yPosition = 20;

          // Re-add headers on new page
          // doc.setFont(undefined, 'bold');
          doc.text("Order ID", margin, yPosition);
          doc.text("Customer", margin + 25, yPosition);
          doc.text("Reseller", margin + 60, yPosition);
          // doc.text("Status", margin + 95, yPosition);
          doc.text("Payment", margin + 120, yPosition);
          doc.text("Amount", margin + 145, yPosition);
          doc.text("Date", margin + 170, yPosition);

          yPosition += 5;
          doc.line(margin, yPosition, 196, yPosition);
          yPosition += 10;
          // doc.setFont(undefined, 'normal');
        }

        // Truncate long text to fit
        const truncateText = (text: string, maxLength: number) =>
          text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

        doc.text(`ORD-${order.orderCount}`, margin, yPosition);
        doc.text(truncateText(order.customerName, 12), margin + 25, yPosition);
        doc.text(truncateText(order.reseller.name, 12), margin + 60, yPosition);
        // doc.text(order.status, margin + 95, yPosition);
        doc.text(order.chargeStatus, margin + 120, yPosition);
        doc.text(order.totalPrice.toString(), margin + 145, yPosition);
        doc.text(format(order.createdAt, "dd MMM yy"), margin + 170, yPosition);

        yPosition += lineHeight;

        /* // Add products as a sub-row if there's space
      if (order.cartItems.length > 0) {
        const products = order.cartItems
          .map(item => item.productName)
          .join(", ");
        const truncatedProducts = truncateText(products, 80);
        
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(`Products: ${truncatedProducts}`, margin + 5, yPosition);
        doc.setFontSize(10);
        doc.setTextColor(0);
        yPosition += 4;
      } */

        yPosition += 2; // Add some spacing between orders
      });

      // Add footer
      const totalPages = doc.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text(
          `Page ${i} of ${totalPages}`,
          doc.internal.pageSize.width - 30,
          doc.internal.pageSize.height - 10
        );
      }

      // Save the PDF
      doc.save(`orders-report-${format(new Date(), "yyyy-MM-dd-HHmm")}.pdf`);

      console.log("PDF downloaded successfully");
    } catch (error) {
      console.error("Error generating PDF:", error);
      // You can add a toast notification here if you have one set up
      alert("Error generating PDF. Please try again.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            <p className="text-muted-foreground">
              Manage and track all customer orders
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={downloadPDF} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>
              View and manage all orders from resellers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by Order ID or Reseller..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="COD">Cash on Delivery</SelectItem>
                  <SelectItem value="PREPAID">Prepaid</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setPaymentFilter("all");
                  router.push("/admin/orders");
                }}
              >
                Reset Filters
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Reseller</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.orderCount}>
                      <TableCell className="font-medium">
                        ORD-{order.orderCount.toString().padStart(3, "0")}
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            {order.customerName.slice(0, 10)}{" "}
                            {order.customerName.length > 10 ? "..." : ""}
                          </TooltipTrigger>
                          <TooltipContent>{order.customerName}</TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Tooltip>
                          <TooltipTrigger>
                            {order.reseller.name.slice(0, 10)}{" "}
                            {order.reseller.name.length > 10 ? "..." : ""}
                          </TooltipTrigger>
                          <TooltipContent>{order.reseller.name}</TooltipContent>
                        </Tooltip>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <div className="flex flex-wrap gap-1">
                          {order.cartItems.slice(0, 2).map((item, index) => (
                            <span
                              key={index}
                              className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 truncate"
                              title={item.productName}
                            >
                              {item.productName}
                            </span>
                          ))}
                          {order.cartItems.length > 2 && (
                            <Tooltip>
                              <TooltipTrigger>
                                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 truncate">
                                  +{order.cartItems.length - 2} more
                                </span>
                              </TooltipTrigger>
                              <TooltipContent className="space-y-1.5">
                                {order.cartItems.slice(2).map((item, index) => (
                                  <div key={index}>{item.productName}</div>
                                ))}
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getPaymentMethodColor(order.chargeStatus)}
                        >
                          {order.chargeStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>{order.totalProfit}</TableCell>
                      <TableCell>
                        {format(order.createdAt, "dd MMM yyyy")}
                      </TableCell>
                      <TableCell className="space-x-1.5">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild className="border">
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link
                                href={`/admin/orders/${order.id}`}
                                className="flex items-center"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Printer className="mr-2 h-4 w-4" />
                              Print Invoice
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {orders.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No orders found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
