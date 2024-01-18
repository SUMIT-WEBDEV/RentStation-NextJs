"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const dummySuggestions = [
  "Laptop",
  "Mobile Phone",
  "Headphones",
  "Camera",
  "Smartwatch",
  "Boatwatch",
  "Gaming Console",
];

function Navbar() {
  const locations = ["Delhi", "Mumbai", "Hyderabad"];
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const filteredSuggestions = dummySuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [query]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: "india",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.log("error");
      }
    };

    fetchData();
  }, []);

  console.log("data is", data);

  return (
    <div className="sticky">
      <div className="lg:flex lg:flex-row justify-around items-center bg-black text-white p-4 relative w-screen">
        <div className="flex lg:items-center lg:flex-row flex-col ">
          <div className="mb-2 lg:mr-6 flex justify-between">
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
          <div className="flex items-center">
            <form className="mr-4 lg:block hidden">
              <select className="bg-gray-400 text-white rounded-md px-3 py-2 outline-none h-10">
                <option>--Select City--</option>
                {locations?.map((city, index) => (
                  <option key={index}>{city}</option>
                ))}
              </select>
            </form>

            <div className="flex items-center bg-gray-400 rounded-md relative w-full border border-white focus:border-gray-700 lg:border-none justify-between">
              <input
                className="px-3 py-2 h-10 placeholder:text-white bg-gray-400 rounded-md outline-none "
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Your Product..."
              />
              {query.length > 0 && suggestions.length > 0 && (
                <ul className="absolute z-10 top-full w-full bg-gray-200 border text-black  rounded-md shadow-sm">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="px-4 py-2">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
              <div className="bg-gray-400 w-4 h-4 flex items-center justify-center rounded-md p-4">
                🔍
              </div>
            </div>
          </div>
        </div>

        <div className="justify-between lg:flex space-x-6 font-courier hidden">
          <Link href="/Inbox" className="text-[#fff] ">
            Inbox
          </Link>
          <Link href="/wishlist" className="text-[#fff]">
            WishList
          </Link>
          <Link href="/list-product" className="text-[#fff]">
            Rent+
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
