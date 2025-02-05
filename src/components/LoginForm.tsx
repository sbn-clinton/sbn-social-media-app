"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),

  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const LoginForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Card className="w-[70%] md:max-w-md mx-auto flex flex-col gap-8 md:12 p-5 bg-white rounded-lg shadow-md">
      <Button variant={"outline"} className="w-full text-xs md:text-base">
        <FcGoogle className="md:w-6 md:h-6 w-4 h-4" />
        Sign Up with Google
      </Button>

      <div className="flex items-center gap-2">
        <hr className="w-full border-1 border-gray-300" />
        <p className="text-xs md:text-base text-gray-500">or</p>
        <hr className="w-full border-1 border-gray-300" />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Password" {...field} type="password" />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>

      <p className="text-xs md:text-base text-center text-gray-600">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-slate-800 font-semibold">
          Sign Up
        </Link>
      </p>
    </Card>
  );
};

export default LoginForm;
