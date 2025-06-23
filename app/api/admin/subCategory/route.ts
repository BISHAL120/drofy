
import db from "@/lib/db";
import { uploadImageFirebase } from "@/lib/firebase/upload";
import { NextResponse } from "next/server";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "@/firebase/storage";


/* 
export async function GET() {
    try {
        const categories = await db.subCategory.findMany();
        return NextResponse.json({ data: categories, message: "Categories fetched successfully" }, { status: 200 });
    } catch (error) {
        console.log("Admin_Sub-Category_GET", error)
        return NextResponse.json(
            { error: "Failed to fetch categories" },
            { status: 500 }
        );
    }
}
 */
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