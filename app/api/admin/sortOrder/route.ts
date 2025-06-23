import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const { id, type, existOrder, sortOrder } = await req.json();

        if (type === "category") {
            const isAlreadyExist = await db.category.findFirst({
                where: {
                    sortOrder: Number(sortOrder)
                }
            })

            if (isAlreadyExist) {
                await db.category.update({
                    where: {
                        id: isAlreadyExist.id
                    },
                    data: {
                        sortOrder: Number(existOrder)
                    }
                })
            }

            await db.category.update({
                where: {
                    id
                },
                data: {
                    sortOrder: Number(sortOrder)
                }
            })
        }

        if (type === "subcategory") {
            const isAlreadyExist = await db.subCategory.findFirst({
                where: {
                    sortOrder: Number(sortOrder)
                }
            })

            if (isAlreadyExist) {
                await db.subCategory.update({
                    where: {
                        id: isAlreadyExist.id
                    },
                    data: {
                        sortOrder: Number(existOrder)
                    }
                })
            }

            await db.subCategory.update({
                where: {
                    id
                },
                data: {
                    sortOrder: Number(sortOrder)
                }
            })
        }

        return NextResponse.json(
            { message: "Sort Order Updated successfully." },
            { status: 200 }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}