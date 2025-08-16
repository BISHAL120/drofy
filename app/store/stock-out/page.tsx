import StockOutProducts from "@/components/store/stock-out/stockOutProducts";
import { getStockOutProducts } from "@/lib/data layer/store/store-DL";
import Link from "next/link";

const Page = async () => {
  const stockOutProducts = await getStockOutProducts();

  if (!stockOutProducts || stockOutProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg transform transition-all hover:scale-105">
          <div className="mb-6">
            <svg
              className="w-24 h-24 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {process.env.LANGUAGE === 'bn'
              ? "সব পণ্য স্টকে আছে!"
              : "All products are in stock!"}
          </h2>
          <p className="text-gray-600 mb-6">
            {process.env.LANGUAGE === 'bn' 
              ? "সুখবর! সব পণ্য বর্তমানে স্টকে উপলব্ধ রয়েছে। স্টক স্থিতি সম্পর্কে আপডেটের জন্য পরে আবার দেখুন।"
              : "Good news! All products are currently available in stock. Check back later for updates on stock status."}
          </p>
          <Link href={"/store/categories"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200">
              {process.env.LANGUAGE === 'bn'
                ? "স্টোরে ফিরে যান"
                : "Go back to store"}
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <StockOutProducts products={stockOutProducts} />
    </div>
  );
};

export default Page;
