import { signupRequest, signupResponse } from "@/Types/signupLogin";
import { SIGN_UP_URL } from "@/URLS/signup";
import axios from "axios";

export const signup = (request: signupRequest) => {
  const url = SIGN_UP_URL;
  return axios.post<signupResponse>(url, request);
};
