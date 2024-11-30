import axios from "axios";
import { apiKey } from "../config";
import { ILoginUser } from "./types";

const authController = axios.create({
  baseURL: apiKey,
});

export const login = async (data: ILoginUser) => {
  const token = await authController.post("/auth/auth/login", data);
  return token;
};
