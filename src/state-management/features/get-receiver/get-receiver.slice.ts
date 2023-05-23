import {createSlice} from '@reduxjs/toolkit'


interface Receiver {
    id: string
}

const initialState: Receiver = {
    id: ''
}

export const getReceiverSlice = createSlice({
    name: 'getReceiver',
    initialState,
    reducers: {
        getReceiver: (state, action) => {
            console.log('_____________________action.payload.receiverId___________-', action.payload.receiverId)
            state.id = action.payload.receiverId;
        },
    },
})

// Action creators are generated for each case reducer function
export const {getReceiver} = getReceiverSlice.actions

export default getReceiverSlice.reducer