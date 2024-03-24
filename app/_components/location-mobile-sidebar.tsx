"use client"

import React, { useEffect, useState } from 'react'
import useSidebarStore from "@/store/toggle-sidebar";
import { ShieldCloseIcon } from 'lucide-react';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { ADDRESS_API, SEARCH_LOCATION_API } from "@/lib/constant";
import useStoreLocation from '@/store/user-location';
import useLocationSidebarStore from '@/store/toggle-location-sidebar';


const LocationSidebar = () => {

    const [SearchText, setSearchText] = useState<string>("")
    const [locations, setLocations] = useState([])
    const { setLocation } = useStoreLocation();


    const { isLocationSidebarOpen, toggleLocationSidebar } = useLocationSidebarStore();



    const CORSPROXY = process.env.NEXT_PUBLIC_CORSPROXY

    const handleSearchLocation = async (e: any) => {
        try {
            setSearchText(e.target.value);
            if (SearchText.length >= 3) {
                const response = await fetch(CORSPROXY + SEARCH_LOCATION_API + SearchText)
                if (!response.ok) {
                    // const err = response.status;
                    console.log("err")
                    // throw new err
                }
                else {
                    const res = await response.json();
                    setLocations(res?.data)
                    // router.replace("/")
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
                setLocation({
                    city: data[0]?.address_components[0]?.short_name,
                    lat: data[0]?.geometry?.location?.lat,
                    lng: data[0]?.geometry?.location?.lng,
                    address: data[0]?.formatted_address
                })
                setSearchText(data[0]?.formatted_address)
                toggleLocationSidebar()
                setSearchText("")
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={`fixed top-0 right-0 h-full bg-black text-white p-4 lg:w-3/12 w-full shadow-2xl transform translate-x-0 transition-transform duration-300 ease-in-out z-50 ${isLocationSidebarOpen ? "-translate-x-0" : "translate-x-full"}`}>

            <div className="flex justify-start">
                <button onClick={toggleLocationSidebar} className="text-white cursor-pointer">
                    <ShieldCloseIcon className="text-3xl" />
                </button>
            </div>
            <br />

            <div className='relative'>
                <div className='relative'>
                    <input type="text" className='h-[50px] text-base bg-transparent px-5 overflow-hidden border w-full font-ProximaNovaMed' placeholder='Search for area, street name..' onChange={(e) => handleSearchLocation(e)} value={SearchText} />
                    {
                        SearchText && <button type='button' onClick={() => setSearchText("")} className='absolute right-4 text-sm top-1/2 -translate-y-1/2 text-color-2 font-ProximaNovaMed'>
                            Cancel
                        </button>
                    }
                </div>
                <ul className="dropdown absolute left-0 right-0">
                    {
                        SearchText && locations?.map((item: any) => (
                            <li onClick={() => handleUserLocation(item?.place_id)} key={item?.place_id} className='cursor-pointer relative'>
                                <div className='md:p-6 py-4 flex location'>
                                    <div className='text-lg text-color-6 w-8 text-left pt-1 pr-4'>
                                        <LocationOnIcon />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h3 className='text-base font-ProximaNovaMed text-color-1'>{item?.structured_formatting?.main_text}</h3>
                                        <h4 className='text-[13px] text-color-5 leading-5 font-ProximaNovaThin'>{item?.structured_formatting?.secondary_text}</h4>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>

        </div>
    )
}

export default LocationSidebar
