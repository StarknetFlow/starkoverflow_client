import React from 'react'
import ContentLoader from 'react-content-loader'

export default function QuestionsHedingSkeleton() {
    return (
        <ContentLoader
            className='question-heading-skeleton'
            speed={2}
            viewBox={"0 0 728 78"}
            foregroundColor='#bbb'
            backgroundColor='#ddd'
            width={728}
            height={78}
        >

            <rect x="5" y="0" rx="6" ry="6" width="555" height="25" />
            <rect x="5" y="45" rx="6" ry="6" width="140" height="20" />

            <rect x="160" y="45" rx="6" ry="6" width="150" height="20" />


        </ContentLoader>
    )
}
