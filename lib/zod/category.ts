"use client"

import { z } from "zod"

export const categorySchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    slug: z.string().min(2, { message: "Slug is required" }),
    description: z.string().min(2, { message: "Description is required" }),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
    sortOrder: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
})

export const subCategorySchema = z.object({
    name: z.string().min(2, { message: "Name is required" }),
    slug: z.string().min(2, { message: "Slug is required" }),
    categoryId: z.string().min(2, { message: "Parent category is required" }),
    description: z.string().min(2, { message: "Description is required" }),
    isActive: z.boolean(),
    isFeatured: z.boolean(),
    sortOrder: z.string(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
})
