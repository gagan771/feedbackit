import {z} from 'zod';
export const UserValidation = z.string().min(3, "atleast 2 char").max(20, "atmost 20 char").regex(/^[a-zA-Z0-9_]*$/, "only alphanumeric and underscore");

export const signUPSchema = z.object({
    username: UserValidation,
    email: z.string().email(),
    password: z.string().min(8, "atleast 8 char"),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: "passwords do not match", path: ["confirmPassword"] });