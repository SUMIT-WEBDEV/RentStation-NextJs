"use client";

import React, { useState, useTransition } from "react";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createProduct } from "@/actions/create-product";
import { ProductSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { json } from "stream/consumers";
// import { CldImage } from "next-cloudinary";

function ProductForm() {
  const user = useCurrentUser();

  console.log("user is", user?.id);

  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      location: "",
      price: "",
      description: "",
      title: "",
      duration: "",
      category: "",
      image: null, // Ensure it's an object with an 'image' property
    },
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];
      form.setValue("image", file);
    }
  };

  // const onSubmit = (values: z.infer<typeof ProductSchema>) => {
  //   // console.log("Form values:", values);
  //   setError("");
  //   setSuccess("");

  //   console.log("hello world", values);

  // startTransition(() => {
  //   createProduct(values, user?.id).then((data) => {
  //     // setError(data.error);
  //     // setSuccess(data.success);
  //   });
  // });
  // };

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    console.log("values", values);

    const image = values.image.image;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "rentstation");
    const uploadResponse = await fetch(
      "https://api.cloudinary.com/v1_1/ddqpumkxe/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const uploadedImageData = await uploadResponse.json();
    const imageUrl = uploadedImageData.secure_url;
    // console.log(imageUrl);
    // const imageId = JSON.stringify(imageUrl);

    const serializableValues = {
      location: values.location,
      price: values.price,
      description: values.description,
      title: values.title,
      duration: values.duration,
      category: values.category,
      image: imageUrl,
    };

    startTransition(() => {
      createProduct(serializableValues, user?.id).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="w-full flex justify-center h-screen">
      <div className="lg:w-3/5 w-full m-4">
        <h1 className="p-1 font-bold text-xl">Post Your Ad</h1>
        <div className="p-5 border border-gray-300 rounded-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <>
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="location"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="price"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="description"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="title"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="duration"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="category"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="image"
                            type="file"
                            onChange={onFileChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit" className="w-full">
                Post
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
