import db from "@/lib/db";

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
        where: {
            isActive: true,
        },
        select: {
            id: true,
            name: true,
            productCount: true,
            subCategory: {
                where: {
                    isActive: true,
                },
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
            videoUrl: true,
            name: true,
            shortDescription: true,
            sellingPrice: true,
            discountPrice: true,
            variant: true,
            note: true,
            inStock: true,
            ratings: true,
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

export const getBalanceStatementsById = async (id: string) => {
    const result = await db.walletTransaction.findMany({
        where: {
            userId: id
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            amount: true,
            walletBalance: true,
            details: true,
            type: true,
            createdAt: true,
        }
    })

    return result
}

export const getOrersHistoryById = async (id: string) => {
    const result = await db.order.findMany({
        where: {
            resellerId: id,
            OR: [
                {
                    status: {
                        equals: "PROCESSING",
                    }
                },
                {
                    status: {
                        equals: "PENDING",
                    }

                }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            status: true,
            advanceCharge: true,

            totalPrice: true,
            deliveryCharge: true,
            totalProfit: true,
            orderNumber: true,
            tracking_code: true,
            note: true,
            cartItems: {
                select: {
                    productName: true,
                    productQuantity: true,
                    productSize: true,
                    productImage: true,
                    product: {
                        select: {
                            sku: true
                        }
                    },
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    })

    return result
}


export const getStockOutProducts = async () => {
    const result = await db.product.findMany({
        where: {
            OR: [
                {
                    inStock: false
                },
                {
                    stock: {
                        lt: 1
                    }
                }
            ]
        },
        select: {
            id: true,
            name: true,
            sellingPrice: true,
            discountPrice: true,
            images: true,
            createdAt: true,
            SubCategory: {
                select: {
                    name: true
                }
            }
        }
    })

    return result
}