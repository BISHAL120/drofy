"use client"

import { DashboardHeader } from "@/components/admin/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface InviteResellerFormData {
    name: string
    email: string
    phone: string
    message: string
    initialLevel: string
}

export default function InviteResellerPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<InviteResellerFormData>()

    const onSubmit = (data: InviteResellerFormData) => {
        console.log("Invite data:", data)
        toast.success("Invitation Sent", {
            description: "Reseller invitation has been sent successfully."
        })
    }

    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div className="flex items-center space-x-4">
                    {/* <Link href="/resellers">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Resellers
            </Button>
          </Link> */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Invite Reseller</h2>
                        <p className="text-muted-foreground">Send an invitation to a new reseller</p>
                    </div>
                </div>

                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Reseller Invitation</CardTitle>
                        <CardDescription>Enter the details to invite a new reseller to your platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="Enter full name"
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^\S+@\S+$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        placeholder="Enter email address"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        {...register("phone", { required: "Phone number is required" })}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Initial Level</Label>
                                    <Select {...register("initialLevel")}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select initial level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="bronze">Bronze</SelectItem>
                                            <SelectItem value="silver">Silver</SelectItem>
                                            <SelectItem value="gold">Gold</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Invitation Message</Label>
                                <Textarea
                                    id="message"
                                    {...register("message")}
                                    placeholder="Enter a personalized message for the invitation"
                                    rows={4}
                                />
                            </div>

                            <div className="flex justify-end space-x-4">
                                <Link href="/admin/resellers">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                                <Button type="submit">
                                    <Send className="mr-2 h-4 w-4" />
                                    Send Invitation
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
