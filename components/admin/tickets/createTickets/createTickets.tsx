"use client"

import { DashboardHeader } from "@/components/admin/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface CreateTicketFormData {
    subject: string
    description: string
    priority: string
    category: string
    assignedTo: string
    userType: string
    userId: string
}

export default function CreateTicketPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateTicketFormData>()

    const onSubmit = (data: CreateTicketFormData) => {
        console.log("Ticket data:", data)

        toast.success("Ticket created successfully", {
            description: "Support ticket has been created successfully.",
            duration: 5000,
        })
    }

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center space-x-4">
                    {/*  <Link href="/tickets">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tickets
            </Button>
          </Link> */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Create Support Ticket</h2>
                        <p className="text-muted-foreground">Create a new support ticket</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Ticket Information</CardTitle>
                        <CardDescription>Enter the details for the new support ticket</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject *</Label>
                                <Input
                                    id="subject"
                                    {...register("subject", { required: "Subject is required" })}
                                    placeholder="Enter ticket subject"
                                />
                                {errors.subject && <p className="text-sm text-red-500">{errors.subject.message}</p>}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Priority *</Label>
                                    <Select {...register("priority", { required: "Priority is required" })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="urgent">Urgent</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.priority && <p className="text-sm text-red-500">{errors.priority.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Category *</Label>
                                    <Select {...register("category", { required: "Category is required" })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technical">Technical Issue</SelectItem>
                                            <SelectItem value="billing">Billing</SelectItem>
                                            <SelectItem value="account">Account</SelectItem>
                                            <SelectItem value="product">Product Issue</SelectItem>
                                            <SelectItem value="general">General Inquiry</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>User Type *</Label>
                                    <Select {...register("userType", { required: "User type is required" })}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="customer">Customer</SelectItem>
                                            <SelectItem value="reseller">Reseller</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.userType && <p className="text-sm text-red-500">{errors.userType.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="userId">User ID</Label>
                                    <Input id="userId" {...register("userId")} placeholder="Enter user ID (optional)" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Assign To</Label>
                                <Select {...register("assignedTo")}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select support agent" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="agent1">Support Agent 1</SelectItem>
                                        <SelectItem value="agent2">Support Agent 2</SelectItem>
                                        <SelectItem value="agent3">Support Agent 3</SelectItem>
                                        <SelectItem value="unassigned">Unassigned</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    {...register("description", { required: "Description is required" })}
                                    placeholder="Enter detailed description of the issue"
                                    rows={6}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/tickets">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Ticket
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
