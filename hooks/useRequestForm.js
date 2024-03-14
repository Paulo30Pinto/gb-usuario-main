import { useDispatch, useSelector } from "react-redux";
import { requestSlice } from "../redux/features/request/requestSlice";

export const useRequestForm = () => {
  const { form } = useSelector((state) => state.request);

  const dispatch = useDispatch();

  const setForm = (data = {}) => {
    dispatch(requestSlice.actions.setForm(data));
  };

  return { form, setForm };
};
