import db from "@/lib/db";
import { isAdmin } from "../checkAccess";
import { ProductStatus, ResellerLevel, UserStatus } from "@prisma/client";

export const getAllCategories = async () => {
    isAdmin();
    const categories = await db.category.findMany({
        orderBy: {
            sortOrder: 'asc'
        },
        select: {
            id: true,
            name: true,
            description: true,
            productCount: true,
            slug: true,
            imageUrl: true,
            isActive: true,
            isFeatured: true,
            subCategory: {
                orderBy: {
                    sortOrder: 'asc'
                },
                select: {
                    id: true,
                    name: true,
                    productCount: true
                }
            }
        }
    })

    return categories;
}

export const getAllCategories_name_id = async () => {
    isAdmin();
    const categories = await db.category.findMany({
        orderBy: {
            sortOrder: 'asc'
        },
        select: {
            id: true,
            name: true,
        }
    })

    return categories;
}

/* For Category form don't need to add select field need all the data */
export const getCategory = async (id: string) => {
    isAdmin();
    const category = await db.category.findUnique({
        where: {
            id: id
        },
    })

    return category;
}

export const getAllProducts = async ({
    search,
    category,
    status,
    currentPage
}: {
    search: string,
    category: string,
    status: string
    currentPage: number
}) => {
    isAdmin();

    interface WhereClause {
        categoryId?: string;
        status?: ProductStatus;
        isDeleted?: boolean;
        OR?: {
            name?: {
                contains?: string;
                mode?: 'insensitive';
            };
            sku?: {
                contains?: string;
                mode?: 'insensitive';
            };
            SubCategory?: {
                name?: {
                    contains?: string;
                    mode?: 'insensitive';
                };
            };
        }[];
    }
    // Build where clause object
    const whereClause: WhereClause = {};
    // Search filter
    if (search && search.trim() !== '') {
        whereClause.OR = [
            {
                name: {
                    contains: search.trim(),
                    mode: 'insensitive'
                }
            },
            {
                sku: {
                    contains: search.trim(),
                    mode: 'insensitive'
                }
            },
            {
                SubCategory: {
                    name: {
                        contains: search.trim(),
                        mode: 'insensitive'
                    }
                }
            }
        ];
    }
    // Category filter
    if (category && category.trim() !== '') {
        whereClause.categoryId = category.trim();
    }
    // Status filter - only apply if status is specified
    if (status && status.trim() !== '') {
        whereClause.status = status.trim() as ProductStatus;
    }
    const products = await db.product.findMany({
        orderBy: {
            createdAt: 'asc'
        },
        where: whereClause,
        select: {
            id: true,
            images: true,
            name: true,
            sku: true,
            cost: true,
            sellingPrice: true,
            discountPrice: true,
            inStock: true,
            stock: true,
            saleCount: true,
            isDeleted: true,
            status: true,
            isFeatured: true,
            category: {
                select: {
                    name: true
                }
            },
            SubCategory: {
                select: {
                    name: true
                }
            }
        },
        skip: currentPage * 10,
        take: 10,
    });

    return products;
};

/* For Product form don't need to add select field need all the data */
export const getProduct = async (id: string) => {
    isAdmin();
    const category = await db.product.findUnique({
        where: {
            id: id
        },
    })

    return category;
}

export const getDeletedProducts = async (currentPage: number) => {
    isAdmin();
    const products = await db.product.findMany({
        where: {
            isDeleted: true
        },
        skip: currentPage * 10,
        take: 10,
        select: {
            id: true,
            images: true,
            name: true,
            sku: true,
            cost: true,
            sellingPrice: true,
            discountPrice: true,
            isDeleted: true,
            inStock: true,
            stock: true,
            saleCount: true,

            category: {
                select: {
                    name: true
                }
            },
            SubCategory: {
                select: {
                    name: true
                }
            }
        }
    })

    return products;
}

/* For subcategory form don't need to add select field need all the data */
export const getSubCategoryById = async (id: string) => {
    isAdmin();
    const subCategory = await db.subCategory.findUnique({
        where: {
            id: id
        }
    })

    return subCategory;
}

export const getAllResellers = async ({
    search,
    level,
    status,
    currentPage
}: {
    search: string,
    level: string,
    status: string,
    currentPage: number
}) => {
    isAdmin();
    interface WhereClause {
        status?: UserStatus;
        resellerLevel?: ResellerLevel;
        OR?: {
            name?: {
                contains?: string;
                mode?: 'insensitive';
            };

        }[];
    }
    // Build where clause object
    const whereClause: WhereClause = {};
    // Search filter
    if (search && search.trim() !== '') {
        whereClause.OR = [
            {
                name: {
                    contains: search.trim(),
                    mode: 'insensitive'
                }
            },

        ];
    }

    // Status filter - only apply if status is specified
    if (status && status.trim() !== '') {
        whereClause.status = status.trim() as UserStatus;
    }
    if (level && level.trim() !== '') {
        whereClause.resellerLevel = level.trim() as ResellerLevel;
    }

    const resellers = await db.user.findMany({
        orderBy: {
            createdAt: 'asc'
        },
        skip: currentPage * 10,
        take: 10,
        where: whereClause,
        select: {
            id: true,
            profileImage: true,
            name: true,
            referralCode: true,
            phone: true,
            email: true,
            resellerLevel: true,
            saleCount: true,
            totalSales: true,
            wallet: true,
            status: true,
            createdAt: true

        }
    });

    return resellers;
}

export const getNewResellers = async ({ search }: { search: string }) => {
    isAdmin();
    const resellers = await db.user.findMany({
        where: {
            isActive: false,
            // status: "INACTIVE",
            OR: [
                {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    phone: {
                        contains: search,
                        mode: 'insensitive'
                    }

                }
            ]
        },
        orderBy: {
            createdAt: 'asc'
        },
        select: {
            id: true,
            profileImage: true,
            name: true,
            referralCode: true,
            phone: true,
            email: true,
            resellerLevel: true,
            saleCount: true,
            totalSales: true,
            wallet: true,
            status: true,
            isActive: true,
            createdAt: true

        }
    })

    return resellers;
}

export const getResellerById = async (id: string) => {
    isAdmin();
    const reseller = await db.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true,
            name: true,
            phone: true,
            email: true,
            address: true,
            referralCode: true,
            profileImage: true,
            companyName: true,
            resellerLevel: true,
            status: true,
            saleCount: true,
            totalSales: true,
            wallet: true,
            isActive: true,
            createdAt: true,

        }
    })

    return reseller;
}

export const referredUsers = async (code: number | undefined) => {
    isAdmin();
    if (!code) {
        throw new Error("Referral code not found");
    }

    const users = await db.user.count({
        where: {
            referredBy: code.toString()
        }
    })

    return users;
}
