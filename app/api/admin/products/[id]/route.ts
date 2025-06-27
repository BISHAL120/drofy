import db from "@/lib/db"
import { deleteFirebaseImage } from "@/lib/firebase/deleteImage"
import { uploadImageFirebase } from "@/lib/firebase/upload"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const formData = await req.formData()
        const image = formData.get("imageUrl") as File | null
        const body = JSON.parse(formData.get("Details") as string)

        let imageUrl = body.imageUrl // Initialize with existing URL

        // Check if image is provided and update imageUrl
        if (image && image.size > 0) {
            try {

                if (body.imageUrl) {
                    await deleteFirebaseImage(body.imageUrl)
                }
                // Upload new image
                const { url } = await uploadImageFirebase(image, "Products");
                imageUrl = url;

            } catch (error) {
                console.log("Product Image processing error:", error)
                if (error instanceof Error) {
                    return NextResponse.json(
                        { message: `Image update failed: ${error.message}` },
                        { status: 500 }
                    );
                }
            }
        }

        const updateProduct = await db.product.update({
            where: { id },
            data: {
                name: body.name,
                shortDescription: body.shortDescription,
                fullDescription: body.fullDescription,
                brand: body.brand,
                sku: body.sku,
                isFeatured: body.isFeatured,
                status: body.status,
                variant: body.variant,
                cost: Number(body.cost),
                sellingPrice: Number(body.sellingPrice),
                discountPrice: Number(body.discountPrice),
                trackInventory: body.trackInventory,
                stockAlert: Number(body.stockAlert),
                imageUrl: imageUrl, // Use existing or new URL
                videoUrl: body.videoUrl,
                deliveryCharge: Number(body.deliveryCharge),
                weight: Number(body.weight),
                dimensions: body.dimensions,
                metaTitle: body.metaTitle,
                metaDescription: body.metaDescription,
                inStock: body.inStock,
                stock: Number(body.stock),

            },
        });

        return NextResponse.json(
            { data: updateProduct, message: "Product updated successfully" },
            { status: 200 }
        );


    } catch (error) {
        console.log("PRODUCT UPDATE PATCH ERROR:", error)
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        // Find the product first
        const product = await db.product.findUnique({
            where: { id }
        })

        if (!product) {
            return NextResponse.json(
                { message: "Product not found" },
                { status: 404 }
            )
        }

        // Soft delete by updating isDeleted field
        const deletedProduct = await db.product.update({
            where: { id },
            data: {
                isDeleted: product.isDeleted ? false : true, // Toggle the isDeleted status
                status: product.isDeleted ? "ACTIVE" : "INACTIVE", // Set status to ACTIVE or INACTIVE based on isDeleted
            }
        })

        return NextResponse.json(
            {
                data: deletedProduct,
                message: product.isDeleted ? "Product restored successfully" : "Product deleted successfully", // Provide appropriate message based on isDeleted status
            },
            { status: 200 }
        )

    } catch (error) {
        console.log("PRODUCT DELETE ERROR:", error)
        if (error instanceof Error) {
            return NextResponse.json(
                { message: `Failed to delete product: ${error.message}` },
                { status: 500 }
            )
        }
        return NextResponse.json(
            { message: "Internal server error occurred while deleting product" },
            { status: 500 }
        )
    }
}
