import db from "@/lib/db";
import { storage } from "@/lib/firebase/firebase";
import { uploadImageFirebase } from "@/lib/firebase/upload";
import { deleteObject, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuIdV4 } from "uuid";


export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const formData = await req.formData()
        const images = formData.getAll("imageUrl") as File[] | null
        const body = JSON.parse(formData.get("Details") as string)

        interface imageProps {
            imageUrl: string
            imageID: string
        }

        const existingImages = body.images // Initialize with existing URL

        if (body.deletedImages) {
            body.deletedImages.forEach(async (image: imageProps) => {
                await deleteObject(ref(storage, image.imageUrl))
            })
        }


        // Check if new image is added and update image Object
        if (images && images.length > 0) {
            try {

                await Promise.all(images.map(async (image) => {

                    // Upload new images
                    const customID = uuIdV4()
                    const { url } = await uploadImageFirebase(image, "Products", customID + "_");
                    existingImages.push({
                        imageUrl: url,
                        imageID: customID,
                    })
                }))


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

        const { id: _, deletedImages: __, ...rest } = body

        console.log(_, __)

        const updateProduct = await db.product.update({
            where: { id },
            data: {
                ...rest,
                cost: Number(body.cost),
                sellingPrice: Number(body.sellingPrice),
                discountPrice: Number(body.discountPrice),
                trackInventory: body.trackInventory,
                stockAlert: Number(body.stockAlert),
                images: existingImages, // Use existing and new images
                deliveryCharge: Number(body.deliveryCharge),
                weight: Number(body.weight),
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
