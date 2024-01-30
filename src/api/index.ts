import axios from "axios";
import { ICreateUserPayload, IQuestion, IQuestionCreatePayload, IUser, IUserAuth, IUserToLoginPayload } from "../redux/types";

const questionApiEndPoint = "http://localhost:8080/questions"
const userApiEndPoint = "http://localhost:8080/user"
const authApiEndpoint = "http://localhost:8080/auth"

export const getAllPosts = async () => await axios.get(questionApiEndPoint)

export const getUser = async (id: string) => await axios.get(userApiEndPoint + "/" + id)

export const getUsersQuestions = async (id: string) => axios.get(userApiEndPoint + "/" + id + "/questions")

export const getUsersAnswers = async (id: string) => axios.get(userApiEndPoint + "/" + id + "/answers")

export const createUser = async (user: ICreateUserPayload) => axios.post(authApiEndpoint + "/create", user)

export const login = async (user: IUserToLoginPayload) => axios.post(authApiEndpoint + "/login", user)

export const getQuestionDetailsById = async (id: string) => axios.get(questionApiEndPoint + "/" + id)

export const createNewQuestion = async (user: IUserAuth, question: IQuestionCreatePayload) => axios.post(questionApiEndPoint + "/create-question", { question: question }, {
    headers: {
        Authorization: 'Bearer ' + user.accessToken
    }
})

export const getSavedQuestions = async () => axios.get(questionApiEndPoint + "/questions")