import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from "../api/index"
import { IQuestion, IUser } from './types'
import { RootState } from './store'

interface UserState {
    inProfile: {
        isLoading: boolean
        userInfo: IUser | undefined
        usersQuestions: IQuestion[]
    }
}

const initialState: UserState = {
    inProfile: {
        isLoading: false,
        userInfo: undefined,
        usersQuestions: []
    }
}
// return type, payload type, state type
type GetUserByIdThunk = AsyncThunk<{ user: IUser }, string, { state: RootState }>

export const getUserById: GetUserByIdThunk = createAsyncThunk("question/getUserById", async (id): Promise<{ user: IUser }> => {
    const { data } = await api.getUser(id)
    return {
        user: data.items[0]
    }
})

type GetUsersQuestionsThunk = AsyncThunk<{ questions: IQuestion[] }, string, { state: RootState }>

export const getUsersQuestions: GetUsersQuestionsThunk = createAsyncThunk("questions/getUsersQuestions", async (id: string): Promise<{ questions: IQuestion[] }> => {

    const { data } = await api.getUsersQuestions(id)

    return {
        questions: data.items
    }
})


type GetUsersAnswersThunk = AsyncThunk<{ questions: IQuestion[] }, string, { state: RootState }>

export const getUsersAnswers: GetUsersAnswersThunk = createAsyncThunk("questions/getUsersAnswers", async (id: string): Promise<{ questions: IQuestion[] }> => {

    const { data } = await api.getUsersAnswers(id)

    return {
        questions: data.items
    }
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetInProfile(state, action) {
            return {
                ...state,
                inProfile: {
                    userInfo: undefined,
                    usersQuestions: [],
                    isLoading: false
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserById.pending, (state, action) => {
            return {
                ...state,
                inProfile: {
                    ...state.inProfile,
                    isLoading: true
                }
            }
        })
        builder.addCase(getUserById.fulfilled, (state: UserState, action) => {
            return {
                ...state,
                inProfile: {
                    usersQuestions: state.inProfile.usersQuestions,
                    userInfo: action.payload.user,
                    isLoading: false
                }
            }
        })
        builder.addCase(getUsersQuestions.fulfilled, (state: UserState, action) => {
            return {
                ...state,
                inProfile: {
                    usersQuestions: action.payload.questions,
                    userInfo: state.inProfile.userInfo,
                    isLoading: false
                }

            }
        })
        builder.addCase(getUsersQuestions.pending, (state, action) => {
            return {
                ...state,
                inProfile: {
                    ...state.inProfile,
                    isLoading: true
                }
            }
        })
    }
})


export default userSlice.reducer

export const { resetInProfile, } = userSlice.actions