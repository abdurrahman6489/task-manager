import { loginRequest, loginResponse } from "@/Types/signupLogin";
import { LOGIN_URL } from "@/URLS/login";
import axios from "axios";

export const login = (request: loginRequest) => {
  const url = LOGIN_URL;
  return axios.post<loginResponse>(url, request);
};
