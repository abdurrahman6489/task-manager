import { User } from "@/context/useAuth";
import { jwtDecode, JwtPayload } from "jwt-decode";

type decodeOutput = JwtPayload & { _id: string; name: string; email: string };

export const getAuthStateFromToken = (token: string) => {
  const decodeOutput = jwtDecode(token) as decodeOutput;
  const authState: User = {
    _id: decodeOutput?._id,
    email: decodeOutput?.name,
    name: decodeOutput?.email,
    token,
  };
  return authState;
};
