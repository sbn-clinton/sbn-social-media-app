import { z } from "zod";


export const signUpFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type signUpFormType = z.infer<typeof signUpFormSchema>;


export const signInFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type signInFormType = z.infer<typeof signInFormSchema>;

export type profileFormType = {
  fullName: string;
  username: string;
  bio: string | null;
  imageId: string | null;
  file: File | null;
  userId: string;
}

export type createPostFormType = {
  content: string;
  file?: File | null;
}

export type createCommentFormType = {
  comment: string;
  postId: string;
  creator: string;
}

export type editPostFormType = {
  content: string;
  file?: File | null;
  postId: string;
  creator: string;
  imageId: string;
}

export type sendMessageFormType = {
  message: string;
  receiver: string;
}