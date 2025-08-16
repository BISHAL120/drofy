import { z } from "zod";

export const FormSchema = z.object({
    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, "নাম্বারটি সঠিক নয়!")
        .min(11)
        .max(11),
    name: z.string().min(2, {
        message: "কাস্টমারের নাম লিখুন|",
    }),
    district: z.string({
        required_error: "জেলা সিলেক্ট করুন|",
    }).min(2, {
        message: "জেলা সিলেক্ট করুন|"
    }),
    upazila: z.string({
        required_error: "উপজেলা সিলেক্ট করুন|",
    }).min(2, {
        message: "উপজেলা সিলেক্ট করুন|"
    }),
    address: z.string().min(10, {
        message: "কাস্টমারের এড্রেস লিখুন|",
    }).min(1),
    deliveryCharge: z.string().min(1, {
        message: "Delivery charge is required.",
    }),
    advanceCharge: z.enum(["yes", "no"], {
        required_error: "Please select delivery preference.",
    }),
    comments: z.string().optional(),
});