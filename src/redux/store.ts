import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import questionReducer from "./questionSlice"
import userReducer from "./userSlice"
import authSlice from './authSlice'


export const store = configureStore({
    reducer: {
        question: questionReducer,
        user: userReducer,
        auth: authSlice

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch



export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// async function resetStore() {
//     await persistor.purge();
//     window.location.reload();
// }

// resetStore();
