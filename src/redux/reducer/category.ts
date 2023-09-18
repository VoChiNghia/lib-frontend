import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import http from "../../config/axios";
import { AxiosResponse } from "axios";
import { initalStateCategory } from "../../type/initStateType";
import { toast } from "react-toastify";

const initialState: initalStateCategory = {
  category: [],
  loading: false,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategory.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
  });
    builder.addCase(getAllCategory.fulfilled, (state, action: PayloadAction<any>) => {
        state.category = action?.payload
        state.loading = false;
    });
  },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;

export const getAllCategory = createAsyncThunk("category", async () => {
  try {
    const response: AxiosResponse = await http.get("/api/category");
    return response.data.metadata
  } catch (e) {
    const errors = e as any;
    
  }
});
