"use client";

import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
import profile from "../assets/profileEmail.jpg";
import Sidebar from "./account-sidebar";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import nullProfile from "@/app/assets/nullProfile.png"

const dummySuggestions = [
  "Laptop",
  "Mobile Phone",
  "Headphones",
  "Camera",
  "Smartwatch",
  "Boatwatch",
  "Gaming Console",
];
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useRouter } from "next/navigation";
import { ADDRESS_API, CORSPROXY, SEARCH_LOCATION_API } from "@/lib/constant";
import { Search } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import useSidebarStore from "@/store/toggle-sidebar";
import useStoreLocation from "@/hooks/use-location";

function Navbar() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [accountSidebar, setAccountSidebar] = useState(false);
  const { setTheme } = useTheme();

  const [locations, setLocations] = useState([])

  const { isSidebarOpen, toggleSidebar } = useSidebarStore();

  const router = useRouter();

  useEffect(() => {
    const filteredSuggestions = dummySuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [query]);

  // const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const user = useCurrentUser()
  const userImage = user?.image

  const { storedLocation, setLocation } = useStoreLocation("userLocation", {
    address: "",
    city: "",
    lat: 0,
    lng: 0,
  });

  const [SearchText, setSearchText] = useState<string>(storedLocation?.address || "")
  const [showSuggestion, setShowSuggestion] = useState(false)


  const handleSearchLocation = async (e: any) => {
    try {
      setSearchText(e.target.value);
      setShowSuggestion(true)
      if (SearchText.length >= 3) {
        const response = await fetch(CORSPROXY + encodeURIComponent(SEARCH_LOCATION_API) + SearchText)
        if (!response.ok) {
          // const err = response.status;
          // throw new err
          console.log("err")
        }
        else {
          const res = await response.json();
          console.log("location", res?.data)
          setLocations(res?.data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleUserLocation = async (placeid: string) => {
    try {
      const response = await fetch(CORSPROXY + encodeURIComponent(ADDRESS_API) + placeid)
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
        setShowSuggestion(false)
      }
    } catch (err) {
      console.log(err)
    }
  }


  const handleCloseLocationBar = () => {

    setShowSuggestion(false)

    setSearchText(storedLocation?.address || '')
    // setLocations([])
  }


  const handleSearch = () => {
    router.push(`/location/${query}`);
  };


  const handleFocus = () => {
    console.log("focusedddd")
    setSearchText('')
  }

  return (
    <div className="sticky">
      <div className="lg:flex lg:flex-row justify-around items-center bg-black text-white p-4 w-screen">
        <div className="flex lg:items-center lg:flex-row flex-col">

          <div className="lg:mb-0 mb-2 lg:mr-6 flex justify-between ">
            <Link
              href="/"
              className="text-xl text-yellow-500 font-extrabold tracking-normal lg:tracking-wider"
            >
              RentStation
            </Link>
            <div className="lg:hidden">
              <LocationOnIcon className="text-gray-200" />
            </div>
          </div>

          {/* Search Form */}
          <div className="flex items-center lg:space-x-2">


            {/* <div className="lg:block hidden relative w-52 bg-slate-50 border rounded-md"> */}
            <div className=" lg:flex items-center hidden relative w-60 min-w-auto  rounded-md focus:border-gray-700 lg:border-none justify-between bg-slate-50"
            // onBlur={handleCloseLocationBar}
            >

              <input
                className="px-3 text-xs py-2 h-9 outline-none rounded-md bg-transparent text-black w-5/6"
                type="text"
                onChange={(e) => handleSearchLocation(e)}
                // value={storedLocation?.address}
                value={SearchText}
                onFocus={handleFocus}
                onBlur={handleCloseLocationBar}
                // onMouseDown={(e) => e.preventDefault()}
                placeholder="Select Location"
              />

              <LocationOnIcon className="text-gray-500 absolute right-3" />

              {showSuggestion && locations.length > 0 && (
                <ul className="absolute text-xs top-full w-full bg-slate-50 text-black rounded-md mt-2 shadow-lg border-gray-300 border" id="badButton"
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

            <div className="flex items-center relative w-full lg:w-80 min-w-auto border rounded-md border-white focus:border-gray-700 lg:border-none justify-between bg-slate-50">
              <input
                className="px-3 py-2 h-9 outline-none rounded-md bg-transparent text-black text-sm"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Your Product..."
              />

              <Search className="absolute right-3 text-gray-500"
                onClick={handleSearch}
              />

              {query.length > 0 && suggestions.length > 0 && (
                <ul className="absolute z-50 top-full w-full bg-slate-50 border-gray-300 border text-black rounded-md py-2 mt-2 shadow-lg">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="px-4 border-gray-400 text-sm">
                      <p className="pt-2">
                        {suggestion}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

            </div>

          </div>
        </div>

        <div className="justify-between lg:flex space-x-6 font-courier hidden items-center">
          <Link href="/chat" className="text-[#fff] ">
            Inbox
          </Link>
          <Link href="/wishlist" className="text-[#fff]">
            WishList
          </Link>
          <Link href="/sell" className="text-[#fff]">
            Rent+
          </Link>
          {/* <Link href="/list-product" className="text-[#fff]"> */}
          {/* <Image
            src={profile}
            alt=""
            width="40"
            height="40"
            className="rounded-full cursor-pointer"
            onClick={() => setAccountSidebar(true)}
          /> */}

          <div
            className="cursor-pointer"
            // onClick={() => setAccountSidebar(true)}
            onClick={toggleSidebar}
          >
            {
              userImage ?
                <Image src={userImage} alt="" height={40} width={40} className="rounded-full" />
                :
                <Image src={nullProfile} alt="" height={40} width={40} className="rounded-full" />
            }
          </div>


          {/* </Link> */}
          <div className="hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <WbSunnyIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <DarkModeIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* {accountSidebar && <Sidebar onClose={handleCloseSidebar} />} */}
      </div>
    </div >
  );
}

export default memo(Navbar);


// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await fetch(
//         "https://countriesnow.space/api/v0.1/countries/cities",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             country: "india",
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result = await response.json();
//       setData(result);
//     } catch (error) {
//       console.log("error");
//     }
//   };

//   fetchData();
// }, []);

// console.log("data is", data);



{/* <ul className="absolute top-full w-full bg-slate-50 border text-black rounded-md shadow-sm">
{
  SearchText && Locations?.map((item: any) => (
    <li onClick={() => handleUserLocation(item?.place_id)} key={item?.place_id} className='cursor-pointer relative'>
    <li onClick={() => { }} className='cursor-pointer relative'>
      <div className='md:p-6 py-4 flex location'>
        <div className='text-lg text-color-6 w-8 text-left pt-1 pr-4'>
          <GoLocation />
          📍
        </div>
        <div className='flex flex-col'>
          <h3 className='text-base font-ProximaNovaMed text-color-1'>{item?.structured_formatting?.main_text}</h3>
          <h4 className='text-[13px] text-color-5 leading-5 font-ProximaNovaThin'>{item?.structured_formatting?.secondary_text}</h4>
        </div>
      </div>
    </li>
  ))
}
</ul> */}



// {
//   query.length > 0 && suggestions.length > 0 && (
//     <ul className="absolute top-full w-full bg-slate-50 border text-black rounded-md shadow-sm">
//       {suggestions.map((suggestion, index) => (
//         <li key={index} className="px-4 py-2">
//           {suggestion}
//         </li>
//       ))}
//     </ul>
//   )
// }