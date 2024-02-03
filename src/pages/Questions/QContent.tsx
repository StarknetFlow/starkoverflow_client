import React, { useState } from 'react'
import { IDBQuestion } from '../../redux/types'
import { splitContent } from '../../utils/splitContent'
import MyEditor from '../../components/CodeEditor'


interface QContentProps {
    content: string
}

export type IContent = [
    {
        type: "paragraph" | "code"
        content: string
    }
]



export default function QContentRenderer(props: QContentProps) {

    const [content, setContent] = useState(splitContent(props.content))


    return (
        <div>
            {content.map((cntnt, i) => (cntnt.type === "paragraph" ? (<p>{cntnt.content}</p>) : (<MyEditor codeBlock={cntnt.content} />)
            ))}
        </div>
    )
}
