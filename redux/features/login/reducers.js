export const setForm = (state, action) => {
  state.form = { ...state.form, ...action.payload };
};

export const resetForm = (state, action) => {
  state.form = {};
};

export const setLoggedUser = (state, action) => {
  state.loggedUser = action.payload;
};

export const setRegisterResponse = (state, action) => {
  state.registerResponse = action.payload;
};
