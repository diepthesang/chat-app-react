import {createSlice} from '@reduxjs/toolkit'

export interface UserOnlineState {
    value: boolean
}

const initialState: UserOnlineState = {
    value: false,
}

export const toggleUserOnlineSlice = createSlice({
    name: 'toggleUserOnline',
    initialState,
    reducers: {
        toggleUserOnline: (state, action) => {
            console.log({payload_is_userOnline: action})
            state.value = action.payload.isUserOnline
        },
    },
})

// Action creators are generated for each case reducer function
export const {toggleUserOnline} = toggleUserOnlineSlice.actions

export default toggleUserOnlineSlice.reducer