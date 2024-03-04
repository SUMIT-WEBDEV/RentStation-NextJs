// import React, { createContext, useContext, useState, FC, Dispatch, SetStateAction } from 'react';

// // Define the type for user location
// interface UserLocation {
//     city: string;
//     lat: number;
//     lng: number;
//     address: string;
// }

// // Define the context type
// interface LocationContextType {
//     userLocation: UserLocation | null;
//     setLocation: Dispatch<SetStateAction<UserLocation | null>>;
// }

// // Create the context
// const LocationContext = createContext<LocationContextType | undefined>(undefined);

// // Custom hook to use the location context
// export const useLocation = (): LocationContextType => {
//     const context = useContext(LocationContext);
//     if (!context) {
//         throw new Error('useLocation must be used within a LocationProvider');
//     }
//     return context;
// };

// // Location provider component
// export const LocationProvider: FC = ({ children }) => {
//     const [userLocation, setUserLocation] = useState<UserLocation | null>(() => {
//         const storedLocation = localStorage.getItem('userLocation');
//         return storedLocation ? JSON.parse(storedLocation) : null;
//     });

//     const setLocation: Dispatch<SetStateAction<UserLocation | null>> = (newLocation) => {
//         setUserLocation(newLocation);
//         if (newLocation) {
//             localStorage.setItem('userLocation', JSON.stringify(newLocation));
//         } else {
//             localStorage.removeItem('userLocation');
//         }
//     };

//     return (
//         <LocationContext.Provider value={{ userLocation, setLocation }}>
//             {children}
//         </LocationContext.Provider>
//     );
// };
