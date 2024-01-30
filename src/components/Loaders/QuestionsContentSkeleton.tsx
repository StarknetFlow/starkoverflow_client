import React from 'react'
import ContentLoader from 'react-content-loader'

export default function QuestionsContentSkeleton() {
    return (
        <div>
            <ContentLoader
                className='question-heading-skeleton'
                speed={2}
                viewBox={"0 0 728 200"}
                foregroundColor='#bbb'
                backgroundColor='#ddd'
                width={728}
                height={200}
            >

                <rect x="5" y="5" rx="6" ry="6" width="700" height="28" />
                <rect x="5" y="35" rx="6" ry="6" width="650" height="20" />
                <rect x="5" y="62" rx="6" ry="6" width="700" height="58" />
                <rect x="5" y="125" rx="6" ry="6" width="680" height="20" />
                <rect x="5" y="150" rx="6" ry="6" width="600" height="20" />


            </ContentLoader>
            <ContentLoader
                className='question-skeleton'
                speed={2}
                viewBox={"0 0 728 350"}
                foregroundColor='#aaa'
                backgroundColor='#ccc'
                width={728}
                height={350}
            >

                <rect x="10" y="15" rx="6" ry="6" width="500" height="20" />
                <rect x="30" y="38" rx="6" ry="6" width="650" height="20" />
                <rect x="50" y="62" rx="6" ry="6" width="450" height="30" />
                <rect x="70" y="95" rx="6" ry="6" width="600" height="20" />
                <rect x="100" y="120" rx="6" ry="6" width="580" height="20" />
                <rect x="70" y="150" rx="6" ry="6" width="400" height="20" />
                <rect x="40" y="200" rx="6" ry="6" width="500" height="20" />
                <rect x="40" y="225" rx="6" ry="6" width="450" height="20" />
                <rect x="60" y="250" rx="6" ry="6" width="360" height="20" />
                <rect x="40" y="275" rx="6" ry="6" width="580" height="20" />
                <rect x="10" y="300" rx="6" ry="6" width="100" height="20" />


            </ContentLoader>
        </div>

    )
}
