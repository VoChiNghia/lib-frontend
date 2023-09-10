import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { DispatchType } from '../store'

const initialState = {
    component:<p></p>,
    isOpen:false,
}
const Modal = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        changeComponent: (state,action:PayloadAction<any>) => {
            state.component = action.payload
        },
        setIsOpenCompoent: (state,action:PayloadAction<any>) => {
            state.isOpen = action.payload
        }
    }
})
export const {changeComponent,setIsOpenCompoent} = Modal.actions
export default Modal.reducer

