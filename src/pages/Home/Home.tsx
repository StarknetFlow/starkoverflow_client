import React, { useEffect, useState } from 'react'
import "./styles.css"
import Typography from '../../styles/Typography'
import Question from '../../components/Question'
import { getAllQuestions } from '../../redux/questionSlice'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import QuestionSkeleton from '../../components/Loaders/QuestionSkeleton'
import { getStackoverflowToken } from '../../redux/authSlice'

export default function Home() {

    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(getStackoverflowToken())
        setTimeout(() => {
            dispatch(getAllQuestions())
        }, 3000);

    }, [])


    const allQuestions = useAppSelector((state) => state.question.allQuestions.questions)
    const isLoading = useAppSelector(state => state.question.allQuestions.isFetching)



    return (
        <div className='home-container mx-2'>
            <Typography styles={{ paddingBottom: "30px" }} color='blue' variant='caption1'>Top Questions</Typography>
            {(isLoading || !allQuestions) ? (
                <div>
                    <QuestionSkeleton />
                    <QuestionSkeleton />
                    <QuestionSkeleton />
                </div>
            ) : (
                allQuestions.map((question, i) => (
                    <div key={i}>
                        <Question question={question} />
                    </div>
                ))
            )}
        </div>
    )
}
