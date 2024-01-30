import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Typography from '../styles/Typography'
import { calculateMargins, calculateWidths, IMargins, IWidths } from '../utils/calculateLayout'
import useWindowSize from '../utils/useWindowSize'
import { useWindowContext } from '../context/WindowSize'
import { useAppDispatch, useAppSelector } from '../redux/store'
import { createUser } from '../redux/authSlice'

export default function SidebarLayout() {

    const navigate = useNavigate()

    const [width, height] = useWindowSize()
    const { mid, mobile } = useWindowContext()

    const dispatch = useAppDispatch()

    const accessToken = useAppSelector(state => state.auth.accessToken)

    const [margins, setMargins] = useState<IMargins>({
        marginLeftS: calculateMargins(width, mid, mobile).marginLeftS,
        marginLeftC: calculateMargins(width, mid, mobile).marginLeftC,

    })
    const [widths, setWidths] = useState<IWidths>({
        sideWidth: 200,
        contentWidth: 745
    })

    useLayoutEffect(() => {
        setMargins({
            marginLeftS: calculateMargins(width, mid, mobile).marginLeftS,
            marginLeftC: calculateMargins(width, mid, mobile).marginLeftC,

        })
        setWidths({
            sideWidth: calculateWidths(width, mid, mobile).sideWidth,
            contentWidth: calculateWidths(width, mid, mobile).contentWidth
        })
    }, [width])

    return (
        <div className='layout d-flex'>
            <div className='side-bar col-2' style={{ left: margins.marginLeftS, width: widths.sideWidth }}>
                <div className='sidebar-item-container'>
                    <div className='logo'>
                        <Typography className='ms-3' variant='caption1'>{mid ? ("S") : ("Starkoverflow")}</Typography>
                    </div>
                    <div className='sidebar-item d-flex' onClick={() => navigate("/")}>
                        <i className="fa-solid fa-house mx-3 my-auto fa-lg"></i>
                        {!mid && <Typography className='my-auto me-4' color='blue' variant='caption2'>Home</Typography>}
                    </div>
                    <div className='sidebar-item d-flex' onClick={() => navigate("/questions/db")}>
                        <i className="fa-solid fa-clipboard-question mx-3 my-auto fa-lg"></i>
                        {!mid && <Typography className='my-auto me-4' color='blue' variant='caption2'>Questions</Typography>}
                    </div>
                    <div className='sidebar-item d-flex'>
                        <i className="fa-solid fa-tags mx-3 my-auto fa-lg"></i>
                        {!mid && <Typography className='my-auto me-4' color='blue' variant='caption2'>Tags</Typography>}
                    </div>
                    {accessToken && (
                        <>
                            <hr />
                            <div className='sidebar-item d-flex'>
                                <i className="fa-solid fa-bookmark mx-3 my-auto fa-lg"></i>
                                {!mid && <Typography className='my-auto me-4' color='blue' variant='caption2'>Saves</Typography>}
                            </div>

                            <div className='sidebar-item d-flex' onClick={() => navigate("/profile")}>
                                <i className="fa-solid fa-user mx-3 my-auto "></i>
                                {!mid && <Typography className='my-auto me-4' color='blue' variant='caption2'>Profile</Typography>}
                            </div>

                            <div className='sidebar-item d-flex'>
                                <i className="fa-solid fa-users mx-3 my-auto"></i>
                                {!mid && <Typography className='my-auto me-4' color='blue' variant='caption2'>Users</Typography>}
                            </div>
                        </>
                    )}
                    <hr />
                    <div>
                        {!accessToken ? (

                            <button className='auth-btn btn my-2' onClick={() => navigate("/login")}>Login</button>
                        ) : (
                            <>

                                <button className='ask-question btn ms-4 my-4' onClick={() => navigate("/questions/ask")}>Ask Question</button>
                                <div className='logout-btn'>
                                    <button className='logout btn-danger btn my-4' onClick={() => navigate("/questions/ask")}>Logout</button>
                                </div>

                            </>

                        )}
                    </div>
                </div>
            </div>
            <div className='content-container col-7' style={{ width: widths.contentWidth, left: margins.marginLeftC, minHeight: "100vh" }}>
                <Outlet />
            </div>
        </div>
    )
}
