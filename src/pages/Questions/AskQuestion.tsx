import React, { ChangeEvent, FormEventHandler, useState } from 'react'
import Typography from '../../styles/Typography'
import { useNavigate } from 'react-router-dom'
import * as yup from "yup"
import QAInputArea from '../../components/QAInputArea'
import { useAppDispatch } from '../../redux/store'
import { createQuestion } from '../../redux/questionSlice'

interface QuestionData {
    title: string,
    content: string,
}

const questionSchema = yup.object().shape({

    title: yup.string().required().min(20),
    content: yup.string().required().min(50),

})


export default function AskQuestion() {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const [title, setTitle] = useState<string>("")
    const [contentValue, setContentValue] = useState<string>(``)
    const [errors, setErrors] = useState({
        titleError: "",
        contentError: ""
    })



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const data = {
            title: title,
            content: contentValue
        }
        try {
            const validatedData = await questionSchema.validate(data)
            if (validatedData) {
                setErrors({
                    titleError: "",
                    contentError: ""
                })
                dispatch(createQuestion(validatedData))
                alert("successfully posted")
            }
        } catch (error: any) {

            const validationErrors: { titleError: string, contentError: string } = { titleError: "", contentError: "" }

            if (error.path === "content") validationErrors.contentError = error.message
            else if (error.path === "title") validationErrors.titleError = error.message

            console.log(validationErrors)

            setErrors(validationErrors)

            console.log(error)

        }
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const getValue = (val: string) => {
        setContentValue(val)
    }


    return (
        <div className='ask-question-container'>
            <div className='d-flex' style={{ height: "30px", marginBottom: "50px" }}>
                <div className='back-button d-flex' onClick={() => navigate(-1)}>
                    <Typography className='my-auto mx-auto' color='blue' variant='subtitle1'><i className="fa-solid fa-arrow-left mx-3 my-auto fa-lg" /></Typography>
                </div>
                <Typography className='mt-1' variant='caption1' color='blue'>Ask Question</Typography>
            </div>
            <form className='ask-question-form' onSubmit={handleSubmit}>
                <label className='ms-2'><Typography variant='subtitle1' color='blue'>Title</Typography></label>
                <input className='form-control my-3' onChange={handleTitleChange} name='title' />
                {errors.titleError && <p className='ms-2' style={{ color: "red" }}>{errors.titleError}</p>}

                <label className='ms-2'><Typography variant='subtitle1' color='blue'>Body</Typography></label>
                <QAInputArea height='350px' getValue={getValue} />
                {errors.contentError && <p className='ms-2' style={{ color: "red" }}>{errors.contentError}</p>}


                <label><Typography className='ms-2 mt-4' variant='subtitle1' color='blue'>Tags</Typography></label>
                <input className='form-control my-3' />
                <div style={{ display: "flex" }}>
                    <button type="submit" className='answer-btn btn mt-4 mx-auto' style={{ width: "200px" }} >Post Your Question</button>
                </div>

            </form>
        </div>
    )
}
