import { useMutation } from "@tanstack/react-query";
import { uploadFileApi } from "./api";
import { showFormStore } from "@/store/showForm";

export const useUploadFile = () => {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const response = await uploadFileApi.uploadFile(file);
      console.log(response.data);
    },
    onSettled: () => showFormStore.hideForm(),
  });

  const uploadFile = (file: File) => {
    mutateAsync({ file });
  };

  return { uploadFile, isSuccess, isError, isPending };
};
