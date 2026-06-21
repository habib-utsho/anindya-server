import z from "zod";

export const createUserZodSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    first_name: z.string().min(2, "First name must be at least 2 characters long"),
    last_name: z.string().min(2, "Last name must be at least 2 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long"),
    date_of_birth: z.string().refine((date) => {
        const parsedDate = Date.parse(date);
        return !isNaN(parsedDate);
    }, "Invalid date format, expected a valid date string"),
    gender: z.enum(["Men", "Women", "Unisex"], "Gender must be 'Men', '  Women', or 'Unisex'"),
    role_id: z.string().optional(),
    status: z.enum(["active", "inactive"], "Status must be 'active' or 'inactive'").optional(),
});