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
import { ResellerLevel, UserStatus } from "@prisma/client";
import axios from "axios";
import { format } from "date-fns";
import { Ban, Eye, PhoneCallIcon, Search, Undo2, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ConfirmationDialog from "../components/confirmationDialog";

const getLevelColor = (level: string) => {
  switch (level) {
    case "LEGENDARY":
      return "bg-purple-100 text-purple-800";
    case "ELITE":
      return "bg-indigo-100 text-indigo-800";
    case "GOLD":
      return "bg-yellow-100 text-yellow-800";
    case "SILVER":
      return "bg-gray-100 text-gray-800";
    case "BRONZE":
      return "bg-orange-100 text-orange-800";
    case "BEGINNER":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-200 text-green-800";
    case "INACTIVE":
      return "bg-yellow-400 text-black/70";
    case "BLOCKED":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface AllResellerProps {
  allResellers: {
    id: string;
    profileImage: string | null;
    name: string;
    referralCode: number;
    phone: string;
    email: string | null;
    resellerLevel: ResellerLevel;
    saleCount: number | null;
    totalRevenue: number | null;
    wallet: number;
    status: UserStatus;
    createdAt: Date;
  }[];
  totalResellerCount: number;
}

const AllResellersPage = ({
  allResellers,
  totalResellerCount,
}: AllResellerProps) => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [level, setLevel] = useState(searchParams.get("level") || "all");
  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const totalPages = Math.ceil(totalResellerCount / 10);

  useEffect(() => {
    // Create timeout to delay URL update
    const timeoutId = setTimeout(() => {
      // Build query params object
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (level && level !== "all") params.set("level", level);
      if (status && status !== "all") params.set("status", status);
      if (currentPage) params.set("page", currentPage.toString());

      // Construct URL with query params
      const url = `/admin/resellers${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      // Only update URL if params changed
      if (url !== window.location.pathname + window.location.search) {
        router.push(url);
      }
    }, 500); // 1 second delay

    // Cleanup timeout on unmount or when dependencies change
    return () => clearTimeout(timeoutId);
  }, [search, level, status, router, currentPage]);

  const handleAccountBlocked = ({
    id,
    status,
  }: {
    id: string;
    status: string;
  }) => {
    setIsLoading(true);
    toast.loading("Updating account status...");
    axios
      .patch("/api/admin/reseller", {
        id,
        status: status === "BLOCKED" ? "ACTIVE" : "BLOCKED",
        isActive: status === "BLOCKED" ? true : false,
      })
      .then((res) => {
        console.log(res.data);
        toast.dismiss();
        toast.success(res.data.message);
        setIsLoading(false);
        router.refresh();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error(err.response.data.message);
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Resellers</h2>
            <p className="text-muted-foreground">
              Manage your reseller network and partnerships
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href={`/admin/resellers/invite`}>
                <UserPlus className="mr-2 h-4 w-4" />
                Invite Reseller
              </Link>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Reseller Management</CardTitle>
            <CardDescription>
              View and manage all resellers in your network
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by name or phone..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="LEGENDARY">Legendary</SelectItem>
                  <SelectItem value="ELITE">Elite</SelectItem>
                  <SelectItem value="GOLD">Gold</SelectItem>
                  <SelectItem value="SILVER">Silver</SelectItem>
                  <SelectItem value="BRONZE">Bronze</SelectItem>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="ACTIVE">Active</SelectItem>
                  <SelectItem value="INACTIVE">Inactive</SelectItem>
                  <SelectItem value="BLOCKED">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reseller</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Sales</TableHead>
                    <TableHead>Wallet</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allResellers.map((reseller) => (
                    <TableRow key={reseller.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={reseller.profileImage || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {reseller.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{reseller.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {`RES-${reseller.referralCode
                                .toString()
                                .padStart(3, "0")}`}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{reseller.phone}</div>
                          <div className="text-sm text-muted-foreground">
                            {reseller.email ? reseller.email : "NO (email)"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getLevelColor(reseller.resellerLevel)}
                        >
                          {reseller.resellerLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {reseller.saleCount
                          ? reseller.saleCount
                          : "NO (orders)"}
                      </TableCell>
                      <TableCell>
                        {reseller.totalRevenue
                          ? reseller.totalRevenue
                          : "NO (sales)"}
                      </TableCell>
                      <TableCell>{reseller.wallet}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(reseller.status)}>
                          {reseller.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(reseller.createdAt, "yyyy-MM-dd")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Tooltip>
                            <Button
                              disabled={isLoading}
                              asChild
                              variant="ghost"
                              size="sm"
                              className="border"
                            >
                              <TooltipTrigger>
                                <Link
                                  href={`/admin/resellers/new/${reseller.id}`}
                                >
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </TooltipTrigger>
                            </Button>
                            <TooltipContent>View details</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <Button
                              disabled={isLoading}
                              asChild
                              variant="ghost"
                              size="sm"
                              className="border"
                            >
                              <TooltipTrigger>
                                <Link
                                  href={`https://wa.me/+880${reseller.phone}`}
                                  target="_blank"
                                >
                                  <PhoneCallIcon className="h-4 w-4" />
                                </Link>
                              </TooltipTrigger>
                            </Button>
                            <TooltipContent>Call reseller</TooltipContent>
                          </Tooltip>
                          <ConfirmationDialog
                            trigger={
                              <div className="border px-3 py-[7px] rounded-md flex justify-center items-center">
                                <Tooltip>
                                  <TooltipTrigger disabled={isLoading}>
                                    {reseller.status === "BLOCKED" ? (
                                      <Undo2 className="h-4 w-4" />
                                    ) : (
                                      <Ban className="h-4 w-4" />
                                    )}
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {reseller.status === "BLOCKED"
                                      ? "Unblock Account"
                                      : "Block Account"}
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            }
                            currentState={reseller.status === "BLOCKED"}
                            title={
                              reseller.status === "BLOCKED"
                                ? "Unblock Account"
                                : "Block Account"
                            }
                            description={
                              reseller.status === "BLOCKED"
                                ? "Are you sure you want to unblock this account?"
                                : "Are you sure you want to block this account?"
                            }
                            onConfirm={() => {
                              handleAccountBlocked({
                                id: reseller.id,
                                status: reseller.status,
                              });
                            }}
                          />
                          <Button variant="ghost" size="sm"></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Pagination start */}
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="text-muted-foreground flex-1 text-sm">
                Page {currentPage + 1} of {totalPages}
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 0}
                  className={
                    currentPage === 0
                      ? "text-muted-foreground cursor-not-allowed"
                      : ""
                  }
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages - 1}
                  className={
                    currentPage === totalPages - 1
                      ? "text-muted-foreground cursor-not-allowed"
                      : ""
                  }
                >
                  Next
                </Button>
              </div>
            </div>
            {/* Pagination end */}
            {allResellers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No resellers found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AllResellersPage;
