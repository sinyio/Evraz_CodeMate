import axios from "axios";

const fileControllerApi = axios.create({
  baseURL: "/api",
});

export const uploadFile = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return fileControllerApi.post("/upload/", formData);
};
