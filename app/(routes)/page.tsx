import CategoryGrid from "@/components/pages/home/categoryGrid";
import FeaturedSection from "@/components/pages/home/featuredSection";
import HeroSection from "@/components/pages/home/heroSection";
import {
  getFeaturedCategory,
  getFeaturedContent,
} from "@/lib/data layer/store/store-DL";

const Page = async () => {
  const featuredContent = await getFeaturedContent();
  const featuredCategory = await getFeaturedCategory();

  return (
    <div>
      <HeroSection />
      <FeaturedSection featuredContent={featuredContent} />
      <CategoryGrid featuredCategory={featuredCategory} />
    </div>
  );
};

export default Page;
