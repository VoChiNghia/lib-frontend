import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import http from "../../config/axios";
import { AxiosResponse } from "axios";
import { initalStateCategory } from "../../type/initStateType";
import { toast } from "react-toastify";
import { DispatchType } from "../store";

const initialState: any = {
  toastRedux: { severity: '', summary: '', detail: ''}
};
const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToastReducer: (state, action) => {
        state.message = action.payload
    }
  },
});

export const {showToastReducer} = toastSlice.actions;
export default toastSlice.reducer;

export const showToast = (severity = 'info', summary = 'Thông báo', message: string) => {
    return (dispatch: DispatchType) => {
        dispatch(showToastReducer({
            severity,
            summary,
            message
        }))
    }
}
