import { Delete, DeleteIcon, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

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

type CardAdProps = {
    ad: Product;
};

const CardAd = ({ id, location, price, title, duration, category, image, userId, createdAt }: Product) => {

    return (
        <div className='border border-gray-300 flex items-center justify-between w-full p-1 m-1 rounded-s bg-[#fff] shadow-md '>

            <div className='h-16 w-20 relative'>
                {image &&
                    <Image src={image!} fill={true} alt="image" className='object-cover' />
                }
            </div>
            <div>{price}</div>
            <div className='lg:block hidden'>This is currently active</div>
            <div className='block lg:hidden'>active</div>
            <div className='flex items-center space-x-1'>
                <Edit size={20} />
                <Trash2 size={20} /></div>
        </div>
    );
};

export default CardAd;
