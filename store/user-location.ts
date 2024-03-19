"use client";

import { create } from "zustand";

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
const initialStoredLocation = ISSERVER
  ? null
  : JSON.parse(localStorage.getItem("userLocation") || "null");

const useStoreLocation = create<LocationStore>((set, get) => ({
  storedLocation: initialStoredLocation,
  storeLocation: () => {
    const { storedLocation } = get();
    if (storedLocation) {
      localStorage.setItem("userLocation", JSON.stringify(storedLocation));
    }
  },
  setLocation: (location: LocationProps) => {
    set({ storedLocation: location });
    localStorage.setItem("userLocation", JSON.stringify(location));
  },
}));

export default useStoreLocation;
