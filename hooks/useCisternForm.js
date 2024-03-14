import { useDispatch, useSelector } from "react-redux";
import { cisternSlice } from "../redux/features/cistern/cisternSlicer";

export const useTruckForm = () => {
  const { form } = useSelector((state) => state.cistern);

  const dispatch = useDispatch();

  const setForm = (data = {}) => {
    dispatch(cisternSlice.actions.setForm(data));
  };

  return { form, setForm };
};
