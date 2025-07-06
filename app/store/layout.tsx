import { auth } from "@/auth";
import CartButton from "@/components/store/cartButton";
import IdActiveAlert from "@/components/store/idActiveAlert";
import { AppSidebar, MobileSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen relative">
        <AppSidebar />
        <SidebarInset className="flex flex-col">
          <header className="flex h-16 items-center justify-between gap-4  sticky top-0 z-50 px-6 bg-[#bbddd8] border-b border-blue-500">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 h-full">
                <SidebarTrigger className="hidden md:flex border bg-slate-700 text-white cursor-pointer" />
                <MobileSidebar />
              </div>
              <h1 className="text-sm md:text-xl font-semibold">
                Welcome, {user?.name || "Guest"}! 👋
              </h1>
            </div>
            <div className="flex">
              {user?.role?.includes("ADMIN") && (
                <a
                  href="/admin"
                  className="text-sm md:text-base lg:text-xl ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <Settings className="w-4 h-4 md:h-6 md:w-6" />
                  Admin
                </a>
              )}
              <CartButton />
            </div>
          </header>
          <main className="flex-1">
            {user?.isActive ? children : <IdActiveAlert />}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
