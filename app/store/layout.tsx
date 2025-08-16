import { auth } from "@/auth";
import AdminButton from "@/components/auth/adminButton";
import WaletBalance from "@/components/store/components/balance";
import CartButton from "@/components/store/components/cartButton";
import IdActiveAlert from "@/components/store/components/idActiveAlert";
import { AppSidebar, MobileSidebar } from "@/components/ui/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;

  return (
    <SidebarProvider>
      <SessionProvider>
        <div className="flex w-full min-h-screen relative">
          <AppSidebar />
          <SidebarInset className="flex flex-col">
            <header className="flex h-16 items-center justify-between gap-4  sticky top-0 z-50 px-2 md:px-6 bg-[#bbddd8] border-b border-blue-500">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 h-full">
                  <SidebarTrigger className="hidden md:flex border bg-slate-700 text-white cursor-pointer" />
                  <MobileSidebar />
                </div>
                <h1 className="text-sm md:text-xl font-semibold">
                  Welcome, {user?.name?.split(" ")[0] || "Guest"}! 👋
                </h1>
              </div>
              <div className="flex gap-2">
                <div className="hidden md:flex">
                  <AdminButton className="border p-2 bg-slate-700 text-white" />
                </div>
                <CartButton />
                <WaletBalance />
              </div>
            </header>
            <main className="flex-1">
              {user?.isActive ? children : <IdActiveAlert />}
            </main>
          </SidebarInset>
        </div>
      </SessionProvider>
    </SidebarProvider>
  );
}
