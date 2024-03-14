import { useDispatch, useSelector } from "react-redux";
import { clientSlice } from "../redux/features/client/clientSlice";

export const useClientForm = () => {
  const { form } = useSelector((state) => state.client);

  const dispatch = useDispatch();

  const setForm = (data = {}) => {
    dispatch(clientSlice.actions.setForm(data));
  };

  return { form, setForm };
};
