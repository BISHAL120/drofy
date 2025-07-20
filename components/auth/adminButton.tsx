"use client"
import { Settings } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"

interface AdminButtonProps {
    className?: string
}

const AdminButton: React.FC<AdminButtonProps> = ({
    className
}) => {
    const { data: session } = useSession()

    // Check if user exists and has required role
    const user = session?.user
    const isAdmin = user?.role?.includes('ADMIN')

    return (
        <div
        >
            {isAdmin && <Link
                href={"/admin"}
                className={`inline-flex items-center gap-2 rounded-md transition-colors ${className}`}
            >
                <Settings className={
                    "h-4 w-4"
                } />
                <span>Admin</span>
            </Link>}
        </div>
    )
}


export default AdminButton