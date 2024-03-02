import { getUserById } from "@/data/user";
import { useEffect, useState } from "react";
import { useCurrentUser } from "./use-current-user";

export const useUserDetails = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const user = useCurrentUser();

  // console.log("userDetail", userData);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        if (user) {
          //   console.log("hooooooook user", user);

          const response = await fetch(`/api/user/${user.id}`);
          const data = await response.json();
          // console.log("hooooooook", data);

          setUserData(data);
        }
      } catch (error) {
        setError("Failed to fetch user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  return { userData, loading, error };
};
