import { uploadFile } from "@api/fileControllerApi";

export const uploadFileApi = {
  uploadFile(file: File) {
    return uploadFile(file);
  },
};
