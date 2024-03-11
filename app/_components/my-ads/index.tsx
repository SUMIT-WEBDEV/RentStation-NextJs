// "use client"

// import React, { useState } from 'react';
// import CardAd from './ad-cards';

// type Product = {
//     id: string;
//     location: string;
//     price: string;
//     title: string;
//     duration: string;
//     category: string;
//     image?: string | null;
//     userId: string;
//     createdAt: Date;
// };

// type ProductsProps = {
//     myAds: Product[];
// };

// const Myads = ({ myAds }: ProductsProps) => {
//     const [activeTab, setActiveTab] = useState<'ads' | 'wishlist'>('ads');

//     return (
//         <div className='w-screen py-12'>
//             <div>
//                 <div className='py-4 lg:px-2 text-3xl font-medium flex space-x-5 '>
//                     <div
//                         className={`border-b-4 pb-1 cursor-pointer ${activeTab === 'ads' ? 'border-b-blue-800' : ''}`}
//                         onClick={() => setActiveTab('ads')}
//                     >
//                         My Ads
//                     </div>
//                     <div
//                         className={`border-b-4 pb-1 cursor-pointer ${activeTab === 'wishlist' ? 'border-b-blue-800' : ''}`}
//                         onClick={() => setActiveTab('wishlist')}
//                     >
//                         My Wishlist
//                     </div>
//                 </div>

// <div className="w-full flex flex-col justify-center items-center">
//     {activeTab === 'ads' && (
//         myAds.map((ad, index) => (
//             <CardAd key={ad.id} {...ad} />
//         ))
//     )}
//     {activeTab === 'wishlist' && (
//         // Render wishlist content here
//         <div>Wishlist Content Goes Here</div>
//     )}
// </div>
//             </div>
//         </div>
//     );
// }

// export default Myads;


"use client"

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardAd from './ad-cards';

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

type ProductsProps = {
    myAds: Product[];
};

const Myads = ({ myAds }: ProductsProps) => {
    return (
        <div className='flex justify-center items-center w-full border '>
            <div className='lg:w-6/12 w-full lg:mx-28 lg:my-14 p-4 border-black'>

                <Tabs defaultValue="myAds" className="w-full">
                    <TabsList className=''>
                        <TabsTrigger value="myAds">Account</TabsTrigger>
                        <TabsTrigger value="wishlist">WishList</TabsTrigger>
                    </TabsList>
                    <TabsContent value="myAds" className=''>
                        <div className="">
                            {
                                myAds.map((ad, index) => (
                                    <CardAd key={ad.id} {...ad} />
                                ))
                            }
                        </div>
                    </TabsContent>
                    <TabsContent value="wishlist">WishList</TabsContent>
                </Tabs>
            </div>

        </div>
    )
}

export default Myads