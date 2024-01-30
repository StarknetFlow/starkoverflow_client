import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getQuestionsInDb } from '../../redux/questionSlice'
import Typography from '../../styles/Typography'
import QuestionSkeleton from '../../components/Loaders/QuestionSkeleton'
import QuestionsFake from './QuestionsFake'

export default function DbQuestions() {

    const dispatch = useAppDispatch()

    useEffect(() => {

        dispatch(getQuestionsInDb())
    }, [])


    const allQuestions = useAppSelector((state) => state.question.dbQuestions.questions)
    const isLoading = useAppSelector(state => state.question.dbQuestions.isLoading)



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
                        <QuestionsFake question={question} />
                    </div>
                ))
            )}
        </div>
    )
}
