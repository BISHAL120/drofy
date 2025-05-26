"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter, useSearchParams } from "next/navigation"

interface Category {
    id: string
    name: string
    nameBn: string
}

interface FilterTabsProps {
    categories: Category[]
    selectedCategory: string
}

export default function FilterTabs({ categories, selectedCategory }: FilterTabsProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleCategoryChange = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (categoryId === "all") {
            params.delete("category")
        } else {
            params.set("category", categoryId)
        }

        // Reset subcategory when category changes
        params.delete("subcategory")

        router.push(`?${params.toString()}`)
    }

    return (
        <div className="w-full">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-2 p-1">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleCategoryChange(category.id)}
                            className={`flex-shrink-0 transition-all duration-200 ${selectedCategory === category.id
                                    ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md"
                                    : "bg-white hover:bg-orange-50 text-slate-700 border-slate-200"
                                }`}
                        >
                            <span className="hidden sm:inline">{category.name}</span>
                            <span className="sm:hidden">{category.nameBn}</span>
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
