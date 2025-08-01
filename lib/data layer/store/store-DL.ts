import db from "@/lib/db"

export const getUserDetails = async (id: string) => {
    const userDetails = await db.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            phone: true,
            companyName: true,
            email: true,
            district: true,
            address: true,
        }
    })

    return userDetails;
}

export const getCategoriesForStore = async () => {
    const categories = await db.category.findMany({
        select: {
            id: true,
            name: true,
            productCount: true,
            subCategory: {
                select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                    productCount: true
                }
            }
        }
    })

    return categories;
}

export const getStoreProducts = async (subCatId: string | undefined) => {
    const products = await db.product.findMany({
        where: {
            subCategoryId: subCatId,
            status: "ACTIVE",
            isDeleted: false,
            stock: {
                gt: 0
            },
        },
        select: {
            id: true,
            images: true,
            inStock: true,

            name: true,
            sellingPrice: true,
            discountPrice: true,
            createdAt: true,
            SubCategory: {
                select: {
                    name: true,
                }

            }
        }
    })

    return products;
}


export const getProductDetails = async (id: string) => {
    const product = await db.product.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            images: true,
            name: true,
            shortDescription: true,
            sellingPrice: true,
            discountPrice: true,
            variant: true,
            note: true,
            inStock: true,
            isVerified: true,
            sku: true,
            fullDescription: true,
            createdAt: true,
            SubCategory: {
                select: {
                    id: true,
                    name: true,
                    Category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    });

    return product;
}

export const getFeaturedContent = async () => {
    const result = await db.subCategory.findMany({
        where: {
            isActive: true,
            isFeatured: true,
        },
        select: {
            id: true,
            name: true,
            products: {
                where: {
                    status: "ACTIVE",
                    isDeleted: false,
                    isFeatured: true,
                },
                select: {
                    id: true,
                    name: true,
                    images: true,
                    sellingPrice: true,
                    discountPrice: true,
                    createdAt: true,
                    status: true,
                },
                take: 5
            },
        },
        take: 4
    })

    return result
}

export const getFeaturedCategory = async () => {
    const result = await db.category.findMany({
        where: {
            isActive: true,
            isFeatured: true,
        },
        select: {
            id: true,
            name: true,
            imageUrl: true,
        }
    })

    return result
}



export const getWaletBalanceById = async (id: string) => {
    const result = await db.user.findUnique({
        where: {
            id: id
        },
        select: {
            wallet: true,
        }
    })

    return result
}

export const getOrderDataById = async (id: string) => {
    const result = await db.order.findUnique({
        where: {
            id: id
        },
        select: {
            totalPrice: true,
            createdAt: true,
            orderNumber: true,
            cartItems: {
                select: {
                    productName: true,
                    productQuantity: true,
                    sellingPrice: true,
                    productImage: true,
                },
            },
        },
    })

    return result
}