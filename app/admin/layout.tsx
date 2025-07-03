import { AdminSidebar } from "@/components/admin/components/adminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import type React from "react";

export const metadata: Metadata = {
  title: "E-commerce Admin Dashboard",
  description: "Multi-vendor e-commerce admin dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full">
          <AdminSidebar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
