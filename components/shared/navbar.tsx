import { auth } from "@/auth";
import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const Navbar = async () => {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="border-b">
      <nav className="bg-[#bbddd8] p-4">
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
              {process.env.LANGUAGE === 'bn' ? 'হোম' : 'Home'}
            </Link>
            <Link href="/about" className="hover:underline">
              {process.env.LANGUAGE === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us'}
            </Link>
            <Link href="/contact" className="hover:underline">
              {process.env.LANGUAGE === 'bn' ? 'যোগাযোগ' : 'Contact'}
            </Link>
            {!user ? (
              <>
                <Link href="/login" className="hover:underline">
                  {process.env.LANGUAGE === 'bn' ? 'লগইন' : 'Login'}{" "}
                </Link>
                <Link href="/register" className="hover:underline">
                  {process.env.LANGUAGE === 'bn' ? 'রেজিস্ট্রেশন' : 'Register'}
                </Link>
              </>
            ) : (
              <>
                <Link href="/store" className="hover:underline">
                  {process.env.LANGUAGE === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
                </Link>
                {/* <LogoutButton className="pt-0.5 text-white border " /> */}
              </>
            )}
          </div>
          <div className="md:hidden">
            {/* Mobile menu button - could be expanded with a dropdown */}
            <Sheet>
              <SheetTrigger>
                <MenuIcon />
              </SheetTrigger>
              <SheetContent className="bg-white p-0 w-[300px]">
                <SheetTitle className="border-b">
                  <div className="flex flex-col items-center py-6 bg-gradient-to-r from-teal-50 to-cyan-50">
                    <Image
                      src="/assets/logo.webp"
                      alt="Your Logo"
                      width={150}
                      height={40}
                      className="mb-2"
                    />
                  </div>
                </SheetTitle>
                <div className="px-4 py-6">
                  <div className="space-y-1">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-all duration-200 group"
                      >
                        <span className="material-icons mr-3 text-teal-600">
                          Home
                        </span>
                        <span className="text-base font-medium">হোম</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/about"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-all duration-200 group"
                      >
                        <span className="material-icons mr-3 text-teal-600">
                          About Us
                        </span>
                        <span className="text-base font-medium">
                          আমাদের সম্পর্কে
                        </span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/login"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-all duration-200 group"
                      >
                        <span className="material-icons mr-3 text-teal-600">
                          Login
                        </span>
                        <span className="text-base font-medium">লগইন</span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/register"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-all duration-200 group"
                      >
                        <span className="material-icons mr-3 text-teal-600">
                          Registration
                        </span>
                        <span className="text-base font-medium">
                          রেজিস্ট্রেশন
                        </span>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/contact"
                        className="flex items-center px-4 py-3 text-gray-700 hover:bg-teal-50 rounded-lg transition-all duration-200 group"
                      >
                        <span className="material-icons mr-3 text-teal-600">
                          Contact Support
                        </span>
                        <span className="text-base font-medium">যোগাযোগ</span>
                      </Link>
                    </SheetClose>
                  </div>

                  <div className="mt-8 pt-8 border-t">
                    <div className="flex flex-col space-y-4">
                      <h4 className="text-sm font-semibold text-gray-500 px-4">
                        কাস্টমার সাপোর্ট
                      </h4>
                      <Link
                        href="tel:+8801234567890"
                        className="px-4 py-3 bg-teal-50 rounded-lg"
                      >
                        <p className="text-sm text-gray-600">
                          সহায়তার জন্য কল করুন
                        </p>
                        <p className="text-lg font-semibold text-teal-600 hover:text-teal-700">
                          +880 1234-567890
                        </p>
                      </Link>
                    </div>
                  </div>
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
