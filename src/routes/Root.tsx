import React from 'react'
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom'
import Home from '../pages/Home/Home'
import SidebarLayout from './SidebarLayout'
import Profile from '../pages/Profile/Profile'
import { useAppSelector } from '../redux/store'
import SignUp from '../pages/Register/SignUp'
import Login from '../pages/Register/Login'
import Questions from '../pages/Questions/Questions'
import AskQuestion from '../pages/Questions/AskQuestion'
import DbQuestions from '../pages/DBQuestions/DbQuestions'
import FakeQuestions from '../pages/Questions/FakeQuestions'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from '../redux/store'


export default function Root() {

    const accessToken = useAppSelector(state => state.auth.accessToken)


    return (
        <div>
            <PersistGate persistor={persistor}>
                <Provider store={store}>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/login' element={<Login />} />
                            <Route path='/register' element={<SignUp />} />
                            <Route path='/' element={<SidebarLayout />} >
                                <Route path='' element={<Home />} />
                                <Route path='profile/:userId' element={<Profile />} />
                                <Route path='questions/db' element={<DbQuestions />} />
                                <Route path='questions/db/:questionId' element={<FakeQuestions />} />
                                <Route path='questions/ask' element={<AskQuestion />} />
                                <Route path='questions/:questionId' element={<Questions />} />

                            </Route>

                        </Routes>
                    </BrowserRouter>
                </Provider>

            </PersistGate>
        </div>
    )
}
