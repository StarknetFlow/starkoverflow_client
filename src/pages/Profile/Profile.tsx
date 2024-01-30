import React, { useEffect, useRef, useState } from 'react'
import BackButton from '../../components/BackButton'
import Typography from '../../styles/Typography'
import "./styles.css"
import { useNavigate, useParams } from 'react-router-dom'
import Question from '../../components/Question'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getUserById, getUsersQuestions, resetInProfile } from '../../redux/userSlice'
import { getUsersJoinYear } from '../../utils/fromNow'
import QuestionSkeleton from '../../components/Loaders/QuestionSkeleton'
import ProfileHeadingSkeleton from '../../components/Loaders/ProfileHeadingSkeleton'

export default function Profile() {

    const navigate = useNavigate()
    const params = useParams()

    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.inProfile.userInfo)
    const questions = useAppSelector(state => state.user.inProfile.usersQuestions)
    const isLoading = useAppSelector(state => state.user.inProfile.isLoading)

    const questionsRef = useRef<HTMLDivElement>(null)
    const answersRef = useRef<HTMLDivElement>(null)


    const [selectedShowing, setSelecedShowing] = useState<"questions" | "answers">("questions")

    useEffect(() => {
        dispatch(getUserById(params.userId!))
        dispatch(getUsersQuestions(params.userId!))
        console.log(user)
        if (selectedShowing === "questions" && questionsRef.current && answersRef.current) {
            questionsRef.current.classList.add("active")
            answersRef.current.classList.remove("active")
        } else if (selectedShowing === "answers" && questionsRef.current && answersRef.current) {
            answersRef.current.classList.add("active")
            questionsRef.current.classList.remove("active")
        }
    }, [])

    useEffect(() => {
        if (questions) console.log(questions)
    }, [questions])

    useEffect(() => {
        if (selectedShowing === "questions" && questionsRef.current && answersRef.current) {
            questionsRef.current.classList.add("active")
            answersRef.current.classList.remove("active")

        } else if (selectedShowing === "answers" && questionsRef.current && answersRef.current) {
            answersRef.current.classList.add("active")
            questionsRef.current.classList.remove("active")
        }
    }, [selectedShowing])


    const handleShowing = (selection: string) => {
        if (selection === "questions") setSelecedShowing("questions")
        else setSelecedShowing("answers")
    }

    const goBack = () => {
        navigate(-1)
        dispatch(resetInProfile(undefined))
    }

    return (
        <div className='profile-container mx-2' >
            <div className='profile-header d-flex'>
                <div onClick={goBack}>
                    <BackButton />
                </div>
                <Typography className='mx-3 my-auto' color="blue" variant='caption2'>Arda Tahtaci</Typography>
                <br />
            </div>
            {!user || isLoading ? (
                <ProfileHeadingSkeleton />
            ) : (
                <div className='person-info ms-4 mt-4 d-flex'>
                    <img className='profile-photo' src={user?.profile_image} />
                    <div className='profile-info'>
                        <Typography variant='caption2' color='blue'>{user?.display_name}</Typography>
                        <Typography variant='subtitle2' color='faded2'>{"Joined " + getUsersJoinYear(user?.creation_date!)}</Typography>
                    </div>
                </div>
            )}

            <div className='top-navigation row mx-1'>
                <div ref={questionsRef} onClick={() => handleShowing("questions")} className='col-6 nav-item '>
                    <p ref={questionsRef} className='nav-item-p active'>Questions</p>
                    {/* <div className='bottom-border' /> */}
                </div>
                <div ref={answersRef} onClick={() => handleShowing("answers")} className='col-6 nav-item' >
                    <p ref={answersRef} className='nav-item-p'>Answers</p>
                </div>

            </div>
            {(isLoading || !questions) ? (
                <div>
                    <QuestionSkeleton />
                    <QuestionSkeleton />
                    <QuestionSkeleton />
                </div>
            ) : selectedShowing === "questions" ? (
                questions.map((question, index) => (
                    <Question key={index} question={question} />
                ))
            ) : (
                <div />
            )}
        </div>
    )
}
