import {createSlice} from '@reduxjs/toolkit'

export interface EnableSearchModal {
    value: boolean
}

const initialState: EnableSearchModal = {
    value: false,
}

export const enableSearchModalSlice = createSlice({
    name: 'enableSearchModal',
    initialState,
    reducers: {
        changeEnableSearchModal: (state, action) => {
            console.log({action})
            state.value = action.payload.isEnableModal
        },

    },
})

// Action creators are generated for each case reducer function
export const {changeEnableSearchModal} = enableSearchModalSlice.actions

export default enableSearchModalSlice.reducer