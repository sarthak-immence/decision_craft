// import { createSlice } from '@reduxjs/toolkit';
// import {  getRoles } from '../thunk/get';

// const initialState = {
//   roles: {
//     errorMessage: '',
//     isLoading: false,
//     isSuccess: false,
//     isError: false,
//     info: [],
//     // array_data : [],
// },
// };

// interface GetInterface {
    
//     roles: {
//         isLoading: boolean;
//         isSuccess: boolean;
//         isError: boolean;
//         errorMessage: string;
//         info: any;
//         // name: string;
//   };
// }

// export const masterSlices = createSlice({
//   name: 'master',
//   initialState,
//   reducers: <any>[],
//   extraReducers: {
//     // get master platform type
 

//     // get master roles
//     [`${getRoles.pending}`]: (state: GetInterface) => {
//       state.roles.isLoading = true;
//       state.roles.isSuccess = false;
//       state.roles.isError = false;
//       state.roles.errorMessage = '';
//     },
//     [`${getRoles.fulfilled}`]: (state: GetInterface, action: any) => {
//       state.roles.info = action?.payload?.data?.data?.roles;
//       state.roles.isLoading = false;
//       state.roles.isSuccess = true;
//       state.roles.isError = false;
//       state.roles.errorMessage = '';
//     },
//     [`${getRoles.rejected}`]: (state: GetInterface, action: any) => {
//       state.roles.isLoading = false;
//       state.roles.isSuccess = false;
//       state.roles.isError = true;
//       state.roles.errorMessage = action?.payload?.data
//         ? action?.payload?.data?.message
//         : action?.payload?.message;
//     },
//   },
// });

// export default masterSlices.reducer;
// src/redux/slices/arrayDataSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface array_data {
  name: string;
}

const initialState: array_data[] = [];

const arrayDataSlice = createSlice({
  name: 'arrayData',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<string>) => {
      state.push({ name: action.payload });
    },
    editItem: (state, action: PayloadAction<{ index: number }>) => {
      state[action.payload.index] = { name: 'edit' };
    },
    deleteItem: (state, action: PayloadAction<{ index: number }>) => {
      state.splice(action.payload.index, 1);
    },
  },
});

export const { addItem, editItem, deleteItem } = arrayDataSlice.actions;
export default arrayDataSlice.reducer;

