import PostsPage from "@/components/store/posts/posts-page"
import { Suspense } from "react"


type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

const Page = async (props: {
    searchParams: SearchParams
}) => {
    const searchParams = await props.searchParams
    // console.log(searchParams)
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PostsPage searchParams={searchParams} />
        </Suspense>
    )
}

export default Page