import { AsyncThunk, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from "../api/index"
import { IDBQuestion, IQuestion, IQuestionCreatePayload, IUserAuth } from "./types"
import { RootState } from './store'
// Declare and export a type for the slice's state

interface QuestionState {
  allQuestions: {
    questions: IQuestion[],
    isFetching: boolean
    lastFetched: Date | undefined
  }
  currentQuestion: {
    quesiton: IQuestion | undefined
    isFetching: boolean
  }
  dbQuestions: {
    questions: IDBQuestion[],
    isLoading: boolean
  },
  currentDbQuestion: {
    question: IDBQuestion | undefined
    isFetching: boolean
  }
}

const initialState: QuestionState = {
  allQuestions: {
    questions: [],
    isFetching: false,
    lastFetched: undefined
  },
  currentQuestion: {
    quesiton: undefined,
    isFetching: false
  },
  currentDbQuestion: {
    question: undefined,
    isFetching: false
  },
  dbQuestions: {
    questions: [],
    isLoading: false
  }
}

export const getAllQuestions = createAsyncThunk("/question/getAllQuestions", async (_, { getState }) => {

  const currentState: RootState = getState() as RootState;

  if (currentState.question.allQuestions.lastFetched) {
    const minutesPassed = ((new Date().getTime() - currentState.question.allQuestions.lastFetched.getTime()) / 1000 * 60)
    if (minutesPassed > 10) {
      const { data } = await api.getAllPosts()
      return data.items as IQuestion[]
    }
  } else {
    const { data } = await api.getAllPosts()
    return data.items as IQuestion[]
  }
  throw new Error()

})


type GetQuestionByIdThunk = AsyncThunk<IQuestion, string, { state: RootState }>

export const getQuestionById: GetQuestionByIdThunk = createAsyncThunk("question/getQuestionById", async (id): Promise<IQuestion> => {


  const { data } = await api.getQuestionDetailsById(id)

  return data.items[0] as IQuestion
})


type CreateQuestionThunk = AsyncThunk<{}, IQuestionCreatePayload, { state: RootState }>

export const createQuestion: CreateQuestionThunk = createAsyncThunk("question/createQuestion", async (question, { getState }) => {

  const currentState: RootState = getState() as RootState;
  let user: IUserAuth = {
    user: undefined,
    accessToken: undefined
  }
  console.log(currentState.auth)
  console.log(currentState.auth.accessToken)

  if (currentState.auth.accessToken && currentState.auth.user) {
    user = {
      user: currentState.auth.user,
      accessToken: currentState.auth.accessToken
    }

  }
  const { data } = await api.createNewQuestion(user, question)

  return {}
})


type GetQuestionsInDbThunk = AsyncThunk<IDBQuestion[], void, { state: RootState }>

export const getQuestionsInDb: GetQuestionsInDbThunk = createAsyncThunk("question/getQuestionsOnDb", async (): Promise<IDBQuestion[]> => {

  const { data } = await api.getSavedQuestions()

  return data.questions as IDBQuestion[]
})

type GetDbQuestionByIdThunk = AsyncThunk<IDBQuestion, string, { state: RootState }>

export const getDbQuestionById: GetDbQuestionByIdThunk = createAsyncThunk("question/getDbQuestionById", async (id): Promise<IDBQuestion> => {

  const { data } = await api.getDbQuestionByIdReq(id)


  return data.question as IDBQuestion
})



const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    todoToggled(state, action) {

    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllQuestions.pending, (state: QuestionState) => {
      return {
        ...state,
        allQuestions: {
          ...state.allQuestions,
          isFetching: true
        }
      }
    })
    builder.addCase(getAllQuestions.fulfilled, (state: QuestionState, action) => {
      return {
        ...state,
        allQuestions: {
          questions: action.payload,
          isFetching: false,
          lastFetched: new Date()
        }

      }
    })
    builder.addCase(getQuestionById.pending, (state: QuestionState) => {
      return {
        ...state,
        currentQuestion: {
          ...state.currentQuestion,
          isFetching: true
        }
      }
    })

    builder.addCase(getQuestionById.fulfilled, (state: QuestionState, action) => {
      return {
        ...state,
        currentQuestion: {
          quesiton: action.payload,
          isFetching: false
        }
      }
    })
    builder.addCase(createQuestion.fulfilled, (state: QuestionState) => {
      return {
        ...state
      }
    })
    builder.addCase(getQuestionsInDb.pending, (state: QuestionState) => {
      return {
        ...state,
        dbQuestions: {
          questions: [],
          isLoading: true
        }
      }
    })
    builder.addCase(getQuestionsInDb.fulfilled, (state: QuestionState, action) => {
      return {
        ...state,
        dbQuestions: {
          questions: action.payload,
          isLoading: false
        }
      }
    })
    builder.addCase(getDbQuestionById.pending, (state) => {
      return {
        ...state,
        currentDbQuestion: {
          question: undefined,
          isFetching: true
        }
      }
    })
    builder.addCase(getDbQuestionById.fulfilled, (state: QuestionState, action) => {
      return {
        ...state,
        currentDbQuestion: {
          question: action.payload,
          isFetching: false
        }

      }
    })
    builder.addCase(getDbQuestionById.rejected, (state: QuestionState, action) => {
      console.log(action.error)
    })

  }
})

export default questionSlice.reducer

export const { todoToggled } = questionSlice.actions