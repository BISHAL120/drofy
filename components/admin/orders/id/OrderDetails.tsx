"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { format, formatDistanceToNow } from "date-fns";
import {
  Calendar,
  DollarSign,
  Edit,
  Loader2,
  MapPin,
  MessageSquare,
  Package,
  PackageCheckIcon,
  Phone,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

// Mock data based on your Prisma schema
const orderData = {
  id: "ORD-001",
  orderCount: 1001,
  reseller: {
    id: "RES-001",
    name: "Alex Thompson",
    email: "alex@example.com",
    phone: "+1234567890",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  customerName: "John Doe",
  customerPhone: "+8801712345678",
  customerDivision: "Dhaka",
  customerDistrict: "Dhaka",
  customerUpazila: "Dhanmondi",
  customerUnion: "Ward 15",
  customerAddress: "House 123, Road 27, Block A, Dhanmondi, Dhaka-1209",
  deliveryCharge: "60",
  advanceCharge: true,
  totalPrice: "2547",
  totalProfit: 382.05,
  comments: "Please deliver between 2-5 PM. Customer prefers cash payment.",
  status: "PROCESSING",
  chargeStatus: "COD",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:20:00Z",
  completedAt: null,
  cartItems: [
    {
      id: "CART-001",
      productId: "PROD-001",
      productName: "iPhone 15 Pro",
      productPrice: "999",
      sellingPrice: "1149",
      profit: "150",
      productImage: "/placeholder.svg?height=80&width=80",
      productQuantity: "1",
      productSize: "128GB",
      productSubcategory: "Smartphones",
    },
    {
      id: "CART-002",
      productId: "PROD-002",
      productName: "AirPods Pro",
      productPrice: "249",
      sellingPrice: "289",
      profit: "40",
      productImage: "/placeholder.svg?height=80&width=80",
      productQuantity: "2",
      productSize: "Standard",
      productSubcategory: "Audio",
    },
    {
      id: "CART-003",
      productId: "PROD-003",
      productName: "iPhone Case",
      productPrice: "25",
      sellingPrice: "35",
      profit: "10",
      productImage: "/placeholder.svg?height=80&width=80",
      productQuantity: "3",
      productSize: "iPhone 15 Pro",
      productSubcategory: "Accessories",
    },
  ],
};

const getChargeStatusColor = (status: string) => {
  switch (status) {
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
  advanceCharge: boolean;
  deliveryCharge: string;
  orderNumber: number;
  status: string;
  chargeStatus: string;
  totalPrice: string;
  totalProfit: number | null;
  customerName: string;
  customerPhone: string;
  customerDivision: string;
  customerDistrict: string;
  customerUpazila: string;
  customerUnion: string;
  customerAddress: string;
  comments: string;
  note: string | null;
  tracking_code: string | null;
  createdAt: Date;
  updatedAt: Date;
  cartItems: {
    productName: string;
    productPrice: string;
    sellingPrice: string;
    profit: string;
    productImage: string;
    productQuantity: string;
    productSize: string;
    productSubcategory: string;
  }[];
  reseller: {
    name: string;
    phone: string;
    email: string | null;
    profileImage: string | null;
  };
}

export default function OrderDetailsPage({ order }: { order: OrderProps }) {
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [note, setNote] = useState(order.note);
  const [deliveryCharge, setDeliveryCharge] = useState(order.deliveryCharge);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStatusUpdate = () => {
    toast.loading("Updating order status...");
    setLoading(true);

    axios
      .patch(`/api/admin/orders`, {
        id: order.id,
        status: orderStatus,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.dismiss();
        router.refresh();
        toast.success("Status Updated", {
          description: "Order status has been updated successfully.",
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.message, {
          duration: 5000,
        });
      });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleNoteUpdate = () => {
    toast.loading("Updating order note...");
    setLoading(true);

    axios
      .patch(`/api/admin/orders`, {
        id: order.id,
        note,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.dismiss();
        router.refresh();
        toast.success("Note Updated", {
          description: "Order note has been updated successfully.",
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.message, {
          duration: 5000,
        });
      });
  };

  const haddleCourier = (orderId: string) => {
    setLoading(true);
    toast.loading("Assigning courier...");
    axios
      .post("/api/steadFast/create_order", {
        orderId,
      })
      .then((res) => {
        setLoading(false);
        toast.dismiss();
        router.refresh();
        router.push("/admin/orders");
        toast.success(res.data.message, {
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.message, {
          duration: 5000,
        });
      });
  };

  const handleDeliveryChargeUpdate = () => {
    toast.loading("Updating delivery charge...");
    setLoading(true);

    console.log(deliveryCharge);

    axios
      .patch(`/api/admin/orders`, {
        id: order.id,
        deliveryCharge: deliveryCharge,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.dismiss();
        router.refresh();
        toast.success("Delivery Charge Updated", {
          description: "Order delivery charge has been updated successfully.",
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.dismiss();
        toast.error(err.response.data.message, {
          duration: 5000,
        });
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Order #{order.orderNumber}
              </h2>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!order.tracking_code ? (
              <Button
                onClick={() => haddleCourier(order.id)}
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                ) : (
                  <PackageCheckIcon className="mr-2 h-5 w-5" />
                )}
                Add Courier
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-green-600 font-medium">
                <Truck className="h-5 w-5" />
                <span>Already Added to Courier</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Order Items ({order.cartItems.length} items)
                </CardTitle>
                <CardDescription>Products in this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productName || "Product Image"}
                        width={80}
                        height={80}
                        className="rounded-md"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.productName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.productSubcategory}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-sm">
                            Size: <strong>{item.productSize}</strong>
                          </span>
                          <span className="text-sm">
                            Qty: <strong>{item.productQuantity}</strong>
                          </span>
                          <span className="text-sm">
                            Price: <strong>৳{item.sellingPrice}</strong>
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          ৳
                          {(
                            Number.parseFloat(item.sellingPrice) *
                            Number.parseInt(item.productQuantity)
                          ).toFixed(2)}
                        </p>
                        <p className="text-sm text-green-600">
                          Profit: ৳
                          {(
                            Number.parseFloat(item.profit) *
                            Number.parseInt(item.productQuantity)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <Separator className="my-6" />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>৳{order.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>৳{order.deliveryCharge}</span>
                  </div>
                  {order.advanceCharge ? (
                    <div className="flex justify-between text-blue-600">
                      <span>Advance Charge Applied:</span>
                      <span>Yes</span>
                    </div>
                  ) : (
                    <div className="flex justify-between text-red-600">
                      <span>Advance Charge Applied:</span>
                      <span>No</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>
                      ৳{Number(order.totalPrice) + Number(order.deliveryCharge)}
                    </span>
                  </div>
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Total Profit:</span>
                    <span>৳{order.totalProfit?.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Customer Name</Label>
                    <p className="text-sm text-muted-foreground">
                      {order.customerName}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone Number</Label>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Phone className="mr-1 h-3 w-3" />
                      {order.customerPhone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-sm font-medium">Division</Label>
                    <p className="text-sm text-muted-foreground">
                      {order.customerDivision}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">District</Label>
                    <p className="text-sm text-muted-foreground">
                      {orderData.customerDistrict}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Upazila</Label>
                    <p className="text-sm text-muted-foreground">
                      {order.customerUpazila}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Union</Label>
                    <p className="text-sm text-muted-foreground">
                      {order.customerUnion}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-sm font-medium">Full Address</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    {order.customerAddress}
                  </p>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label className="text-sm font-medium">
                      Delivery Charge
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="number"
                        value={deliveryCharge}
                        onChange={(e) => {
                          setDeliveryCharge(e.target.value);
                        }}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      />
                      <Button
                        onClick={() => {
                          handleDeliveryChargeUpdate();
                        }}
                        disabled={loading}
                        size="sm"
                      >
                        {loading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Update
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Comments & Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2">
                    Order Comments
                  </Label>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {order.comments || "No comments provided"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">Admin Notes</Label>
                    <Button
                      disabled={loading}
                      onClick={handleNoteUpdate}
                      variant="ghost"
                      size="sm"
                      className="h-8 border"
                    >
                      <Edit className="h-3.5 w-3.5 mr-1" />
                      Save Note
                    </Button>
                  </div>
                  <Textarea
                    value={note || ""}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add internal notes about this order..."
                    rows={3}
                    className="resize-none focus-visible:ring-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Current Status</Label>
                  <Select value={order.status} onValueChange={setOrderStatus}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PROCESSING">Processing</SelectItem>
                      <SelectItem value="DELIVERED">Delivered</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  disabled={loading}
                  onClick={handleStatusUpdate}
                  className="w-full"
                >
                  Update Status
                </Button>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Shipping Charge:</span>
                  <Badge className={getChargeStatusColor(order.chargeStatus)}>
                    {order.chargeStatus}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Amount:</span>
                  <span className="font-semibold">৳{order.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Delivery Charge:</span>
                  <span>৳{order.deliveryCharge}</span>
                </div>
                {/*  <div className="flex justify-between">
                  <span className="text-sm">Advance Charge:</span>
                  <span>{order.advanceCharge ? "Applied" : "Not Applied"}</span>
                </div> */}
              </CardContent>
            </Card>

            {/* Reseller Information */}
            <Card>
              <CardHeader>
                <CardTitle>Reseller Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage
                      src={order.reseller.profileImage || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {order.reseller.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{order.reseller.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.reseller.email}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.reseller.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Created:</span>
                  <span className="text-sm">
                    {formatDate(format(order.createdAt, "yyyy-MM-dd"))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Last Updated:</span>
                  <span className="text-sm">
                    {formatDistanceToNow(order.updatedAt, { addSuffix: true })}
                  </span>
                </div>
                {orderData.completedAt && (
                  <div className="flex justify-between">
                    <span className="text-sm">Completed:</span>
                    <span className="text-sm">
                      {formatDate(orderData.completedAt)}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {order.tracking_code && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent"
                  >
                    <Link
                      target="_blank"
                      href={`https://steadfast.com.bd/t/${order.tracking_code}`}
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Track Delivery
                    </Link>
                  </Button>
                )}
                <Button variant="outline" className="w-full bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Customer
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
