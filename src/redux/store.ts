import { ThunkMiddleware, combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import questionReducer from "./questionSlice"
import userReducer from "./userSlice"
import authReducer from './authSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";


const rootReducer = combineReducers({
    auth: authReducer,
    question: questionReducer,
    user: userReducer,
})
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['auth'],
}
const persistedReducer = persistReducer(persistConfig, rootReducer);


const customMiddleware = (store: any) => (next: any) => (action: any) => {
    // Özel middleware işlemleri burada
    return next(action);
};

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(customMiddleware as ThunkMiddleware<RootState>)
})

export const persistor = persistStore(store);




export type RootState = ReturnType<typeof persistedReducer>
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// async function resetStore() {
//     await persistor.purge();
//     window.location.reload();
// }

// resetStore();
