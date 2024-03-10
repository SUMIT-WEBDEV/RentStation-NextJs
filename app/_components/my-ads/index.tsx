import React from 'react'
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
        <div className='w-screen flex justify-center items-center py-12'>

            <div>
                <div className='py-2 lg:px-2 text-3xl font-medium'>
                    My Ads
                </div>

                <div className="w-full flex flex-col justify-center items-center">
                    {
                        myAds.map((ad, index) => (
                            <CardAd key={ad.id} {...ad} />
                        ))
                    }
                </div>

            </div>

        </div>

    )
}

export default Myads