import React from 'react'
import ContentLoader from 'react-content-loader'

export default function QuestionSkeleton() {
    return (
        <ContentLoader
            className='my-3 question-skeleton'
            speed={2}
            viewBox={"0 0 728 226"}
            foregroundColor='#aaa'
            backgroundColor='#ccc'
            width={728}
            height={226}
        >
            {/* <rect x="0" y="0" rx="20" ry="20" width="728" height="226" /> */}

            <rect x="15" y="15" rx="50" ry="50" width="35" height="35" />
            <rect x="60" y="23" rx="4" ry="4" width="140" height="17" />

            <rect x="60" y="70" rx="6" ry="6" width="450" height="24" />
            <rect x="60" y="110" rx="6" ry="6" width="550" height="60" />


        </ContentLoader>
    )
}
