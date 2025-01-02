import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  companyName: '',
  regNo: '',
  contactMobileNo: '',
  contactEmail: '',
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompanyDetails: (state, action) => {
      const { companyName, regNo, contactMobileNo, contactEmail } = action.payload;
      state.companyName = companyName;
      state.regNo = regNo;
      state.contactMobileNo = contactMobileNo;
      state.contactEmail = contactEmail;
    },
    resetCompanyDetails: (state) => {
      return initialState;
    },
  },
});

export const { setCompanyDetails, resetCompanyDetails } = companySlice.actions;
export default companySlice.reducer;
