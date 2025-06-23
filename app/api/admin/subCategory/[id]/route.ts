import db from "@/lib/db";
import { uploadImageFirebase } from "@/lib/firebase/upload";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

/* export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const subCategory = await db.subCategory.findUnique({
            where: {
                id: params.id,
            },
        });

        if (!subCategory) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ data: subCategory, message: "Sub Category retrieved Successfully" }, { status: 200 });
    } catch (error) {
        console.log("Admin_Category_[ID]_GET", error)
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
} */

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const formData = await req.formData();
        const image = formData.get("imageUrl") as File | null;
        const body = JSON.parse(formData.get("Details") as string);

        //  check if slug is unique
        const isSlugExist = await db.subCategory.findUnique({
            where: { slug: body.slug },
        });

        if (isSlugExist && isSlugExist.id !== id) {
            return NextResponse.json(
                { message: "Slug already exists" },
                { status: 400 }
            )
        }

        let imageUrl = body.imageUrl; // Keep existing image by default

        // Only process if new image is provided and valid
        if (image && image.size > 0) {
            try {
                // Delete old image if it exists
                if (body.imageUrl) {
                    const oldImageUrl = new URL(body.imageUrl);
                    const imagePath = decodeURIComponent(
                        oldImageUrl.pathname.split("/o/")[1].split("?")[0]
                    );

                    const storage = getStorage();
                    const imageRef = ref(storage, imagePath); // Use direct path
                    await deleteObject(imageRef);
                }

                // Upload new image
                const { url } = await uploadImageFirebase(image, "SubCategories");
                imageUrl = url;

            } catch (error) {
                console.log("Image processing error:", error);
                // Don't update image URL if upload fails
                if (error instanceof Error) {
                    return NextResponse.json(
                        { message: `Image update failed: ${error.message}` },
                        { status: 500 }
                    );
                }
            }
        }

        // Update database
        const { id: _, sortOrder: __, categoryId, ...dataWithoutId } = body;
        console.log(_, __)
        const updatedSubCategory = await db.subCategory.update({
            where: { id },
            data: {
                ...dataWithoutId,
                imageUrl: imageUrl, // Use existing or new URL
                Category: {
                    connect: {
                        id: categoryId // Connect to the existing category using its ID
                    }
                }
            }
        });

        return NextResponse.json(
            { data: updatedSubCategory, message: "Sub Category updated successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("PATCH ERROR:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
