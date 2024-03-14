import { axiosInstance } from "../../../api/axios";

export const sendCode = async (data={}) => {
  console.log("DATA ", data);

  try {
    const response = await axiosInstance.post("/user/sendToken", data);

    return response;
  } catch (error) {
    console.log("[debug]: erro ao enviar codigo de verificação");

    return error?.response;
  }
};