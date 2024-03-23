import * as z from "zod";
import { UserRole } from "@prisma/client";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ProductSchema = z.object({
  location: z.string().min(1, {
    message: "location is required",
  }),
  price: z.string().min(1, {
    message: "Price is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  duration: z.string().min(1, {
    message: "Duration is required",
  }),
  category: z.string().min(1, {
    message: "Category is required",
  }),
  image: z
    .any
    // {
    // image: z.any(),
    // .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    // .refine(
    //   (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    //   "Only .jpg, .jpeg, .png and .webp formats are supported."
    // ),
    // }
    (),
  // userId: z.string(),
});

export const favoriteSchema = z.object({
  userId: z.string(),
  productId: z.string(),
});

export const LocationSchema = z.object({
  city: z.string(),
  lat: z.number(),
  lng: z.number(),
  address: z.string(),
});
