import Image from 'next/image'
import Link from 'next/link'


type CategoryCardProps = {
    id: number
    name: string
    image?: string
    quantity: number
}

const CategoryCard = ({ category }: { category: CategoryCardProps }) => {
    return (
        <div>
            <Link
                href="/store/products/product"
                key={category.id}
                className="w-[200px] h-[200px] bg-white aspect-square rounded-md p-2 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="relative w-full h-3/4 mb-2">
                    <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-contain" />
                </div>
                <span className="text-xs text-center font-medium">{category.name}</span>
                <span className="text-xs text-gray-500">{category.quantity}</span>
            </Link>
        </div>
    )
}

export default CategoryCard