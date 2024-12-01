import axios from "axios";
import { apiKey } from "./config";

const fileControllerApi = axios.create({
  baseURL: apiKey,
});

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return fileControllerApi.post("/file/upload", formData);
};
