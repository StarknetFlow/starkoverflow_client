import React from 'react'
import Tag from '../../components/Tag'
import Typography from '../../styles/Typography'
import { useWindowContext } from '../../context/WindowSize'
import { IDBQuestions, IQuestion } from '../../redux/types'
import { getTime } from '../../utils/fromNow'
import { useNavigate } from 'react-router-dom'

interface QuestionProps {
    question: IDBQuestions
}

export default function QuestionsFake(props: QuestionProps) {

    const { mid, mobile } = useWindowContext()

    const navigate = useNavigate()

    // getTime(props.question.last_edit_date)

    return (
        <div className='question-container my-3' style={{}}>

            <div className='profile-section ms-3 me-2 d-flex'>
                <img className='profile-photo-q' />
                <div >
                    <Typography className='username mt-2 ms-3' color='blue' variant='subtitle1' >{"test account"}</Typography>

                </div>
                <Typography className='my-auto ms-2' variant='subtitle2'>·</Typography>
                <Typography className='my-auto ms-2' variant='text' color='blue'>{(props.question.creation_date && (getTime(props.question.creation_date.getTime()) + " ago"))}</Typography>
            </div>
            <div className='mt-2 mb-3 ps-3' style={{ marginLeft: "35px" }}>
                <div onClick={() => navigate("/questions/" + props.question._id)}>
                    <Typography className='ms-3 my-2 question-title' wrap="true" color='blue' variant='subtitle1' >{props.question.title}</Typography>

                </div>
                <div className='question-content-container ms-3 me-4'>
                    <span className='question-content'>
                        I am trying to implement a URL like /user/info, but when I hit the URL, it shows a white blank screen. I have tried to resolve this issue, but unfortunately, I am not able to do so. I will attach my code as well to show what I have tried. Any support would be much appreciated. Thanks.
                    </span>
                    <span className='dots'>...</span>
                </div>

            </div>

            <div className='question-footer'>
                <div className='statistics d-flex ms-3'>
                    <Typography className='my-auto ms-3 me-2' variant='text' color='blue'>{3 + " answers"}</Typography>
                    <Typography className='my-auto mx-2' variant='text' color='blue'>{21 + " views"}</Typography>
                </div>
                <div className='tag-section d-flex me-1'>
                    {props.question.tags.map((tag, i) => (
                        i < 3 && (<Tag key={i}>{tag}</Tag>)
                    ))}
                </div>
            </div>




        </div>
    )
}
