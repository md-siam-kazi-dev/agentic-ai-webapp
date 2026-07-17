import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    password: z
      .string()
      .min(8, "At least 8 characters.")
      .regex(/[A-Z]/, "Add one uppercase letter.")
      .regex(/[a-z]/, "Add one lowercase letter.")
      .regex(/\d/, "Add one number.")
      .regex(/[^A-Za-z0-9]/, "Add one special character."),
    confirm: z.string().min(1, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match.",
    path: ["confirm"],
  });

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

export const DEMO_CREDENTIALS = {
  email: "demo@pathwise.dev",
  password: "Demo1234!",
};
