import { z } from "zod";

export const loginSchema = z.object({
    number: z.string().regex(/^01[3-9]\d{8}$/, 'নাম্বারটি সঠিক নয়!').max(11),
    password: z.string().min(8, { message: "সর্বনিম্ন আটটি অক্ষর দিন" }).max(32),
})
export const registerSchema = z.object({
    name: z.string().min(3, {message: "আপনার নাম লিখুন"}).max(32),
    number: z.string().min(11, {message: "আপনার নাম্বার লিখুন"}).regex(/^01[3-9]\d{8}$/, 'নাম্বারটি সঠিক নয়!').max(11),
    referralCode: z.string().min(1, { message: "রেফারাল কোড দিন" }).max(32),
    password: z.string().min(8, { message: "সর্বনিম্ন আটটি অক্ষর দিন" }).max(32),
    confirmPassword: z.string().min(8, { message: "সর্বনিম্ন আটটি অক্ষর দিন" }).max(32),
    email: z.string({required_error: "আপনার ইমেইল লিখুন"}).email({ message: "ইমেইল সঠিক নয়!" }),
    address: z.string().optional(),
})
