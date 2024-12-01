import { useMutation } from "@tanstack/react-query";
import { uploadFileApi } from "./api";
import { showFormStore } from "@/store/showForm";

export const useUploadFile = () => {
  const { mutateAsync, isError, isSuccess, isPending } = useMutation({
    mutationFn: async ({ file }: { file: File }) => {
      const response = await uploadFileApi.uploadFile(file);
      console.log(response);
      return response;
    },
    onSettled: () => showFormStore.hideForm(),
  });

  const uploadFile = async (file: File) => {
    const response = await mutateAsync({ file });
    if (response?.data) {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Отчет.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  return { uploadFile, isSuccess, isError, isPending };
};
