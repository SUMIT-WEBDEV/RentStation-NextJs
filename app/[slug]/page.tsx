import ProductFilter from "@/app/_components/product-filter";
import { cookies } from 'next/headers';
import { getProductbyLocationCategoryItem } from "@/actions/get-product";
import LocationProductFilter from "../_components/product-location-filter";


type Product = {
    id: string;
    location: string;
    price: string;
    title: string;
    duration: string;
    category: string;
    image?: string | null;
    userId: string;
    createdAt: Date;
};

type paramProps = {
    params: { slug: string };
    searchParams?: { [key: string]: string | string[] | undefined };
}

// /location/?item=itemsname
// /category

async function page({ params, searchParams, }: paramProps) {

    //category
    const category = params.slug.toLowerCase();
    const item = searchParams?.item


    //location
    const nextCookies = cookies().get('userLocation');
    const location = nextCookies ? JSON.parse(nextCookies.value).city : "";

    // console.log("searchParam is", searchParams)
    // console.log("location is", location)
    // console.log("category is", category)

    // const products: Product[] = await getProductbyLocationCategoryItem({ location, title: item, category })

    let products: Product[];

    if (location) {
        products = await getProductbyLocationCategoryItem({ location, title: item });
    } else {
        products = await getProductbyLocationCategoryItem({ category })
    }



    if (products.length === 0) {
        return <div className="w-screen h-screen"> No result found on this product category</div>;
    }

    return (
        <div className="w-full h-full">
            <ProductFilter />
            <LocationProductFilter products={products} item={item} category={category} location={location} />
        </div>
    );
}

export default page;
