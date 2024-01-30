import React, { useState } from 'react'
import MyEditor from '../../components/CodeEditor'
import { codeSample3 } from './codeSamples'

export default function Answers() {

    const [paragraphs, setParagraphs] = useState<string[]>(["I've been trying to set up SSR with react. The console is throwing a bunch of errors, the first one of which is the warning from the title, and then it defaults to CSR. I am not using NextJS, just express, ejs, node, and react. My setup is as follows:", "My server.jsx file, which handles the GET request, renders the component to html, inserts it into my html with ejs, and sends it to the client"])


    return (
        <div className='answer'>
            <hr />
            {paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <MyEditor codeBlock={codeSample3} />
        </div>
    )
}
