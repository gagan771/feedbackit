import {z} from 'zod';

export const verifySchema = z.object({
    verifyCode: z.string().min(6, "atleast 6 char").max(6, "atmost 6 char")
});