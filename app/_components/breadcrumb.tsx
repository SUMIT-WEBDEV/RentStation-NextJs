"use client"

import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";


export interface BreadcrumbPath {
    label: string;
    url: string | "";
}

interface BreadcrumbProps {
    paths: BreadcrumbPath[];
}

export function BreadcrumbWithCustomSeparator({ paths }: BreadcrumbProps) {

    const [mount, setMount] = useState(false)

    useEffect(() => {
        setMount(true)
    }, [])

    return (
        <div className="hidden lg:block">
            {
                mount &&
                <Breadcrumb>
                    <BreadcrumbList>
                        {
                            paths.slice(0, -1).map((path, index) => (
                                <>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink>
                                            <Link href={path.url}>{path.label}</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    {
                                        path.label ?
                                            <BreadcrumbSeparator /> : null
                                    }
                                </>
                            ))}

                        <BreadcrumbItem>
                            <BreadcrumbPage>{paths[paths.length - 1].label}</BreadcrumbPage>
                        </BreadcrumbItem>

                    </BreadcrumbList>
                </Breadcrumb>
            }
        </div>


    );
}


