import { object, string } from "zod";

export const loginSchema = object({
    number: string().min(10).max(10),
    password: string().min(8).max(32),
    // email: string().email(),
    // name: string().min(3).max(32),

})
export const registerSchema = object({
    number: string().min(10).max(10),
    // password: string().min(8).max(32),
    // email: string().email(),
    // name: string().min(3).max(32),

})