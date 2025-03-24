import { toastAutoHideDuration } from "@/constants";
import { useAuthContext } from "@/context/useAuth";
import { removeAuthToken } from "@/Utils/AuthToken";
import { AxiosError } from "axios";
import { router } from "expo-router";
import { toast } from "sonner-native";

export const useHandleUnauthorized = () => {
  const { changeLogin, changeAuthState } = useAuthContext();
  const handleUnAuthorized = (error: AxiosError) => {
    if (error?.status !== 401) return;
    changeAuthState(null);
    changeLogin(false);
    removeAuthToken();
    toast.error("Unauthorized user", { duration: toastAutoHideDuration });
    router.push("/");
  };
  return { handleUnAuthorized };
};
