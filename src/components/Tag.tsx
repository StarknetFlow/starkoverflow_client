import React, { ReactNode } from 'react'
import "./styles.css"
import Typography from '../styles/Typography'

interface TagProps {
    children: ReactNode
}
export default function Tag({ children }: TagProps) {
    return (
        <div className='q-tag mx-1 my-2'>
            <Typography className='mx-2 my-1 py-1 px-1' color='blue' variant='text'>{children}</Typography>
        </div>
    )
}
