import ProductFilter from "@/app/_components/product-filter";
import { cookies } from 'next/headers';
import { getProductbyLocationCategoryItem } from "@/actions/get-product";
import LocationProductFilter from "../_components/product-location-filter";
import { BreadcrumbWithCustomSeparator } from "../_components/breadcrumb";
import CategoryLocationProductFilter from "../_components/product-category-location-filter";
import NotFound from "../_components/not-found-product";


async function page({ params }: { params: { slug: string } }) {

    //slug = location | category => category only for first level nesting
    const category = params.slug.toLowerCase();

    // location
    const nextCookies = cookies().get('userLocation');
    const location = nextCookies ? JSON.parse(nextCookies.value).city : "";


    const products = await getProductbyLocationCategoryItem({ location, category });

    const breadcrumbItems = [
        { label: "Home", url: "/" },
        { label: category, url: `/` },
    ];


    if (products.length === 0) {
        return <NotFound />

    }


    return (
        <div className="flex flex-col space-y-8">
            <BreadcrumbWithCustomSeparator paths={breadcrumbItems} />
            <h1>{category} {location && `on ${location}`}</h1>
            <div className="flex flex-col w-full ">
                <div className="mx-auto">
                    <ProductFilter />
                    <div className="flex justify-center items-center">
                        <CategoryLocationProductFilter products={products} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;



//TODO: If the category doesn't match, we can show the NOT FOUND PAGE.





