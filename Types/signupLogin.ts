import { z } from "zod";
import { errorDataType, successDataType } from "@/Types/commonTypes";

export const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is required"),
  password: z.string().min(5, "Minimum 5 characters required for password"),
});
export const loginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(5, "Minimum 5 characters required for password"),
});
export type signupType = z.infer<typeof signupSchema>;
export type loginType = z.infer<typeof loginSchema>;

export const initialSignupState: signupType = {
  name: "",
  email: "",
  password: "",
};
export const initialLoginState: loginType = {
  email: "",
  password: "",
};

export type signupRequest = signupType;

export type signupResponse = successDataType | errorDataType;

export type loginRequest = loginType;

export type loginResponse =
  | (successDataType & { token: string })
  | errorDataType;
