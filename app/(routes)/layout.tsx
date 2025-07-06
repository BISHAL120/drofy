import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import ".././globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

const banglaFonts = Noto_Sans_Bengali({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drofy",
  description: "ফ্রি রিসেলিং প্ল্যাটফর্ম, এখনই বিক্রি শুরু করুন",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${banglaFonts.className} antialiased`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
