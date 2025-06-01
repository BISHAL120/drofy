import { auth } from "@/auth"
import IdActiveAlert from "@/components/store/idActiveAlert"
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
                        {user?.role?.includes("ADMIN") && (
                            <a
                                href="/admin"
                                className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Admin Panel
                            </a>
                        )}
                    </header>
                    <main className="flex-1 lg:p-6">
                        {user?.isActive ? children : <IdActiveAlert />}
                    </main>
                </SidebarInset>
            </div>
        </SidebarProvider>
    )
}
