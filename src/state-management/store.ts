import {configureStore} from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counter.slice";
import enableSearchModalReducer from "./features/search-friends/search-friends.slice";
import enableUserInfoReducer from "./features/enable-user-info/enable-user-info.slice";
import getConversationIdReducer from "./features/conversation/conversation.slice";
import getMessageReducer from "./features/get-message/get-message.slice";
import getListMsgReducer from "./features/get-list-msg/get-list-msg.slice";
import getReceiverReducer from "./features/get-receiver/get-receiver.slice";
import toggleUserOnlineReducer from "./features/user-online/user-online.slice";


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        enableSearchModal: enableSearchModalReducer,
        enableUserInfo: enableUserInfoReducer,
        getConversationId: getConversationIdReducer,
        getListMsg: getListMsgReducer,
        getMessage: getMessageReducer,
        getReceiver: getReceiverReducer,
        toggleUserOnline: toggleUserOnlineReducer

    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch