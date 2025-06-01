"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="w-full h-16 flex items-center justify-between gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <div className="flex items-center gap-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="relative hover:bg-secondary transition-colors"
          >
            <Bell className="h-5 w-5 text-muted-foreground" />
            <Badge
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center bg-primary animate-pulse"
            >
              3
            </Badge>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full ring-2 ring-offset-2 ring-offset-background ring-primary/10 hover:ring-primary/30 transition-all"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Admin Profile"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary/5">AD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64 p-2"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal p-2">
                <div className="flex flex-col space-y-1.5">
                  <p className="text-base font-semibold">Admin User</p>
                  <p className="text-sm text-muted-foreground">admin@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 cursor-pointer hover:bg-secondary">
                <User className="mr-3 h-4 w-4" />
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-2 cursor-pointer hover:bg-secondary">
                <span>Account Preferences</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-2 cursor-pointer text-destructive hover:bg-destructive/10">
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
