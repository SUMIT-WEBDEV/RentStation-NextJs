"use client";

import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";
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
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useSelectedLayoutSegment, useRouter, usePathname } from "next/navigation";
import { ADDRESS_API, SEARCH_LOCATION_API } from "@/lib/constant";
import { Search } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import useSidebarStore from "@/store/toggle-sidebar";
import useStoreLocation from "@/store/user-location";
import useLocationSidebarStore from "@/store/toggle-location-sidebar";
import { cn } from "@/lib/utils";
import useClient from "@/hooks/use-client";

export const navItems = [
  {
    name: "Inbox",
    slug: "chat",
  },
  {
    name: "WishList",
    slug: "my-ads",
  },
  {
    name: "Rent+",
    slug: "sell",
  },
];


function Navbar() {
  const router = useRouter();
  const pathName = usePathname()
  const selectedLayout = useSelectedLayoutSegment()
  const CORSPROXY = process.env.NEXT_PUBLIC_CORSPROXY

  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [locations, setLocations] = useState([])

  const { setTheme } = useTheme();
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  const { isLocationSidebarOpen, toggleLocationSidebar } = useLocationSidebarStore();

  const client = useClient()

  // useEffect(() => {
  //   const filteredSuggestions = dummySuggestions.filter((suggestion) =>
  //     suggestion.toLowerCase().includes(query.toLowerCase())
  //   );

  //   setSuggestions(filteredSuggestions);
  // }, [query]);

  const user = useCurrentUser()
  const userImage = user?.image

  const { storedLocation, storeLocation, setLocation } = useStoreLocation();

  const [SearchText, setSearchText] = useState<string>(storedLocation?.address || "")
  const [showSuggestion, setShowSuggestion] = useState(false)


  const handleSearchLocation = async (e: any) => {
    try {
      setSearchText(e.target.value);
      setShowSuggestion(true)
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
        // router.replace(pathName)
        router.refresh()
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
    if (!storedLocation || !storedLocation.city) {
      router.push(`/items/?item=${query}`);
    } else {

      // console.log("push the route")
      // If not, construct the dynamic location URL with the query
      const dynamicLocation = storedLocation.city.toLowerCase().replace(/\s+/g, '-');

      router.push(`/${dynamicLocation}/search/?item=${query}`);
      router.refresh()
    }

  };



  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };


  const handleFocus = () => {
    setSearchText('')
  }

  return (
    <div className="fixed top-0 left-0 z-20">
      <div className="lg:flex lg:flex-row justify-around items-center bg-black text-white p-4 w-screen">
        <div className="flex lg:items-center lg:flex-row flex-col">

          <div className="lg:mb-0 mb-2 lg:mr-6 flex justify-between ">
            <Link
              href="/"
              className="text-xl text-yellow-500 font-extrabold tracking-normal lg:tracking-wider"
            >
              RentStation
            </Link>


            <div className="lg:hidden text-gray-200 flex items-center  gap-1 justify-end"
              onClick={toggleLocationSidebar}

            >
              <LocationOnIcon className=" text-lg" />
              {storedLocation && client &&
                <p className="text-xs truncate w-24">
                  {
                    storedLocation?.address
                  }
                </p>
              }
            </div>
          </div>

          {/* Search Form */}
          <div className="flex items-center lg:space-x-2">


            <div className=" lg:flex items-center hidden relative w-60 min-w-auto  rounded-md focus:border-gray-700 lg:border-none justify-between bg-slate-50"
            >

              <input
                className="px-3 text-xs py-2 h-9 outline-none rounded-md bg-transparent text-black w-5/6"
                type="text"
                onChange={(e) => handleSearchLocation(e)}
                value={SearchText}
                onFocus={handleFocus}
                onBlur={handleCloseLocationBar}
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
                onKeyPress={handleKeyPress}
              />

              <Search className="absolute right-3 text-gray-500"
                onClick={handleSearch}
              />

            </div>
          </div>


        </div>

        <div className="justify-between lg:flex space-x-6 font-courier hidden items-center">

          {
            navItems.map(({ name, slug }) => (
              <Link
                href={`/${slug}`}
                key={slug}
                className={cn(
                  "text-sm font-medium text-[#fff] transition-colors ease-out group-hover:text-black",
                  {
                    "text-yellow-500": selectedLayout === slug,
                  },
                )}
              >
                {name}
              </Link>
            ))
          }
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

export default Navbar;

