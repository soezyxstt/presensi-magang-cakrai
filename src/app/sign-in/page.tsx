"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { type BaseSyntheticEvent, useState } from "react";
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>, e?: BaseSyntheticEvent<object, unknown, unknown>) {
    e?.preventDefault();
    console.log(data);
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center">
      <Form {...form}>
        <form onSubmit={(e) => form.handleSubmit(onSubmit)(e)} className="w-96 max-w-[90vw] rounded-xl bg-white bg-opacity-20 px-8 py-10 backdrop-blur-sm text-violet-800 space-y-3 shadow-2xl">
          <h1 className="text-3xl font-bold text-center text-pink-700">SIGN IN</h1>
          <h2 className="text-center font-semibold italic">Enter your god damn infos below to sign in, or just leave!!</h2>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Type your shit here brow"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.username?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='font-semibold'>Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Type in your secret word"
                      {...field}
                    />
                    {!showPassword ? (
                      <FiEyeOff
                        className="absolute right-3 cursor-pointer text-violet-400"
                        onClick={() => setShowPassword(true)}
                      />
                    ) : (
                      <FiEye
                        className="absolute right-3 cursor-pointer text-violet-400"
                        onClick={() => setShowPassword(false)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full font-semibold bg-gradient-to-r from-cyan-500 to-pink-500 via-violet-500">SIGN UP</Button>
          <h6 className="text-xs text-center font-bold">To sign up, pls contact admin and hail Garudago!!!</h6>
        </form>
      </Form>
    </div>
  );
}
