import { useMutation } from "@tanstack/react-query";
import { uploadFileApi } from "./api";
import { showFormStore } from "@/store/showForm";

export const useUploadFile = () => {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const response = await uploadFileApi.uploadFile(file);
      return response;
    },
    onSettled: () => showFormStore.hideForm(),
  });

  const uploadFile = async (file: File) => {
    const response = await mutateAsync({ file });

    if (response) {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Отчет.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  };

  return { uploadFile, isSuccess, isError, isPending };
};
