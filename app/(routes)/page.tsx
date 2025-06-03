// import { auth } from "@/auth"
import CategoryGrid from "@/components/pages/home/categoryGrid"
// import FeaturedSection from "@/components/pages/home/featuredSection"
import HeroSection from "@/components/pages/home/heroSection"

const Page = async () => {

    // const session = await auth()
    // const user = session?.user;

    return (
        <div>
            <HeroSection />
            {/* <FeaturedSection user={user ? true : false} /> */}
            <CategoryGrid />
        </div>
    )
}

export default Page