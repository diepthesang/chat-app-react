import {createSlice} from '@reduxjs/toolkit'
import {MessageType} from "../../../types/message.type";


const initialState: MessageType = {
    text: '',
    conversationId: '',
}

export const getMessageSlice = createSlice({
    name: 'getTextMessage',
    initialState,
    reducers: {
        getTextMessage: (state, action) => {
            state.text = action.payload.text;
            state.conversationId = action.payload.conversationId;
        },
    },
})

// Action creators are generated for each case reducer function
export const {getTextMessage} = getMessageSlice.actions

export default getMessageSlice.reducer