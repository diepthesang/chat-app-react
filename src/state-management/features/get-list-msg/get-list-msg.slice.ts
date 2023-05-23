import {createSlice} from '@reduxjs/toolkit'

export interface Msg {
    avtImgPath: string | null,
    conversationId: string | null,
    firstName: string | null,
    lastName: string | null,
    text: string | null,
    userId: string | null,
    createdAt: string | null,
}

const initialState: any = {
    value: [] as Msg[]
}

export const getListMsgSlice = createSlice({
    name: 'getListMsg',
    initialState,
    reducers: {
        getListMsg: (state, action: any) => {
            state.value = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const {getListMsg} = getListMsgSlice.actions

export default getListMsgSlice.reducer