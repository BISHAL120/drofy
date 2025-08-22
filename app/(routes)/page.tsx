import { auth } from "@/auth";
import CategoryGrid from "@/components/pages/home/categoryGrid";
import FeaturedSection from "@/components/pages/home/featuredSection";
import HeroSection from "@/components/pages/home/heroSection";
import {
  getFeaturedSubCategory,
  getFeaturedContent,
} from "@/lib/data layer/store/store-DL";

const Page = async () => {
  const featuredContent = await getFeaturedContent();
  const featuredSubCategory = await getFeaturedSubCategory();
   const session = await auth();
  const isActive = session?.user.isActive; 

  return (
    <div>
      <HeroSection />
      <FeaturedSection isActive={isActive} featuredContent={featuredContent} />
      <CategoryGrid featuredSubCategory={featuredSubCategory} />
    </div>
  );
};

export default Page;
