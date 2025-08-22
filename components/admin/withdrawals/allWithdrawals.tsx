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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { WithdrawalStatus } from "@prisma/client";
import axios from "axios";
import {
  AlertCircle,
  Check,
  Clock,
  DollarSign,
  Eye,
  MoreVerticalIcon,
  Search,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const getStatusColor = (status: WithdrawalStatus) => {
  switch (status) {
    case "APPROVED":
      return "bg-green-100 text-green-800";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "REJECTED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface WithdrawProps {
  pendingRequests: {
    id: string;
    amount: number;
}[]
  requests: {
    id: string;
    requestId: string;
    number: string;
    status: WithdrawalStatus;
    createdAt: Date;
    processedDate: Date | null;
    amount: number;
    method: string;
    reseller: {
      name: string;
      profileImage: string | null;
    };
  }[];
}

export default function AllWithdrawalsPage({ pendingRequests, requests }: WithdrawProps) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const router = useRouter();

  const total = pendingRequests.reduce((acc, current) => acc + current.amount, 0)



  const handleAcceptRequest = async (id: string) => {
    toast.loading("Processing...");
    setLoading(true);
    axios
      .post(`/api/admin/withdrawals/accept`, { id })
      .then((res) => {
        router.refresh();
        toast.dismiss();
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.dismiss();
        setLoading(false);
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  const handleRejectRequest = async (id: string) => {
    toast.loading("Processing...");
    setLoading(true);
    axios
      .post(`/api/admin/withdrawals/reject`, { id })
      .then((res) => {
        router.refresh();
        toast.dismiss();
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.dismiss();
        setLoading(false);
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-6 md:p-6 p-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Withdrawals</h2>
            <p className="text-muted-foreground">
              Manage reseller withdrawal requests and payouts
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <p className="text-xs text-yellow-600">{total} total</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Approved Today
              </CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-green-600">$2,180 processed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total This Month
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,230</div>
              <p className="text-xs text-blue-600">156 requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-red-600">$1,250 declined</p>
            </CardContent>
          </Card>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle>Withdrawal Requests</CardTitle>
            <CardDescription>
              Review and process reseller withdrawal requests
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            <div className="flex px-3 flex-wrap gap-2 items-center space-x-4 mb-6">
              <div className="relative block xl:flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by ID or reseller..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Reseller</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Processed Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell className="font-medium">
                        {req.requestId}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={
                                req.reseller.profileImage || "/placeholder.svg"
                              }
                            />
                            <AvatarFallback>
                              {req.reseller.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{req.reseller.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {req.amount}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{req.number}</span>
                          <span className="text-xs text-muted-foreground">{req.method}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(req.status)}>
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{req.createdAt.toLocaleDateString()}</span>
                          <span className="text-xs text-muted-foreground">
                            {req.createdAt.toLocaleTimeString()}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {req.processedDate
                          ? req.processedDate.toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="hover:bg-blue-50 transition-colors"
                              >
                                <Eye className="h-4 w-4 " />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader className="space-y-4 pb-4 border-b">
                                <div className="flex items-center space-x-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage
                                      src={
                                        req.reseller.profileImage ||
                                        "/placeholder.svg"
                                      }
                                    />
                                    <AvatarFallback>
                                      {req.reseller.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <DialogTitle className="text-xl">
                                      {req.reseller.name}
                                    </DialogTitle>
                                    <DialogDescription className="text-sm">
                                      Withdrawal Request #{req.requestId}
                                    </DialogDescription>
                                  </div>
                                </div>
                              </DialogHeader>

                              <div className="py-6 space-y-6">
                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                  <span className="text-sm text-gray-600">
                                    Amount Requested
                                  </span>
                                  <span className="text-2xl font-semibold">
                                    {req.amount}
                                  </span>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-2">
                                    <Label className="text-sm text-gray-500">
                                      Payment Method
                                    </Label>
                                    <div className="flex flex-col">
                                      <span className="font-medium text-lg">
                                        {req.number}
                                      </span>
                                      <span className="text-sm text-gray-500">
                                        {req.method}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm text-gray-500">
                                      Status
                                    </Label>
                                    <div>
                                      <Badge
                                        className={`${getStatusColor(req.status)} px-3 py-1`}
                                      >
                                        {req.status.charAt(0).toUpperCase() +
                                          req.status.slice(1)}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm text-gray-500">
                                      Request Date
                                    </Label>
                                    <div className="font-medium">
                                      {req.createdAt.toLocaleDateString()}
                                      <br />
                                      {req.createdAt.toLocaleTimeString()}
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-sm text-gray-500">
                                      Processed Date
                                    </Label>
                                    <div className="font-medium">
                                      {req.processedDate
                                        ? req.processedDate.toLocaleDateString()
                                        : "Pending"}
                                      <br />
                                      {req.processedDate
                                        ? req.processedDate.toLocaleTimeString()
                                        : ""}
                                    </div>
                                  </div>
                                </div>

                                {req.status === "PENDING" && (
                                  <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                                    <Button
                                      disabled={loading}
                                      onClick={() =>
                                        handleRejectRequest(req.id)
                                      }
                                      variant="outline"
                                      className="text-red-600 hover:bg-red-50"
                                    >
                                      Reject Request
                                    </Button>
                                    <Button
                                      disabled={loading}
                                      onClick={() =>
                                        handleAcceptRequest(req.id)
                                      }
                                      className="bg-green-600 hover:bg-green-700"
                                    >
                                      Approve Request
                                    </Button>
                                  </div>
                                )}
                              </div>

                              <DialogFooter className="pt-4">
                                <DialogClose asChild>
                                  <Button
                                    disabled={loading}
                                    type="button"
                                    variant="ghost"
                                    className="w-full border"
                                  >
                                    Close Details
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          {req.status === "PENDING" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVerticalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                disabled={loading}
                                onClick={() => handleAcceptRequest(req.id)}
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  <span>Approve</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  disabled={loading}
                                  onClick={() => handleRejectRequest(req.id)}
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  <span>Reject</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {requests.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No withdrawal requests found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
