import axios from "axios";
import { apiKey } from "./config";
import { addTokenToheader } from "./commonFeatures";

const fileControllerApi = axios.create({
  baseURL: apiKey,
});

fileControllerApi.interceptors.request.use((config) => {
  console.log(localStorage.getItem("token"));
  const newConfig = Object.assign({}, config, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return newConfig;
});

export const uploadFile = (file: File, headers) => {
  const formData = new FormData();
  formData.append("file", file);
  return fileControllerApi.post("/file/upload", formData, headers);
};
