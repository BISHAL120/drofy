
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
        const { name, slug, description, sortOrder, isActive, isFeatured } = details;

        const isSlugExist = await db.category.findUnique({
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
        if (!description) {
            return NextResponse.json(
                { message: "Description is required" },
                { status: 400 }
            );
        }
        const sortOrderCount = await db.category.count()

        if (Number(sortOrder) > 0) {
            // check if sortOrder already exists
            const isExisted = await db.category.findFirst({
                where: {
                    sortOrder: Number(sortOrder)
                }
            });

            // if exists, update the sortOrder of the existing category
            if (isExisted) {
                await db.category.update({
                    where: {
                        id: isExisted.id
                    },
                    data: {
                        sortOrder: sortOrderCount + 1
                    }
                });
            }
        }

        const { url } = await uploadImageFirebase(file, "Categories");

        const category = await db.category.create({
            data: {
                name,
                slug,
                description,
                sortOrder: Number(sortOrder) > 0 ? Number(sortOrder) : sortOrderCount + 1,
                imageUrl: url,
                isActive,
                isFeatured,
            },
        });

        return NextResponse.json({ data: category, message: "Category created successfully" }, { status: 201 });
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
            return NextResponse.json({ message: "Category ID is required" }, { status: 400 });
        }

        // Check if any sub category exist on that category
        const isSubCategoryExist = await db.subCategory.findFirst({
            where: {
                categoryId: id
            }
        });

        // If subcategory exists, return the function
        if (isSubCategoryExist) {
            return NextResponse.json({ message: "Delete All Sub Category First" }, { status: 400 });
        }


        // Get the category details first
        const category = await db.category.findUnique({
            where: { id },
            select: {
                imageUrl: true
            },
        });

        if (!category) {
            return NextResponse.json({ message: "Category not found" }, { status: 404 });
        }

        if (category?.imageUrl) {
            await deleteFirebaseImage(category.imageUrl)
        }

        // Delete the category from database
        await db.category.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: "Category deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Error deleting category", error },
            { status: 500 }
        );
    }
}
