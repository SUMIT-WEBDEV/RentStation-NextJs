"use client";

import { useState } from "react";

interface LocationProps {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

const useStoreLocation = (
  key: string,
  { address, city, lat, lng }: LocationProps
) => {
  // State to store the location
  const [storedLocation, setStoredLocation] = useState<LocationProps | null>(
    () => {
      // Retrieve from localStorage if available
      const storedLocationJSON =
        typeof window !== "undefined"
          ? window.localStorage.getItem(key)
          : false;
      return storedLocationJSON ? JSON.parse(storedLocationJSON) : null;
    }
  );

  // Function to store the location
  const storeLocation = () => {
    const locationToStore = { address, city, lat, lng };
    setStoredLocation(locationToStore);
    localStorage.setItem(key, JSON.stringify(locationToStore));
    // Here you can perform any additional logic
  };

  // Function to set location from outside the hook
  const setLocation = (location: LocationProps) => {
    setStoredLocation(location);
    localStorage.setItem(key, JSON.stringify(location));
  };

  return { storedLocation, storeLocation, setLocation };
};

export default useStoreLocation;
