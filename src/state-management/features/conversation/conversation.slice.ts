import {createSlice} from '@reduxjs/toolkit'

export interface conversation {
    value: string
}

const initialState: conversation = {
    value: '',
}

export const getConversationIdSlice = createSlice({
    name: 'getConversationId',
    initialState,
    reducers: {
        getConversationId: (state, action) => {
            console.log('__payload conversation___: ', action);
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const {getConversationId} = getConversationIdSlice.actions

export default getConversationIdSlice.reducer