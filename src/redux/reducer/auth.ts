import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import http, { ID, TOKEN, USER } from "../../config/axios";
import { AxiosResponse } from "axios";
import { history } from "../../component/Layout";
import { toast } from "react-toastify";

const initialState: any = {
  login: '',
  loading: false,
  role: '',
  user: null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearLogin: (state) => {
      state.login = ''
      return
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
  });
    builder.addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        if(action.payload){
          const token = action?.payload?.token
        const user = action?.payload?.user
       localStorage.setItem(TOKEN,JSON.stringify(token?.accessToken))
        localStorage.setItem(USER,JSON.stringify(user))
        localStorage.setItem(ID,JSON.stringify(user?._id))
        state.user = action.payload.user
        state.login = user
        state.loading = false;
        console.log(123)

        if(user?.role === 'user') {
          history.push('/')
        }else{
          history.push('/admin')
        }
        }
        state.loading = false;
    });
  },
});

export const {clearLogin} = authSlice.actions;
export default authSlice.reducer;

export const login = createAsyncThunk("auth/login", async (data: any) => {
  try {
    const respone: any = await http.post("/api/auth/signin", data);
    return respone.data.metadata
  } catch (e) {
    const errors = e as any;
    toast.error(errors?.response?.data?.message)
  }
});

export const register = createAsyncThunk("auth/signup", async (data: any) => {
  try {
    const respone: any = await http.post("/api/auth/signup", data);
    if(respone.status === 201){
      history.push('/confirmation')
    }
    return respone.data.metadata
  } catch (e) {
    const errors = e as any;
    toast.error(errors?.response?.data?.message)
  }
});

export const logout = createAsyncThunk("auth/logout", async (id: string) => {
  try {
    const respone:AxiosResponse = await http.delete(`/api/auth/logout/${id}`);
    return respone.data.message
  } catch (e) {
    const errors = e as any;
    toast.error(errors?.response?.data?.message)
  }
});


