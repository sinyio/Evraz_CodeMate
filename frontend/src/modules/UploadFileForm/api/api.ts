import { uploadFile } from "@api/fileControllerApi";

export const uploadFileApi = {
  uploadFile(file: File, headers) {
    return uploadFile(file, headers);
  },
};
