import { Product } from "@prisma/client";

export const DemoData: Product[] = [
    {
        id: "1",
        name: "Nike Air Max 270",
        description: "Men's Running Shoes with Air cushioning",
        price: 150.00,
        SellingPrice: 129.99,
        totalSales: "1.2k",
        stock: "250",
        images: [
            "/placeholder.svg",
            "/placeholder.svg",
        ],
        subCategory: "Running Shoes",
        tags: ["nike", "running", "shoes", "sports"],
        inStock: true,
        subCategoryId: "run-001",
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date("2024-01-01")
    },
    {
        id: "2",
        name: "Adidas Ultraboost",
        description: "Premium running shoes with Boost technology",
        price: 180.00,
        SellingPrice: 159.99,
        totalSales: "2.5k",
        stock: "180",
        images: [
            "/placeholder.svg",
            "/placeholder.svg",
        ],
        subCategory: "Running Shoes",
        tags: ["adidas", "running", "boost", "premium"],
        inStock: true,
        subCategoryId: "run-002",
        createdAt: new Date("2024-01-02"),
        updatedAt: new Date("2024-01-02")
    },
    {
        id: "3",
        name: "Puma RS-X",
        description: "Retro-style sneakers with modern comfort",
        price: 110.00,
        SellingPrice: 89.99,
        totalSales: "800",
        stock: "120",
        images: [
            "/placeholder.svg",
            "/placeholder.svg",
        ],
        subCategory: "Casual Sneakers",
        tags: ["puma", "casual", "retro", "sneakers"],
        inStock: true,
        subCategoryId: "cas-001",
        createdAt: new Date("2024-01-03"),
        updatedAt: new Date("2024-01-03")
    },
    {
        id: "4",
        name: "Under Armour HOVR",
        description: "Performance running shoes with energy return",
        price: 130.00,
        SellingPrice: 119.99,
        totalSales: "500",
        stock: "90",
        images: [
            "/placeholder.svg",
            "/placeholder.svg",
        ],
        subCategory: "Running Shoes",
        tags: ["under armour", "running", "performance"],
        inStock: true,
        subCategoryId: "run-003",
        createdAt: new Date("2024-01-04"),
        updatedAt: new Date("2024-01-04")
    },
    {
        id: "5",
        name: "New Balance 574",
        description: "Classic lifestyle sneakers for everyday wear",
        price: 90.00,
        SellingPrice: 79.99,
        totalSales: "1.5k",
        stock: "200",
        images: [
            "/placeholder.svg",
            "/placeholder.svg",
        ],
        subCategory: "Casual Sneakers",
        tags: ["new balance", "casual", "classic", "lifestyle"],
        inStock: true,
        subCategoryId: "cas-002",
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-05")
    }
]
