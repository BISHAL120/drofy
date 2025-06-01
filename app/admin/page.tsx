"use client"

import { DashboardHeader } from "../../components/admin/dashboard-header"
import { MetricCard } from "../../components/admin/metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, ShoppingCart, Users, Plus, UserPlus, FileText, TrendingUp, Package } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts"

const salesData = [
  { name: "Mon", sales: 4000 },
  { name: "Tue", sales: 3000 },
  { name: "Wed", sales: 5000 },
  { name: "Thu", sales: 2780 },
  { name: "Fri", sales: 1890 },
  { name: "Sat", sales: 2390 },
  { name: "Sun", sales: 3490 },
]

const categoryData = [
  { name: "Electronics", value: 400, fill: "#0088FE" },
  { name: "Clothing", value: 300, fill: "#00C49F" },
  { name: "Home & Garden", value: 200, fill: "#FFBB28" },
  { name: "Sports", value: 100, fill: "#FF8042" },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    product: "iPhone 15 Pro",
    status: "completed",
    amount: "$999.00",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    product: "Samsung Galaxy S24",
    status: "processing",
    amount: "$849.00",
    date: "2024-01-15",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    product: "MacBook Air M3",
    status: "pending",
    amount: "$1,299.00",
    date: "2024-01-14",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    product: "AirPods Pro",
    status: "delivered",
    amount: "$249.00",
    date: "2024-01-14",
  },
]

const topResellers = [
  {
    name: "Alex Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    products: 156,
    sales: "$45,230",
    level: "GOLD",
  },
  {
    name: "Maria Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    products: 134,
    sales: "$38,920",
    level: "SILVER",
  },
  {
    name: "David Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    products: 98,
    sales: "$29,450",
    level: "BRONZE",
  },
  {
    name: "Lisa Anderson",
    avatar: "/placeholder.svg?height=40&width=40",
    products: 87,
    sales: "$25,680",
    level: "BRONZE",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "delivered":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "GOLD":
      return "bg-yellow-100 text-yellow-800"
    case "SILVER":
      return "bg-gray-100 text-gray-800"
    case "BRONZE":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-blue-100 text-blue-800"
  }
}

export default function Dashboard() {
  return (
    <div className="flex flex-col">
      <DashboardHeader />
      <div className="flex-1 space-y-6 p-6">
        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$45,231.89"
            change="+20.1%"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard title="Total Orders" value="2,350" change="+15.3%" changeType="positive" icon={ShoppingCart} />
          <MetricCard title="Active Resellers" value="573" change="+8.2%" changeType="positive" icon={Users} />
          <MetricCard title="Total Products" value="1,234" change="+5.7%" changeType="positive" icon={Package} />
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Weekly sales performance</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>Distribution by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={categoryData}>
                  <RadialBar
                    label={{ position: "insideStart", fill: "#fff" }}
                    background
                    dataKey="value"
                  />
                  <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders and Top Resellers */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.product}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </TableCell>
                      <TableCell>{order.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Top Resellers</CardTitle>
              <CardDescription>Best performing resellers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topResellers.map((reseller, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={reseller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {reseller.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{reseller.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {reseller.products} products • {reseller.sales}
                      </p>
                    </div>
                    <Badge className={getLevelColor(reseller.level)}>{reseller.level}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer transition-colors hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Plus className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Add Product</h3>
              <p className="text-sm text-muted-foreground text-center">Add new products to your catalog</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer transition-colors hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <UserPlus className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Invite Reseller</h3>
              <p className="text-sm text-muted-foreground text-center">Invite new resellers to join</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer transition-colors hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <FileText className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">Generate Report</h3>
              <p className="text-sm text-muted-foreground text-center">Create sales and analytics reports</p>
            </CardContent>
          </Card>
          <Card className="cursor-pointer transition-colors hover:bg-muted/50">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <h3 className="font-semibold">View Analytics</h3>
              <p className="text-sm text-muted-foreground text-center">Detailed performance analytics</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
