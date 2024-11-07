import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productReducer";

const store = configureStore({
    reducer: {
        productReducer
      },
    
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;