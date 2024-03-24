import { create } from "zustand";

interface SidebarState {
  isLocationSidebarOpen: boolean;
  toggleLocationSidebar: () => void;
}

const useLocationSidebarStore = create<SidebarState>((set) => ({
  isLocationSidebarOpen: false,
  toggleLocationSidebar: () =>
    set((state) => ({ isLocationSidebarOpen: !state.isLocationSidebarOpen })),
}));

export default useLocationSidebarStore;
