import { useMutation } from "@tanstack/react-query";
import { uploadFileApi } from "./api";
import { showFormStore } from "@/store/showForm";
import { useState } from "react";

export const useUploadFile = () => {
  const [progress, setProgress] = useState(0);

  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const response = await uploadFileApi.uploadFile(file, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      console.log(response.data);
    },
    onSuccess: () => showFormStore.hideForm(),
  });

  const uploadFile = (file: File) => {
    setProgress(0);
    mutate({ file });
  };

  return { uploadFile, isSuccess, isError, isPending, progress };
};
