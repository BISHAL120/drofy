import db from "@/lib/db";
import { deleteFirebaseImage } from "@/lib/firebase/deleteImage";
import { uploadImageFirebase } from "@/lib/firebase/upload";
import { ImageObj } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuIdV4 } from "uuid";



export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const files = formData.getAll("imageUrl") as File[];
        const { name,
            shortDescription,
            fullDescription,
            categoryId,
            subCategoryId,
            status,
            variant,
            cost,
            sellingPrice,
            discountPrice,
            stock, 
            ratings,
            deliveryCharge,
            videoUrl,
            brand,
            weight,
            dimensions,
            metaTitle,
            metaDescription,
            stockAlert,
            isFeatured,
            trackInventory,
            inStock
        } = JSON.parse(formData.get("Details") as string);

        if (!files) {
            return NextResponse.json({ error: "files is required" }, { status: 400 });
        }
        const images: ImageObj[] = []
        await Promise.all(files.map(async (file) => {

            const customID = uuIdV4()
            const { url } = await uploadImageFirebase(file, "Products", customID + "_");
            images.push({
                imageUrl: url,
                imageID: customID,
            })
        }))


        const productCount = await db.product.count();
        const productCode = `PROD-${productCount + 1}`;


        const product = await db.product.create({
            data: {
                name,
                shortDescription,
                fullDescription,
                categoryId,
                subCategoryId,
                status,
                cost: Number(cost),
                sellingPrice: Number(sellingPrice),
                discountPrice: Number(discountPrice),
                stock: Number(stock),
                ratings,
                deliveryCharge: Number(deliveryCharge),
                images: images,
                videoUrl,
                variant,
                brand,
                sku: productCode,
                weight: Number(weight),
                dimensions,
                metaTitle,
                metaDescription,
                stockAlert: Number(stockAlert),
                isFeatured,
                trackInventory,
                inStock,
            }
        });

        if (product) {

            await db.category.update({
                where: { id: categoryId },
                data: { productCount: { increment: 1 } },
            });

            await db.subCategory.update({
                where: { id: subCategoryId },
                data: { productCount: { increment: 1 } },
            });
        }

        return NextResponse.json(
            { message: "Product Created successful", data: product },
            { status: 201 }
        );
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Error creating product", error },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        const { id } = body;

        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        // Get the product details first
        const product = await db.product.findUnique({
            where: { id },
            select: { images: true, categoryId: true, subCategoryId: true },
        });

        if (!product) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // Delete image from Firebase if exists
        if (product.images) {
            await Promise.all(product.images.map(async (image) => {
                await deleteFirebaseImage(image.imageUrl)
            }))
        }

        // Delete the product from database
        await db.product.delete({
            where: { id }
        });

        // Decrement product count in category and subcategory
        if (product.categoryId) {
            await db.category.update({
                where: { id: product.categoryId },
                data: { productCount: { decrement: 1 } },
            });
        }

        if (product.subCategoryId) {
            await db.subCategory.update({
                where: { id: product.subCategoryId },
                data: { productCount: { decrement: 1 } },
            });
        }

        return NextResponse.json(
            { message: "Product deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error deleting product", error },
            { status: 500 }
        );
    }
}


