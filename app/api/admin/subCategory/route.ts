
import db from "@/lib/db";
import { deleteFirebaseImage } from "@/lib/firebase/deleteImage";
import { uploadImageFirebase } from "@/lib/firebase/upload";
import { NextResponse } from "next/server";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "@/firebase/storage";


export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("imageUrl") as File;
        const details = JSON.parse(formData.get("Details") as string);
        const { name, slug, description, categoryId, isActive, isFeatured, sortOrder, metaTitle, metaDescription } = details;

        if (!file) {
            return NextResponse.json(
                { message: "Image is required" },
                { status: 400 }
            );
        }


        const isSlugExist = await db.subCategory.findUnique({
            where: {
                slug: slug
            }
        });

        if (isSlugExist) {
            return NextResponse.json(
                { message: "Slug already exists" },
                { status: 400 }
            );
        }

        if (!categoryId) {
            return NextResponse.json(
                { message: "categoryId is required" },
                { status: 400 }
            );
        }

        if (!name) {
            return NextResponse.json(
                { message: "Name is required" },
                { status: 400 }
            );
        }

        if (!slug) {
            return NextResponse.json(
                { message: "Slug is required" },
                { status: 400 }
            );
        }
        const sortOrderCount = await db.subCategory.count()

        if (Number(sortOrder) > 0) {
            // check if sortOrder already exists
            const isExisted = await db.subCategory.findFirst({
                where: {
                    sortOrder: Number(sortOrder)
                }
            });

            // if exists, update the sortOrder of the existing category
            if (isExisted) {
                await db.subCategory.update({
                    where: {
                        id: isExisted.id
                    },
                    data: {
                        sortOrder: sortOrderCount + 1
                    }
                });
            }
        }

        const { url } = await uploadImageFirebase(file, "SubCategories");

        const subCategory = await db.subCategory.create({
            data: {
                name,
                slug,
                description,
                sortOrder: Number(sortOrder) > 0 ? Number(sortOrder) : Number(sortOrderCount + 1),
                imageUrl: url,
                isActive,
                isFeatured,
                categoryId,
                metaTitle,
                metaDescription,
            },
        });

        return NextResponse.json({ data: subCategory, message: "Sub Category created successfully" }, { status: 201 });
    } catch (error) {
        console.log("Admin_Category_POST", error)
        return NextResponse.json(
            { message: "Failed to create category" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const body = await request.json();

        const { id } = body;

        if (!id) {
            return NextResponse.json({ message: "Sub Category ID is required" }, { status: 400 });
        }

        // Check if any product exist on that sub category
        const isProductExist = await db.product.findFirst({
            where: {
                subCategoryId: id
            }
        });

        // If product exists, return the function
        if (isProductExist) {
            return NextResponse.json({ message: "Delete All Related Product First" }, { status: 400 });
        }


        // Get the sub category details first
        const subCategory = await db.subCategory.findUnique({
            where: { id },
            select: {
                imageUrl: true
            },
        });

        if (!subCategory) {
            return NextResponse.json({ message: "Sub Category not found" }, { status: 404 });
        }

        /* Delete the sub category image from firebase storage */
        if (subCategory?.imageUrl) {
            await deleteFirebaseImage(subCategory.imageUrl)
        }

        // Delete the Sub category from database
        await db.subCategory.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: "Sub Category deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error deleting Sub Category", error },
            { status: 500 }
        );
    }
}
