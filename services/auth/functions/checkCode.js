import { axiosInstance } from "../../../api/axios";

export const checkCode = async (data={}) => {
  try {
    const response = await axiosInstance.post("/user/checkToken", data);

    return response;
  } catch (error) {
    console.log("[debug]: erro ao enviar codigo de verificação");

    return error?.response;
  }
};