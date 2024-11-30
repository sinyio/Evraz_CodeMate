import { InternalAxiosRequestConfig } from "axios";

const addTokenToheader = async (
  config: InternalAxiosRequestConfig
) => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      const newConfig = Object.assign({}, config, {
        headers: {
          Authorization: `Bearer token`,
        },
      });
      return newConfig;
    }
  } catch (error) {
    console.log(error);
  }
  return config;
};

export { addTokenToheader };
