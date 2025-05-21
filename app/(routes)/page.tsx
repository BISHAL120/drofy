import CategoryGrid from "@/components/pages/home/categoryGrid"
import FeaturedSection from "@/components/pages/home/featuredSection"
import HeroSection from "@/components/pages/home/heroSection"

const Page = () => {
    return (
        <div>
            <HeroSection />
            <FeaturedSection />
            <CategoryGrid />
        </div>
    )
}

export default Page