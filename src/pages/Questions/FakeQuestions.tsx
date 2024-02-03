import React, { useEffect, useState } from 'react'
import MyEditor from '../../components/CodeEditor'
import "./styles.css"
import Typography from "../../styles/Typography"
import Tag from '../../components/Tag'
import { codeSample1 } from './codeSamples'
import Answers from './Answers'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { getDbQuestionById, getQuestionById } from '../../redux/questionSlice'
import { getTime } from '../../utils/fromNow'
import QuestionsHedingSkeleton from '../../components/Loaders/QuestionsHedingSkeleton'
import QuestionsContentSkeleton from '../../components/Loaders/QuestionsContentSkeleton'
import QAInputArea from '../../components/QAInputArea'
import { IDBQuestion, IQuestion } from '../../redux/types'
import QContentRenderer from './QContent'


export default function FakeQuestions() {

    const navigate = useNavigate()
    const params = useParams()

    const dispatch = useAppDispatch()

    const question = useAppSelector(state => state.question.currentDbQuestion.question)

    const isLoaded = useAppSelector(state => state.question.currentDbQuestion.isFetching)


    const [paragraphs, setParagraphs] = useState<string[]>(["I've been trying to set up SSR with react for my personal project and have been running into some issues. The console is throwing a bunch of errors, the first one of which is the warning from the title, and then it defaults to CSR. I am not using NextJS, just express, ejs, node, and react. My setup is as follows:", "My server.jsx file, which handles the GET request, renders the component to html, inserts it into my html with ejs, and sends it to the client"])
    const [showAnswerArea, setShowAnswerArea] = useState(false)
    const [answerContent, setAnswerContent] = useState()

    useEffect(() => {
        if (params.questionId)
            dispatch(getDbQuestionById(params.questionId))
    }, [])


    const postAnswer = (content: string) => {

    }

    return (
        <div className="questions-container mx-2">
            <div className='d-flex' style={{ height: "30px", marginBottom: "50px" }}>
                <div className='back-button d-flex' onClick={() => navigate(-1)}>
                    <Typography className='my-auto mx-auto' color='blue' variant='subtitle1'><i className="fa-solid fa-arrow-left mx-3 my-auto fa-lg" /></Typography>
                </div>
                <Typography className='mt-1' variant='caption1' color='blue'>Question</Typography>
            </div>
            {isLoaded ? (
                <QuestionsHedingSkeleton />
            ) : (
                <div>

                    <p className='questions-title mt-4' >{question && question.title}</p>
                    <div className='d-flex mt-3'>
                        <div className='d-flex'>
                            <Typography className='' variant='subtitle1' color='faded2'>Views:</Typography>
                            <Typography className='ms-1 me-3' variant='subtitle2' color='faded2'>{8}</Typography>
                            <Typography className='ms-1' variant='subtitle1' color='faded2'>Answers:</Typography>
                            <Typography className='ms-1' variant='subtitle2' color='faded2'>{2}</Typography>
                        </div>
                    </div>
                </div>
            )}
            <hr />
            {isLoaded ? (
                <QuestionsContentSkeleton />
            ) : (
                <div>

                    {question?.content && (<QContentRenderer content={question?.content && question?.content} />)}


                    <div className='questions-footer d-flex' style={{ justifyContent: "space-between" }}>
                        <div className='tag-section d-flex me-1'>
                            {/* {question?.tags.map((tag, i) => (

                                i < 3 && (<Tag key={i}>{tag}</Tag>)
                            ))} */}
                        </div>
                        <div className='d-flex'>
                            <Typography className='my-auto' variant='text' color='faded2' fontSize="16px" styles={{ marginRight: "0" }}> {("Asked 4 minutes ago")} <strong>by</strong></Typography>
                            <img className='profile-photo-q my-auto ms-3 me-2' src={"https://www.gravatar.com/avatar/05ca3aefdd0f6c1a2cc47e0acf903dcf?s=256&d=identicon&r=PG"} />
                            <div className='my-auto mx-2' onClick={() => navigate("/profile/" + 123)}>
                                <Typography className='username' color='blue' variant='subtitle1' >{"test_account"}</Typography>
                            </div>

                        </div>
                    </div>
                    <hr />


                    <div className='question-answers-area'>
                        <div className='d-flex' style={{ justifyContent: "space-between" }}>     {/*question?.answer_count === 0 ? ("No answers yet") : ("3 Answers")*/}
                            <Typography className='my-auto' variant='caption1' color='blue' fontSize="24px">{" 2 asnwers"}</Typography>
                            <button className='answer-btn btn' onClick={() => setShowAnswerArea(true)}>Answer This Question</button>
                        </div>
                        {showAnswerArea && (
                            <div >
                                <QAInputArea height='250px' getValue={() => ""} />
                                <button className='answer-btn btn mt-4 mx-auto' style={{ width: "200px" }} onClick={() => setShowAnswerArea(true)}>Post Your Answer</button>
                            </div>
                        )}
                        <Answers />
                        {/* {question?.answer_count !== 0 ? <Answers /> : <div style={{ marginBottom: "100px" }} />} */}
                    </div>
                </div>
            )}
        </div>
    )
}
/**<div className='profile-section ms-3 me-2 d-flex'>
                <img className='profile-photo-q' src={props.question.owner.profile_image} />
                <div onClick={() => navigate("/profile/" + props.question.owner.user_id)}>
                    <Typography className='username my-auto ms-3' color='blue' variant='subtitle1' >{props.question.owner.display_name}</Typography>

                </div>
                <Typography className='my-auto ms-2' variant='subtitle2'>·</Typography>
                <Typography className='my-auto ms-2' variant='text' color='blue'>{(getTime(props.question.last_edit_date) && (getTime(props.question.last_edit_date) + " ago"))}</Typography>
            </div> */