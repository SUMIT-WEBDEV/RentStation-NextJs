// ProductSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function ProductSkeleton() {
    return (
        <Link
            href={`/item/`}
            className="border border-gray rounded-md lg:p-3 p-2 bg-white h-fit"
        >
            <div className="lg:w-64 w-auto h-40 lg:h-60 z-10">

                <Skeleton className="h-40 lg:h-60" />
            </div>
            <div className="flex flex-col h-full justify-between space-y-2 pt-5">

                <Skeleton className="h-6 w-36" />
                <Skeleton className="h-4 w-48" />
                <div className="flex">
                    <Skeleton className="h-4 w-24" />
                </div>
            </div >
        </Link>
    );
}
