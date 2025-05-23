import Image from "next/image";
import Link from "next/link";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "../ui/sheet";
import { MenuIcon } from "lucide-react";
import { auth } from "@/auth";
import LogoutButton from "../auth/logoutButton";

const Navbar = async () => {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="border-b">
            <nav className="bg-orange-500 text-white p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="w-full">
                            <Image
                                src="/assets/logo.webp"
                                alt="Your Logo"
                                width={200}
                                height={50}
                                className="mr-2"
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <Link href="/" className="hover:underline">
                            হোম
                        </Link>
                        <Link href="/about" className="hover:underline">
                            আমাদের সম্পর্কে
                        </Link>
                        <Link href="/contact" className="hover:underline">
                            যোগাযোগ
                        </Link>
                        {!user ? (
                            <>
                                <Link href="/login" className="hover:underline">
                                    লগইন{" "}
                                </Link>
                                <Link href="/register" className="hover:underline">
                                    রেজিস্ট্রেশন
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/store" className="hover:underline">
                                    ড্যাশবোর্ড
                                </Link>
                                <LogoutButton className="pt-0.5 text-white border " />
                            </>
                        )}
                    </div>
                    <div className="md:hidden">
                        {/* Mobile menu button - could be expanded with a dropdown */}
                        <Sheet>
                            <SheetTrigger>
                                <MenuIcon />
                            </SheetTrigger>
                            <SheetContent className="bg-orange-600 p-6">
                                <SheetTitle>
                                    <div className="flex flex-col items-center mb-8 border-b">
                                        <Image
                                            src="/assets/logo.webp"
                                            alt="Your Logo"
                                            width={150}
                                            height={40}
                                            className="mb-4"
                                        />
                                    </div>
                                </SheetTitle>
                                <div className="space-y-4">
                                    <SheetClose className="w-full text-start">
                                        <Link
                                            href="/"
                                            className="block py-3 px-4 text-white text-lg font-semibold hover:bg-orange-700 rounded-lg transition-colors duration-200"
                                        >
                                            হোম
                                        </Link>
                                    </SheetClose>
                                    <SheetClose className="w-full text-start">
                                        <Link
                                            href="/about"
                                            className="block py-3 px-4 text-white text-lg font-semibold hover:bg-orange-700 rounded-lg transition-colors duration-200"
                                        >
                                            আমাদের সম্পর্কে
                                        </Link>
                                    </SheetClose>
                                    <SheetClose className="w-full text-start">
                                        <Link
                                            href="/login"
                                            className="block py-3 px-4 text-white text-lg font-semibold hover:bg-orange-700 rounded-lg transition-colors duration-200"
                                        >
                                            লগইন
                                        </Link>
                                    </SheetClose>
                                    <SheetClose className="w-full text-start">
                                        <Link
                                            href="/register"
                                            className="block py-3 px-4 text-white text-lg font-semibold hover:bg-orange-700 rounded-lg transition-colors duration-200"
                                        >
                                            রেজিস্ট্রেশন
                                        </Link>
                                    </SheetClose>
                                    <SheetClose className="w-full text-start">
                                        <Link
                                            href="/contact"
                                            className="block py-3 px-4 text-white text-lg font-semibold hover:bg-orange-700 rounded-lg transition-colors duration-200"
                                        >
                                            যোগাযোগ
                                        </Link>
                                    </SheetClose>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
