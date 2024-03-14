import { useDispatch, useSelector } from "react-redux";
import { driverSlice } from "../redux/features/driver/driverSlice";

export const useDriverForm = () => {
  const { form } = useSelector((state) => state.driver);

  const dispatch = useDispatch();

  const setForm = (data = {}) => {
    dispatch(driverSlice.actions.setForm(data));
  };

  return { form, setForm };
};