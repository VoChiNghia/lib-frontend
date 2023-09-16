import {configureStore} from '@reduxjs/toolkit'
import authSlice from './reducer/auth'
import modal from './reducer/modal'
import book from './reducer/book'
import category from './reducer/category'
import user from './reducer/user'
import toast from './reducer/toast'
const store = configureStore({
    reducer:{
        authSlice,
        modal,
        book,
        category,
        user,
        toast
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      })
})

export type DispatchType = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store