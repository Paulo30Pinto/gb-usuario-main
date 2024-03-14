import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../redux/features/login/loginSlice";

export const useLoginForm = () => {
  const { form } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const setForm = (data = {}) => {
    dispatch(loginSlice.actions.setForm(data));
  };

  const resetForm = () => {
    dispatch(loginSlice.actions.resetForm());
  };
  console.log({form, resetForm})
  return { form, setForm };
};
