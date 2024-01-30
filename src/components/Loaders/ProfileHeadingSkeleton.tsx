import React from 'react'
import ContentLoader from 'react-content-loader'

export default function ProfileHeadingSkeleton() {
    return (

        <ContentLoader
            speed={2}
            viewBox={"0 0 728 220"}
            foregroundColor='#bbb'
            backgroundColor='#ddd'
            width={728}
            height={220}
        >
            <rect x="24" y="24" rx="60" ry="60" width="125" height="125" />
            <rect x="185" y="74" rx="4" ry="4" width="140" height="30" />
            <rect x="185" y="110" rx="2" ry="2" width="180" height="20" />

        </ContentLoader>
    )
}
