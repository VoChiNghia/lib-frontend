import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { DispatchType } from '../store'
import Dashboard from '../../component/addminTabs/dashboard/Dashboard'

const initialState = {
    component:<Dashboard />,
    isOpen:false,
}
const componentGlobal = createSlice({
    name: 'componentGlobal',
    initialState,
    reducers: {
        changeComponent: (state,action:PayloadAction<any>) => {
            state.component = action.payload
        },
    }
})
export const {changeComponent} = componentGlobal.actions
export default componentGlobal.reducer

