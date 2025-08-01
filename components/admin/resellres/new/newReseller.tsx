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
import {
  CheckCircleIcon,
  Eye,
  MoreVertical,
  PhoneCallIcon,
  Search,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ConfirmationDialog from "../../components/confirmationDialog";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "bg-green-100 text-green-800";
    case "INACTIVE":
      return "bg-yellow-100 text-yellow-800";
    case "BLOCKED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface NewResellerProps {
  name: string;
  id: string;
  phone: string;
  email: string | null;
  profileImage: string | null;
  isActive: boolean;
  status: string;
  wallet: number;
  orderCount: number | null;
  totalRevenue: number | null;
  resellerLevel: string;
  referralCode: number;
  createdAt: Date;
}

const NewResellerPage = ({ resellers }: { resellers: NewResellerProps[] }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleAccountActive = (isActive: boolean, id: string) => {
    setIsLoading(true);
    toast.loading("Updating account status...");
    axios
      .patch("/api/admin/reseller", {
        id,
        isActive: !isActive,
        status: !isActive ? "ACTIVE" : "INACTIVE",
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

  useEffect(() => {
    // Create timeout to delay URL update
    const timeoutId = setTimeout(() => {
      // Build query params object
      const params = new URLSearchParams();

      if (search) params.set("search", search);

      // Construct URL with query params
      const url = `/admin/resellers/new${
        params.toString() ? `?${params.toString()}` : ""
      }`;

      // Only update URL if params changed
      if (url !== window.location.pathname + window.location.search) {
        router.push(url);
      }
    }, 500); // 1 second delay

    // Cleanup timeout on unmount or when dependencies change
    return () => clearTimeout(timeoutId);
  }, [search, router]);

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
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Invite Reseller
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
                  {resellers.map((reseller) => (
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
                              RES-
                              {reseller.referralCode
                                .toString()
                                .padStart(3, "0")}
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
                        <Badge className={"bg-blue-100 text-blue-800"}>
                          {reseller.resellerLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {reseller.orderCount
                          ? reseller.orderCount
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
                          <ConfirmationDialog
                            trigger={
                              <div
                                title="Activate Account"
                                className="border px-3 py-[7px] rounded-md flex justify-center items-center"
                              >
                                <Tooltip>
                                  <TooltipTrigger disabled={isLoading}>
                                    <CheckCircleIcon className="h-4 w-4" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    Activate Account
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            }
                            currentState={!reseller.isActive}
                            title="Activate Account"
                            description="Are you sure you want to activate this account?"
                            onConfirm={() => {
                              handleAccountActive(
                                reseller.isActive,
                                reseller.id
                              );
                            }}
                          />
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="border"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild disabled={isLoading}>
                                <Link
                                  href={`/admin/resellers/id/${reseller.id}`}
                                  className={
                                    isLoading ? "cursor-not-allowed" : ""
                                  }
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild disabled={isLoading}>
                                <Link
                                  href={`tel:+880${reseller.phone}`}
                                  target="_blank"
                                  className={
                                    isLoading ? "cursor-not-allowed" : ""
                                  }
                                >
                                  <PhoneCallIcon className="h-4 w-4 mr-2" />
                                  Call reseller
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {resellers.length === 0 && (
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

export default NewResellerPage;
