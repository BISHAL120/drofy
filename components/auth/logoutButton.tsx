"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, LogOut } from "lucide-react";
import { useState } from "react";

interface LogoutButtonProps {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    showIcon?: boolean;
    text?: string;
}

export default function LogoutButton({
    variant = "default",
    size = "default",
    className = "",
    showIcon = true,
    text = "লগআউট"
}: LogoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            await signOut({ callbackUrl: "/" });
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={`p-0 ${className}`}
            onClick={handleLogout}
            disabled={isLoading}
            asChild
        >
            <a href="#" className="flex items-center justify-center">
                {isLoading ? (
                    <LoaderCircle className="h-4 w-4 mx-1.5 mb-0.5 animate-spin" />
                ) : (
                    showIcon && <LogOut className="h-4 w-4 mr-2" />
                )}
                {text}
            </a>
        </Button>
    );
}