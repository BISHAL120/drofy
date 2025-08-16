import { z } from "zod";

export const withdrawSchema = z.object({
  paymentType: z.string().min(1, {
    message: "একটি পেমেন্ট মেথড নির্বাচন করুন",
  }),
  amount: z
    .string()
    .min(1, {
      message: "একটি সঠিক পরিমাণ প্রদান করুন",
    })
    .refine(
      (val) => {
        const num = parseInt(val);
        return num >= 50 && num <= 25000;
      },
      {
        message: "টাকার পরিমাণ ৫০ থেকে ২৫০০০ এর মধ্যে হতে হবে",
      }
    ),
  accountNumber: z
    .string()
    .min(11, {
      message: "একটা বাংলাদেশি নাম্বার প্রদান করুন",
    })
    .max(11, {
      message: "নাম্বারটি সঠিক নয়!",
    })
    .regex(/^01[3-9]\d{8}$/, {
      message: "নাম্বারটি সঠিক নয়!",
    }),
});