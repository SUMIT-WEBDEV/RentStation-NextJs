"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useCurrentUser } from "@/hooks/use-current-user";
import { usePathname, useRouter } from "next/navigation";
import { createConversationId } from "@/actions/create-conversationId";
import { Copy, Edit2, Edit3Icon, Facebook, Star } from "lucide-react";
import { MapPin } from "lucide-react";
import { Heart } from "lucide-react";
import { Share2 } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { User } from "lucide-react";
import { MessageSquareMore } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProductShareDialog from "./product-share-dialog";


const review = [1, 2, 3, 4, 5];

interface IUser {
  id: string;
  name: string | null;
}
interface Products {
  id: string;
  location: string;
  price: string;
  description: string;
  title: string;
  duration: string;
  category: string;
  image: string | null;
  userId: string;
  createdAt: Date;
  user: IUser;
}

interface ProductDetailsProps {
  product: Products;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const user = useCurrentUser();
  // console.log("user is", user);
  const Router = useRouter();
  const currentPage = usePathname();



  const handleChat = (id: string) => {
    if (user) {
      createConversationId(user?.id, id)
        .then((data) => {
          console.log("data is conversationId-----", data);
          Router.push(`/chat/new/${data.conversationId}/${id}`);
        })
        .catch((err) => console.error(err));
    } else {
      Router.push(`/auth/login?callbackUrl=${encodeURIComponent(currentPage)}`);
    }
  };


  const [copy, setCopy] = useState(false)


  const handleCloseDialog = () => {
    setCopy(false);
    console.log("I am closed")
  };


  return (
    <div className="">
      {product ? (
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col gap-10 md:flex-row md:items-center p-[20px] md:justify-center md:gap-40 shadow-md w-full">
            {product.image ? (
              <div className="">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={200}
                  className="rounded-md"
                />
              </div>
            ) : (
              <div className="bg-gray-400" />
            )}

            <div className="flex flex-col md:justify-center gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-5xl font-bold">{product.title}</h1>
                <div className="flex gap-2 items-center">
                  <p className="font-bold">4.6</p>
                  {review.map((star) => (
                    <Star key={star} className="w-4" />
                  ))}
                  <p className="text-sm underline cursor-pointer text-gray-400">
                    195 reviews
                  </p>
                </div>
              </div>

              <div>
                <p className="text-4xl font-medium">₹ {product.price}</p>
              </div>
              <div className="flex items-center gap-3 flex-wrap max-w-full">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 text-gray-400" />
                  <p className="font-medium text-sm text-gray-400">
                    {product.location}
                  </p>
                </div>
                <div className="flex items-center gap-1 ">
                  <CalendarDays className="w-3 text-gray-400" />
                  <p className="font-medium text-sm text-gray-400">
                    {product.duration}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 text-gray-400" />
                  <p className="font-medium text-sm text-gray-400">
                    {product.user.name}
                  </p>
                </div>
              </div>

              {
                user?.id === product.userId ? (
                  <Link
                    href="/my-ads"
                    className="p-5 flex items-center gap-2 rounded-lg bg-[#0F172A] text-white"
                  >
                    <Edit3Icon />
                    Edit your product
                  </Link>
                ) : (
                  <Button
                    className="p-5 flex items-center gap-2 rounded-lg"
                    onClick={() => handleChat(product.userId)}
                  >
                    <MessageSquareMore />
                    Chat with Renter
                  </Button>
                )
              }


              <div className="flex gap-16 items-center justify-center">

                <div className="flex flex-col items-center gap-2 cursor-pointer">
                  <Heart />
                  <p className="text-sm">Shortlist</p>
                </div>

                <div className="flex flex-col items-center gap-2 cursor-pointer">
                  <Star />
                  <p className="text-sm">Review</p>
                </div>

                <Dialog >
                  <DialogTrigger asChild>
                    <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={handleCloseDialog}>
                      <Share2 />
                      <p className="text-sm">Share</p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="p-0 bg-transparent border-none max-w-[480px]">
                    <ProductShareDialog
                      setCopy={setCopy}
                      copy={copy}
                      productTitle={product.title}
                    />

                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="w-full p-5">
            <div className="shadow border rounded-md p-5 flex flex-col gap-5">
              <h1 className="font-bold text-2xl">{product.title}</h1>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <p className="font-medium text-l text-gray-600">Location:</p>
                  <p className="font-medium text-l text-gray-400">
                    {product.location}
                  </p>
                </div>

                <div className="flex gap-3">
                  <p className="font-medium text-l text-gray-600">Category:</p>
                  <p className="font-medium text-l text-gray-400">
                    {product.category}
                  </p>
                </div>
                <div className="flex gap-3">
                  <p className="font-medium text-l text-gray-600">
                    Created At:
                  </p>
                  <p className="font-medium text-l text-gray-400">
                    {/* {product.createdAt.toLocaleDateString()} */}
                    10Jan
                  </p>
                </div>
                <div className="flex gap-3">
                  <p className="font-medium text-l text-gray-600">Seller:</p>
                  <p className="font-medium text-l text-gray-400">
                    {product.user.name}
                  </p>
                </div>
                <div className="flex gap-3">
                  <p className="font-medium text-l text-gray-600">
                    Description:
                  </p>
                  <p className="font-medium text-l text-gray-400">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductDetails;
