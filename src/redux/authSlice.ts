import { AsyncThunk, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { ICreateUserPayload, ICreatedUser, IQuestion, IUser, IUserToLogin, IUserToLoginPayload } from "./types"
import { RootState } from "./store"
import * as api from "../api/index"


interface AuthState {
    user: IUser | undefined,
    accessToken: string,
    questions: IQuestion[],
    registerError: boolean,
}

const initialState: AuthState = {
    user: undefined,
    accessToken: "",
    questions: [],
    registerError: false
}

type CreateUserThunk = AsyncThunk<ICreatedUser, ICreateUserPayload, { state: RootState }>

export const createUser: CreateUserThunk = createAsyncThunk("auth/createUser", async (user): Promise<ICreatedUser> => {

    const { data } = await api.createUser({
        display_name: user.display_name,
        email: user.email,
        password: user.password
    })

    console.log(data)

    return data

})

type LoginThunk = AsyncThunk<IUserToLogin, IUserToLoginPayload, { state: RootState }>

export const login: LoginThunk = createAsyncThunk("auth/login", async (user): Promise<ICreatedUser> => {

    const { data } = await api.login(user)

    console.log(data)

    return data

})

const authSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        todoToggled(state, action) {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state: AuthState, action) => {
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken
            }
        })
        builder.addCase(createUser.rejected, (state, action) => {
            return {
                ...state,
                registerError: true
            }
        })
        builder.addCase(login.fulfilled, (state, action) => {
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken
            }
        })
    }
})

export default authSlice.reducer