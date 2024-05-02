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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createProduct } from "@/actions/create-product";
import { ProductSchema } from "@/schemas";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ADDRESS_API, SEARCH_LOCATION_API } from "@/lib/constant";
import { useRouter } from "next/navigation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { categoryData } from "./category/category-data";
import { cn } from "@/lib/utils";


// import { CldImage } from "next-cloudinary";

function ProductForm() {
  const user = useCurrentUser();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();



  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined
  );

  // location functionality states
  const CORSPROXY = process.env.NEXT_PUBLIC_CORSPROXY
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [locations, setLocations] = useState([])
  const [sellerLocation, setSellerLocation] = useState<string>("")
  const [SearchText, setSearchText] = useState<string>(sellerLocation || "")

  //category states
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")


  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      location: "",
      price: "",
      description: "",
      title: "",
      duration: "",
      category: "",
      image: undefined,
    },
  });


  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
    console.log("values", values);

    const formData = new FormData();
    formData.append("file", selectedImage!);
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

    const serializableValues = {
      location: sellerLocation,
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

        if (!data.error) {
          form.reset();
          setSelectedImage(undefined);
        }
      });
    });
  };

  const handleSearchLocation = async (e: any) => {
    try {
      setSearchText(e.target.value);
      setShowSuggestion(true)
      if (SearchText.length >= 3) {
        const response = await fetch(CORSPROXY + SEARCH_LOCATION_API + SearchText)
        if (!response.ok) {
          console.log("err")
        }
        else {
          const res = await response.json();
          console.log("res", res.data)
          setLocations(res?.data)
        }
      }
    } catch (error) {
      console.log("error is", error)
    }
  }

  const handleUserLocation = async (placeid: string) => {
    try {
      const response = await fetch(CORSPROXY + ADDRESS_API + placeid)
      if (!response.ok) {
        const err = response.status;
        throw new Error("err")
      }
      else {
        const { data } = await response.json();
        setSellerLocation(data[0]?.formatted_address)
        router.refresh()
        setSearchText(data[0]?.formatted_address)
        setShowSuggestion(false)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleCloseLocationBar = () => {
    setShowSuggestion(false)
    setSearchText(sellerLocation || '')
  }

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
                            type="text"
                            onChange={(e) => {
                              field.onChange(e); // Make sure to propagate the onChange event to react-hook-form
                              handleSearchLocation(e); // Also handle your custom logic
                            }}
                            value={SearchText}
                            onFocus={() => setSearchText('')}
                            onBlur={handleCloseLocationBar}
                            placeholder="Select Location"
                            autoComplete="off"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    {/* <LocationOnIcon className="text-gray-500 right-3" /> */}

                    {showSuggestion && locations.length > 0 && (
                      <ul className="relative text-xs top-full w-full bg-slate-50 text-black rounded-md mt-2 shadow-lg border-gray-300 border" id="badButton"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {
                          locations?.map((item: any) => (
                            <div className="text-xs p-2 cursor-pointer" key={item?.place_id} onClick={() => handleUserLocation(item?.place_id)}>
                              {/* <LocationOnIcon className="text-gray-500" /> */}
                              <p className='font-ProximaNovaMed text-color-1'>{item?.structured_formatting?.main_text}</p>
                              <p className='text-color-5 leading-5 font-ProximaNovaThin'>{item?.structured_formatting?.secondary_text}</p>
                            </div>
                          ))
                        }
                      </ul>
                    )}
                  </div>


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
                          <Select {...field} onValueChange={field.onChange}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {
                                categoryData.map((item, key) => (
                                  <SelectItem value={item.text} key={item.text} className="border border-b border-gray-100">{item.text}</SelectItem>
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  {/* <FormField
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
                  /> */}



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
