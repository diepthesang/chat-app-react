import {createSlice} from '@reduxjs/toolkit'

export interface EnableUserInfo {
    value: boolean
}

const initialState: EnableUserInfo = {
    value: false,
}

export const EnableUserInfoSlice = createSlice({
    name: 'EnableUserInfo',
    initialState,
    reducers: {
        changeEnableUserInfo: (state) => {
            state.value = !state.value
        },

    },
})

// Action creators are generated for each case reducer function
export const {changeEnableUserInfo} = EnableUserInfoSlice.actions

export default EnableUserInfoSlice.reducer