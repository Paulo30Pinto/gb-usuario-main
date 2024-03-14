import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../redux/features/login/loginSlice";

export const useRegisterForm = () => {
  const { form } = useSelector((state) => state.register);

  const dispatch = useDispatch();

  const setForm = (data = {}) => {
    dispatch(loginSlice.actions.setForm(data));
  };

  return { form, setForm };
};
