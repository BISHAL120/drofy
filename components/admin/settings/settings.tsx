"use client"

import { DashboardHeader } from "@/components/admin/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
    return (
        <div className="flex flex-col">
            <DashboardHeader />
            <div className="flex-1 space-y-6 p-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">Manage your platform settings and configurations</p>
                </div>

                <Tabs defaultValue="general" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="commission">Commission</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                        <TabsTrigger value="payment">Payment</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Platform Information</CardTitle>
                                <CardDescription>Basic information about your e-commerce platform</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="platform-name">Platform Name</Label>
                                        <Input id="platform-name" defaultValue="EcomAdmin" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="platform-url">Platform URL</Label>
                                        <Input id="platform-url" defaultValue="https://ecomadmin.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="platform-description">Description</Label>
                                    <Textarea id="platform-description" defaultValue="Multi-vendor e-commerce platform for resellers" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="contact-email">Contact Email</Label>
                                        <Input id="contact-email" defaultValue="admin@ecomadmin.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="support-phone">Support Phone</Label>
                                        <Input id="support-phone" defaultValue="+1 (555) 123-4567" />
                                    </div>
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Business Settings</CardTitle>
                                <CardDescription>Configure your business operations</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="currency">Default Currency</Label>
                                        <Select defaultValue="usd">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="usd">USD ($)</SelectItem>
                                                <SelectItem value="eur">EUR (€)</SelectItem>
                                                <SelectItem value="gbp">GBP (£)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="timezone">Timezone</Label>
                                        <Select defaultValue="utc">
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="utc">UTC</SelectItem>
                                                <SelectItem value="est">EST</SelectItem>
                                                <SelectItem value="pst">PST</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="maintenance-mode" />
                                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Switch id="new-registrations" defaultChecked />
                                    <Label htmlFor="new-registrations">Allow New Registrations</Label>
                                </div>
                                <Button>Save Changes</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="commission" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Commission Structure</CardTitle>
                                <CardDescription>Configure commission rates for different reseller levels</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Beginner Level</Label>
                                            <div className="flex items-center space-x-2">
                                                <Input defaultValue="5" />
                                                <span className="text-sm text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Bronze Level</Label>
                                            <div className="flex items-center space-x-2">
                                                <Input defaultValue="8" />
                                                <span className="text-sm text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Silver Level</Label>
                                            <div className="flex items-center space-x-2">
                                                <Input defaultValue="12" />
                                                <span className="text-sm text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label>Gold Level</Label>
                                            <div className="flex items-center space-x-2">
                                                <Input defaultValue="15" />
                                                <span className="text-sm text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Elite Level</Label>
                                            <div className="flex items-center space-x-2">
                                                <Input defaultValue="18" />
                                                <span className="text-sm text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Legendary Level</Label>
                                            <div className="flex items-center space-x-2">
                                                <Input defaultValue="25" />
                                                <span className="text-sm text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Level Requirements</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Bronze Level (Monthly Sales)</Label>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">$</span>
                                                <Input defaultValue="5000" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Silver Level (Monthly Sales)</Label>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">$</span>
                                                <Input defaultValue="15000" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button>Save Commission Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Email Notifications</CardTitle>
                                <CardDescription>Configure when to send email notifications</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>New Order Notifications</Label>
                                            <p className="text-sm text-muted-foreground">Send email when new orders are placed</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Low Stock Alerts</Label>
                                            <p className="text-sm text-muted-foreground">Alert when product stock is low</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Withdrawal Requests</Label>
                                            <p className="text-sm text-muted-foreground">Notify when resellers request withdrawals</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>New Support Tickets</Label>
                                            <p className="text-sm text-muted-foreground">Alert when new support tickets are created</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                                <Button>Save Notification Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="payment" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Payment Methods</CardTitle>
                                <CardDescription>Configure available payment methods</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Cash on Delivery (COD)</Label>
                                            <p className="text-sm text-muted-foreground">Allow customers to pay on delivery</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Online Payment</Label>
                                            <p className="text-sm text-muted-foreground">Accept online payments via gateway</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Withdrawal Settings</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Minimum Withdrawal Amount</Label>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-sm text-muted-foreground">$</span>
                                                <Input defaultValue="50" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Processing Fee</Label>
                                            <div className="flex items-center space-x-2">
                                                <Input defaultValue="2" />
                                                <span className="text-sm text-muted-foreground">%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button>Save Payment Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="security" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Security Settings</CardTitle>
                                <CardDescription>Configure security and access controls</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Two-Factor Authentication</Label>
                                            <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
                                        </div>
                                        <Switch />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Login Attempt Limits</Label>
                                            <p className="text-sm text-muted-foreground">Limit failed login attempts</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Session Timeout</Label>
                                            <p className="text-sm text-muted-foreground">Auto-logout after inactivity</p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="text-sm font-medium">Password Policy</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Minimum Length</Label>
                                            <Input defaultValue="8" type="number" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Session Timeout (minutes)</Label>
                                            <Input defaultValue="30" type="number" />
                                        </div>
                                    </div>
                                </div>
                                <Button>Save Security Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
