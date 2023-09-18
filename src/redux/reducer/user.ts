import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import http from "../../config/axios";
import { AxiosResponse } from "axios";
import { BookType } from "../../type";
import { toast } from "react-toastify";

const initialState = {
  user: [],
  totalUsers: 0,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });
    builder.addCase(
        getAllUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = action?.payload.user
        state.totalUsers = action?.payload.totalUsers;
        state.loading = false;
      }
    );
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

export const getAllUser = createAsyncThunk("user", async () => {
  try {
    const respone: AxiosResponse = await http.get("/api/all-user");
    return respone.data.metadata;
  } catch (e) {
    const errors = e as any;
    toast.error(errors?.response?.data?.message)
  }
});

export const createBook = createAsyncThunk(
  "addBook",
  async (data: BookType,) => {
    try {
      const respone: AxiosResponse = await http.post("/api/book", data);
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      toast.error(errors?.response?.data?.message)
    }
  }
);

export const deleteUser = (id: string) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.delete(
        `/api/user/${id}`
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      toast.error(errors?.response?.data?.message)
    }
  };
};


export const updateCoveredBook = (id: string, fromdata: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/book/cover-image/${id}`,
        fromdata
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      toast.error(errors?.response?.data?.message)
    }
  };
};

export const updateUser = (id: string, body: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/user/${id}`,
        body
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      toast.error(errors?.response?.data?.message)
    }
  };
};

export const updatePassword = (body: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/user/password`,
        body
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      toast.error(errors?.response?.data?.message)
    }
  };
};

export const updateCoveredBookByQuery = (fromdata: any, query: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/book/cover-image`,
        fromdata,{
          params: query
        }
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      toast.error(errors?.response?.data?.message)
    }
  };
};