"use client"

import { DashboardHeader } from "@/components/admin/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, Calendar, TrendingUp, Users, Package, DollarSign } from "lucide-react"

const reportTypes = [
    {
        id: "sales",
        title: "Sales Report",
        description: "Comprehensive sales data and trends",
        icon: TrendingUp,
        lastGenerated: "2024-01-15",
    },
    {
        id: "resellers",
        title: "Reseller Performance",
        description: "Reseller activity and commission data",
        icon: Users,
        lastGenerated: "2024-01-14",
    },
    {
        id: "products",
        title: "Product Analytics",
        description: "Product performance and inventory insights",
        icon: Package,
        lastGenerated: "2024-01-13",
    },
    {
        id: "financial",
        title: "Financial Summary",
        description: "Revenue, profits, and financial metrics",
        icon: DollarSign,
        lastGenerated: "2024-01-12",
    },
    {
        id: "customers",
        title: "Customer Insights",
        description: "Customer behavior and demographics",
        icon: Users,
        lastGenerated: "2024-01-11",
    },
    {
        id: "inventory",
        title: "Inventory Report",
        description: "Stock levels and inventory management",
        icon: Package,
        lastGenerated: "2024-01-10",
    },
]

export default function ReportsPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
                        <p className="text-muted-foreground">Generate and download comprehensive business reports</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Select defaultValue="30days">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7days">Last 7 days</SelectItem>
                                <SelectItem value="30days">Last 30 days</SelectItem>
                                <SelectItem value="3months">Last 3 months</SelectItem>
                                <SelectItem value="6months">Last 6 months</SelectItem>
                                <SelectItem value="1year">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">156</div>
                            <p className="text-xs text-green-600">Generated this month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Scheduled Reports</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-blue-600">Auto-generated weekly</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                            <Download className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">2,340</div>
                            <p className="text-xs text-green-600">This month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Report Types</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6</div>
                            <p className="text-xs text-muted-foreground">Available formats</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Available Reports</CardTitle>
                        <CardDescription>Generate and download various business reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {reportTypes.map((report) => (
                                <Card key={report.id} className="relative">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                    <report.icon className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold">{report.title}</h3>
                                                    <p className="text-sm text-muted-foreground">{report.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="text-sm text-muted-foreground">Last generated: {report.lastGenerated}</div>
                                            <div className="flex space-x-2">
                                                <Button size="sm" className="flex-1">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Generate
                                                </Button>
                                                <Button size="sm" variant="outline">
                                                    <Calendar className="mr-2 h-4 w-4" />
                                                    Schedule
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>Common report generation tasks</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <TrendingUp className="h-6 w-6" />
                                <span>Monthly Sales</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <Users className="h-6 w-6" />
                                <span>Top Resellers</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <Package className="h-6 w-6" />
                                <span>Low Stock Alert</span>
                            </Button>
                            <Button variant="outline" className="h-20 flex-col space-y-2">
                                <DollarSign className="h-6 w-6" />
                                <span>Commission Summary</span>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
