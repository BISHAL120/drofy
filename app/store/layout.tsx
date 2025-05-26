import { auth } from "@/auth"
import { AppSidebar, MobileSidebar } from "@/components/ui/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

export default async function StoreLayout({ children, }: { children: React.ReactNode }) {

    const session = await auth()
    const user = session?.user

    return (
        <SidebarProvider>
            <div className="flex w-full min-h-screen">
                <AppSidebar />
                <SidebarInset className="flex flex-col">
                    <header className="flex h-16 items-center gap-4  px-6 bg-orange-500 border-b border-black">
                        <div className="flex items-center gap-2 h-full">
                            <SidebarTrigger className="hidden md:flex border bg-slate-700 text-white cursor-pointer" />
                            <MobileSidebar />
                        </div>
                        <h1 className="text-xl font-semibold">Welcome, {user?.name || "Guest"}! 👋</h1>
                    </header>
                    <main className="flex-1 lg:p-6">
                        {children}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
