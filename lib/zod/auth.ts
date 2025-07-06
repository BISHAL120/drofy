import { object, string } from "zod";

export const loginSchema = object({
    number: string().regex(/^01[3-9]\d{8}$/, 'নাম্বারটি সঠিক নয়!').max(11),
    password: string().min(8, { message: "সর্বনিম্ন আটটি অক্ষর দিন" }).max(32),
})
export const registerSchema = object({
    name: string().min(3).max(32),
    number: string().regex(/^01[3-9]\d{8}$/, 'নাম্বারটি সঠিক নয়!').max(11),
    password: string().min(8, { message: "সর্বনিম্ন আটটি অক্ষর দিন" }).max(32),
    confirmPassword: string().min(8, { message: "সর্বনিম্ন আটটি অক্ষর দিন" }).max(32),
    email: string().email().optional(),
    address: string().min(3).max(32).optional(),


})