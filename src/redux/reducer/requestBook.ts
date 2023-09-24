import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import http from "../../config/axios";
import { toast } from "react-toastify";


const initialState: any = {
    login: '',
    loading: false,
    requestBook: null
  };
  const requestBookSlice = createSlice({
    name: "requestBook",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder.addCase(getAllRequest.pending, (state, action: PayloadAction<any>) => {
        state.loading = true;
    });
      builder.addCase(getAllRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.requestBook = action.payload
        state.loading = false;
    });
    },
  });
  
  export const {} = requestBookSlice.actions;
  export default requestBookSlice.reducer;
  
  export const AddNewRequest = createAsyncThunk("request/book", async (data: any) => {
    try {
      const response: any = await http.post("/api/request-book", data);
      toast.success(response?.status === 200 ? "Đã thêm mới sách" : '')
      return response.data.metadata
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  });

  export const getAllRequest = createAsyncThunk("request/book", async () => {
    try {
      const response: any = await http.get("/api/request-book");
      return response.data
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  });

 export const deleteRequestBook = (id: any) => {
    return async () => {
      try {
        const response: any = await http.delete(`/api/request-book/${id}`,);
        toast.success(response?.status === 200 ? "Đã Xóa" : '')
        return response;
      } catch (e) {
        const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
      }

    }
  }