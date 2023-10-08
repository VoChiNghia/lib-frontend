import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import http from "../../config/axios";
import { AxiosResponse } from "axios";
import { BookType } from "../../type";
import { toast } from "react-toastify";
import { DispatchType } from "../store";
import { history } from "../../component/Layout";

const initialState: any = {
  book: [],
  totalBooks: 0,
  loading: false,
  bookDetail: null,
  borrow: null,
  getListBorrowBook: null,
  allBlog: null,
  blogDetail: null,
  allFile: null,
  allPenalty: null,
  fileDetail: null,
  listFavorite: null,
  listFavoriteByUser: null,
  statisticalBorrow:null,
  loading2: false
};
const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    getBookReducer: (state, action) => {
        state.bookDetail = action.payload
        state.loading = false
    },  
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setLoading2: (state, action) => {
      state.loading2 = action.payload
    },
    borrowBookReducer: (state, action) => {
        state.borrow = action.payload
    },
    getListBorrowBookReducer: (state, action) => {
      state.getListBorrowBook = action.payload
  },
  getAllBlogReducer: (state, action) => {
    state.allBlog = action.payload
},
getAllFileReducer: (state, action) => {
  state.allFile = action.payload
},
getBlogDetailReducer: (state, action) => {
  state.blogDetail = action.payload
},
getAllPenaltyReducer: (state, action) => {
  state.allPenalty = action.payload
},
getFileByIdReducer: (state, action) => {
  state.fileDetail = action.payload
},getListFavoriteReducer: (state, action) => {
  state.listFavorite = action.payload
},
getListFavoriteByUserReducer: (state, action) => {
  state.listFavoriteByUser = action.payload
},
getAllBorrowByMonthReducer: (state, action) => {
  state.statisticalBorrow = action.payload
}
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBook.pending, (state, action: PayloadAction<any>) => {
      state.loading = true;
    });
    builder.addCase(
      getAllBook.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.book = action?.payload?.allBook;
        state.totalBooks = action?.payload?.totalDocument;
        state.loading = false;
      }
    );
  },
});

export const {getBookReducer,getListFavoriteByUserReducer,setLoading2,getAllBorrowByMonthReducer,getListFavoriteReducer,setLoading,getListBorrowBookReducer,borrowBookReducer,getAllBlogReducer,getBlogDetailReducer,getAllFileReducer,getAllPenaltyReducer,getFileByIdReducer} = bookSlice.actions;
export default bookSlice.reducer;

export const getAllBook = createAsyncThunk("book", async (query?: any) => {
  try {
    const respone: AxiosResponse = await http.get("/api/book/all",{params: query});
  
    return respone.data.metadata;
  } catch (e) {
    const errors = e as any;
    if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    if(errors?.response?.data?.httpCode !== '200')
    {
      history.push('/login-form')
      localStorage.clear()
      window.location.reload()
    }
   
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
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  }
);

export const deleteBook = (id: string) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.delete(
        `/api/book/${id}`
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const deleteBlog = (id: string) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.delete(
        `/api/blog/${id}`
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const deleteFile = (id: string) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.delete(
        `/api/file/${id}`
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
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
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const updateCoveredFile = (id: string, fromdata: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/file/cover-image/${id}`,
        fromdata
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const updateFileBookPdf = (id: string, fromdata: any) => {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(setLoading(true))
      const respone: AxiosResponse = await http.put(
        `/api/book/file-pdf/${id}`,
        fromdata
      );
      dispatch(setLoading(true))
      toast.success(respone.data.message);

      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};


export const updateBook = (id: string, body: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/book/${id}`,
        body
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
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
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const getBookById = (id: string) => {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(setLoading(true))
      const respone: AxiosResponse = await http.get(
        `/api/book/${id}`
      );
       dispatch(getBookReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const borrowBook = (data:any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.post(
        '/api/borrow',data
      );
      toast.success(respone.data.message);
       dispatch(borrowBookReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const getAllBorrowBook = () => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        '/api/borrow'
      );
       dispatch(getListBorrowBookReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const getAllBlog = () => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        '/api/blog'
      );
       dispatch(getAllBlogReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const getBlogDetail = (id:any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        `/api/blog/${id}`
      );
       dispatch(getBlogDetailReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};

export const deleteBookBorrow = (id: string) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.delete(
        `/api/borrow/${id}`
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
      if(errors?.response?.data?.message !== 'Invalid client id'){
        toast.error(errors?.response?.data?.message)
      }
    }
  };
};


export const createBlog = createAsyncThunk(
  "addBook",
  async (data: any,) => {
    try {
      const respone: AxiosResponse = await http.post("/api/blog", data);
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
     
    }
  }
);

export const updateCoveredBlogByQuery = (fromdata: any, query: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/blog/cover-image`,
        fromdata,{
          params: query
        }
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
     
    }
  };
};


export const updateStatusBorrowBook = (data: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/borrow/update-status`,data
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const createFile = createAsyncThunk(
  "addBook",
  async (data: any,) => {
    try {
      const respone: AxiosResponse = await http.post("/api/file", data);
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
     
    }
  }
);

export const updateFile = (fromdata: any, query: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.put(
        `/api/file/file-pdf`,
        fromdata,{
          params: query,
          onUploadProgress: data => {
            console.log(data.loaded)
            console.log(data.total)
          },
        }
      );
      toast.success(respone.data.message);
      return respone.data.metadata;
    } catch (e) {
      const errors = e as any;
     
    }
  };
};


export const getAllFile = () => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        '/api/file'
      );
       dispatch(getAllFileReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const getFileById = (id: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        `/api/file/${id}`
      );
       dispatch(getFileByIdReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const getAllPenalty = () => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        '/api/penalty'
      );
       dispatch(getAllPenaltyReducer(respone.data.metadata))
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const getAllListFavorite = () => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        '/api/favorite'
      );

       dispatch(getListFavoriteReducer(respone.data))
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const getAllListFavoriteByUser = (id: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        `/api/favorite-user/${id}`
      );
      console.log(respone.data);
       dispatch(getListFavoriteByUserReducer(respone.data))
       
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const deleteItemFromListBooks = (data: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.post(
        `/api/favorite/delete-item-list-book`,data
      );
      toast.success(respone.status === 200 ? "Đã xóa" : '');
       
    } catch (e) {
      const errors = e as any;
     
    }
  };
};


export const deleteFavorite = (id: any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        `/api/favorite/${id}`
      );
      toast.success(respone.status === 200 ? "Đã xóa" : '');
       
    } catch (e) {
      const errors = e as any;
     
    }
  };
};


export const createPenalty = (data: any) => {
  return async () => {
    try {
      const respone: AxiosResponse = await http.post(
        '/api/penalty', data
      );
      toast.success(respone.data.message);
      return respone
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const createFavoriteBook = (data:any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.post(
        '/api/favorite',data
      );
      toast.success(respone.data.metadata.message);  
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const createCatetogy = (data:any) => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.post(
        '/api/category',data
      );
      toast.success(respone.data.message);  
    } catch (e) {
      const errors = e as any;
     
    }
  };
};

export const getAllBookBorrowByMonth = () => {
  return async (dispatch: DispatchType) => {
    try {
      const respone: AxiosResponse = await http.get(
        '/api/borrow-statistical'
      );

       dispatch(getAllBorrowByMonthReducer(respone.data.metadata));
    } catch (e) {
      const errors = e as any;
     
    }
  };
};