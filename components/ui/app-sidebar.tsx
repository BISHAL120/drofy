"use client"
import {
    Home,
    User,
    FileText,
    Folder,
    Video,
    Heart,
    Clock,
    List,
    ShoppingCart,
    BarChart2,
    FileCheck,
    CreditCard,
    HelpCircle,
    Menu,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { DialogTitle } from "./dialog"

const menuItems = [
    { icon: Home, label: "হোম", href: "/store" },
    { icon: User, label: "প্রোফাইল", href: "/store/profile" },
    { icon: FileText, label: "নতুন পোস্ট", href: "/store/posts" },
    { icon: Folder, label: "সকল প্রোডাক্ট", href: "/store/products" },
    { icon: Video, label: "প্রোডাক্টের ভিডিও", href: "/store#" },
    { icon: Heart, label: "ফেভরিট প্রোডাক্ট", href: "/store/favorites" },
    { icon: Clock, label: "স্টকআউট প্রোডাক্ট", href: "/store/stock-out" },
    { icon: List, label: "অর্ডার লিস্ট", href: "/store/orders" },
    { icon: List, label: "অ্যাক্টিভ অর্ডার", href: "/store/active-orders" },
    { icon: ShoppingCart, label: "কার্ট লিস্ট", href: "/store/cart" },
    { icon: BarChart2, label: "সেলস & প্রফিট", href: "/store/sales-profit" },
    { icon: FileCheck, label: "ব্যালেন্স স্টেটমেন্ট", href: "/store/balance" },
    { icon: CreditCard, label: "অ্যাড একাউন্ট", href: "/store/paymentMethod" },
    { icon: CreditCard, label: "টাকা উত্তোলন", href: "/store/withdraw" },
    { icon: HelpCircle, label: "সাপোর্ট টিকেট", href: "/store/support" },
]

export function AppSidebar() {
    const pathname = usePathname()

    return (
        <Sidebar className="border-r">
            <SidebarContent className="hide_scrollbar">
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <Link href="/store" className="h-16 bg-orange-500 text-white text-3xl font-bold flex justify-start pl-3 items-center mb-3  border-b border-black/70">
                                রিস্টক বিডি
                            </Link>
                            <div className="space-y-5">
                                {menuItems.map((item, index) => (
                                    <SidebarMenuItem
                                        key={index}
                                        className={`transition-colors duration-200 hover:bg-orange-100 mb-0 
                                            ${pathname === item.href ? 'bg-orange-100' : ''}`}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`flex items-center gap-3 pl-4 py-4
                                                ${pathname === item.href ? 'text-orange-500 font-bold border border-black/40 border-r-0 border-l-0' : ''}`}
                                        >
                                            <item.icon
                                                size={24}
                                                stroke={pathname === item.href ? "#f97316" : "#DC2626"}
                                                className={`h-5 w-5 ${pathname === item.href ? 'text-orange-500' : 'text-primary'}`}
                                            />
                                            <span className="font-semibold text-base">{item.label}</span>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}

export function MobileSidebar() {
    const pathname = usePathname()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden border bg-slate-700 text-white cursor-pointer">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[250px]">
                <DialogTitle />
                <div className="h-full bg-background">
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {menuItems.map((item, index) => (
                                        <SidebarMenuItem
                                            key={index}
                                            className={pathname === item.href ? 'bg-orange-100' : ''}
                                        >
                                            <SidebarMenuButton asChild>
                                                <Link
                                                    href={item.href}
                                                    className={`flex items-center gap-3 pl-4 py-4 
                                                        ${pathname === item.href ? ' font-bold' : ''}`}
                                                >
                                                    <item.icon
                                                        className={`h-5 w-5 ${pathname === item.href ? 'text-orange-500' : 'text-primary'}`}
                                                    />
                                                    <span>{item.label}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </div>
            </SheetContent>
        </Sheet>
    )
}
