// arrayDataSlice.ts

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
    editItem: (state, action: PayloadAction<{ index: number, newName: string }>) => {
      const { index, newName } = action.payload;
      state[index].name = newName;
    },
    deleteItem: (state, action: PayloadAction<{ index: number }>) => {
      state.splice(action.payload.index, 1);
    },
    resetItem: (state) => {
      state.splice(0)
    },
  },
});

export const { addItem, editItem, deleteItem , resetItem } = arrayDataSlice.actions;
export default arrayDataSlice.reducer;
