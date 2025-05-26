"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter, useSearchParams } from "next/navigation"

interface Subcategory {
    id: string
    name: string
    nameBn: string
    icon: string
}

interface SubcategoryFilterProps {
    subcategories: Subcategory[]
    selectedSubcategory: string
}

export default function SubcategoryFilter({ subcategories, selectedSubcategory }: SubcategoryFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleSubcategoryChange = (subcategoryId: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (selectedSubcategory === subcategoryId) {
            // If clicking the same subcategory, remove it (toggle off)
            params.delete("subcategory")
        } else {
            params.set("subcategory", subcategoryId)
        }

        router.push(`?${params.toString()}`)
    }

    return (
        <div className="w-full">
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex space-x-3 p-1 scrollbar_hidden">
                    {subcategories.map((subcategory) => (
                        <Button
                            key={subcategory.id}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSubcategoryChange(subcategory.id)}
                            className={`border flex-shrink-0 flex flex-col items-center space-y-1 h-auto py-3 px-4 transition-all duration-200 ${selectedSubcategory === subcategory.id
                                ? "bg-orange-100 text-orange-700 border border-orange-200"
                                : "hover:bg-slate-100 text-slate-600"
                                }`}
                        >
                            <span className="text-lg">{subcategory.icon}</span>
                            <span className="text-xs font-medium hidden sm:block">{subcategory.name}</span>
                            <span className="text-xs font-medium sm:hidden">{subcategory.nameBn}</span>
                        </Button>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}
