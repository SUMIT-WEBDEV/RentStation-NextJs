import Cookies from "js-cookie";
import { create } from "zustand";
// import { cookies } from "next/headers";

interface LocationProps {
  address: string;
  city: string;
  lat: number;
  lng: number;
}

interface LocationStore {
  storedLocation: LocationProps | null;
  storeLocation: () => void;
  setLocation: (location: LocationProps) => void;
}

const ISSERVER = typeof window === "undefined";

// Function to parse the stored location from the cookie
const getStoredLocationFromCookie = (): LocationProps | null => {
  const storedLocation = Cookies.get("userLocation");
  return storedLocation ? JSON.parse(storedLocation) : null;
};

// Initial stored location
const initialStoredLocation = ISSERVER ? null : getStoredLocationFromCookie();

const useStoreLocation = create<LocationStore>((set, get) => ({
  storedLocation: initialStoredLocation,
  storeLocation: () => {
    const { storedLocation } = get();
    if (storedLocation) {
      Cookies.set("userLocation", JSON.stringify(storedLocation), {
        expires: 365,
      });
    }
  },
  setLocation: (location: LocationProps) => {
    set({ storedLocation: location });
    Cookies.set("userLocation", JSON.stringify(location), { expires: 365 });
  },
}));

export default useStoreLocation;
