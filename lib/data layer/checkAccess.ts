import { auth } from "@/auth"
import { redirect } from "next/navigation";

export async function isAdmin() {
    const session = await auth();
    const user = session?.user;
    if (!user?.role?.includes("ADMIN")) {
        redirect("/")
    }
    return user;
}
