"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "./ui/select";
import { subjects } from "@/constants";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import SlideInAnimation from "./SlideInAnimation";
import { createNewCompanion } from "@/lib/actions/companion.action";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { Loader } from "lucide-react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Companion name is required",
  }),
  subject: z.string().min(1, {
    message: "Subject is required",
  }),
  topic: z.string().min(1, {
    message: "Topic is required",
  }),
  voice: z.string().min(1, {
    message: "Voice is required",
  }),
  style: z.string().min(1, {
    message: "Style is required",
  }),
  duration: z.coerce.number().min(1, {
    message: "Duration is required",
  }),
});

const CompanionForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            voice: '',
            style: '',
            duration: 15,
        },
    })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const companion = await createNewCompanion(values);

    if (companion) {
      toast.success('Companion created successfully');
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      form.reset();
      redirect(`/companions/${companion.id}`);
    } else {
      toast.error('Failed to create a companion');
      redirect('/');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="w-full lg:w-1/2 md:h-[calc(100vh-100px)] md:overflow-y-auto flex flex-col gap-8 p-4 sm:p-6 md:p-8">
      <SlideInAnimation>
        {/* Logo Start Here */}
        <div className="flex flex-col items-start justify-start gap-2 mb-8">
          <Link href={"/"} className="flex items-center gap-2">
            <div className="flex items-center gap-2.5 border border-purple-600 rounded-md shadow-md">
              <Image
                src={"/images/logo.svg"}
                alt="logo"
                width={36}
                height={36}
                className="object-contain rounded-md"
              />
            </div>
            <h1 className="text-xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
              Companion Builder
            </h1>
          </Link>
          <p className="text-sm text-gray-500">
            Create your own AI companion in minutes with our easy-to-use
            builder.
          </p>
        </div>
        {/* Logo End Here */}
        {/* Form Start Here */}
        <div className="w-full">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Input */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 cursor-pointer">
                    <FormLabel
                      htmlFor="name"
                      className="text-xs cursor-pointer md:text-base"
                    >
                      Companion Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        {...field}
                        placeholder="Enter your companion name"
                        className="w-full border-gray-200 hover:border-green-400 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:border-green-500 focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] transition-all duration-300 ease-in-outborder focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Subject Input */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 cursor-pointer">
                    <FormLabel
                      htmlFor="subject"
                      className="text-xs cursor-pointer md:text-base"
                    >
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full cursor-pointer border-gray-200 hover:border-green-400 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:border-green-500 focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] transition-all duration-300 ease-in-out capitalize">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>

                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem
                              value={subject}
                              key={subject}
                              className="capitalize cursor-pointer p-1"
                            >
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Topic Input */}
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 cursor-pointer">
                    <FormLabel
                      htmlFor="topic"
                      className="text-xs cursor-pointer md:text-base"
                    >
                      What should the companion help with?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="topic"
                        {...field}
                        placeholder="Enter a topic"
                        className="w-full border-gray-200 hover:border-green-400 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:border-green-500 focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] transition-all duration-300 ease-in-outborder focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Voice Input */}
              <FormField
                control={form.control}
                name="voice"
                render={({ field }) => (
                  <FormItem className="space-y-1 cursor-pointer">
                    <FormLabel
                      htmlFor="voice"
                      className="text-xs cursor-pointer md:text-base"
                    >
                      Voice
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full cursor-pointer border-gray-200 hover:border-green-400 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:border-green-500 focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] transition-all duration-300 ease-in-out capitalize">
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>

                        <SelectContent>
                          <SelectItem
                            value="male"
                            className="capitalize cursor-pointer p-1"
                          >
                            male
                          </SelectItem>
                          <SelectItem
                            value="female"
                            className="capitalize cursor-pointer p-1"
                          >
                            female
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Style Input */}
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 cursor-pointer">
                    <FormLabel
                      htmlFor="style"
                      className="text-xs cursor-pointer md:text-base"
                    >
                      Style
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full cursor-pointer border-gray-200 hover:border-green-400 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:border-green-500 focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] transition-all duration-300 ease-in-out capitalize">
                          <SelectValue placeholder="Select a style" />
                        </SelectTrigger>

                        <SelectContent className="cursor-pointer">
                          <SelectItem
                            value="formal"
                            className="capitalize cursor-pointer p-1"
                          >
                            Formal
                          </SelectItem>
                          <SelectItem
                            value="casual"
                            className="capitalize cursor-pointer p-1"
                          >
                            Casual
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Duration Input */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="space-y-0.5 cursor-pointer">
                    <FormLabel
                      htmlFor="duration"
                      className="text-xs cursor-pointer md:text-base"
                    >
                      Estimated session duration in minutes
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="duration"
                        type="number"
                        placeholder="15"
                        {...field}
                        className="w-full cursor-pointer border-gray-200 hover:border-green-400 focus-visible:ring-2 focus-visible:ring-green-500/20 focus-visible:border-green-500 focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] transition-all duration-300 ease-in-outborder focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:shadow-sm"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isLoading}
                type="submit"
                className="w-full cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span>Building your companion...</span>
                    <Loader className="w-4 h-4 animate-spin" />
                  </div>
                ) : (
                  "Build Your Companion"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </SlideInAnimation>
    </div>
  );
};

export default CompanionForm;
