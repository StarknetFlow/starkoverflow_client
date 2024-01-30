import React, { ChangeEvent, useState } from 'react'

interface QAInputAreaProps {
    height: string
    getValue: (val: string) => void
}

export default function QAInputArea(props: QAInputAreaProps) {

    const [value, setValue] = useState<string>("")

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(`${e.currentTarget.value}`)
        props.getValue(`${e.currentTarget.value}`)
    }

    const addCode = () => {
        const codeBlock = '```\n enter code here \n```';



        const textarea = document.getElementById('qa-textarea') as HTMLTextAreaElement | null;

        if (textarea) {
            let newValue = value + codeBlock
            setValue(newValue)

            setTimeout(() => {
                const endPosition = newValue.lastIndexOf('```')
                newValue = newValue.substring(0, endPosition)
                const startPosition = newValue.lastIndexOf('```') + 4
                if (startPosition !== -1 && endPosition !== -1) {
                    textarea.focus()
                    textarea.setSelectionRange(startPosition, endPosition);

                }
            }, 0);


        }
    }


    return (
        <div className='qa-input-area-container'>
            <div className='input-config-area'>
                <div className='tools '>
                    <div className='tool my-auto' onClick={addCode}>
                        <i className="fa-solid fa-code" />
                    </div>
                    <div className='tool my-auto'>
                        <i className="fa-solid fa-image" />
                    </div>
                    <div className='tool my-auto'>
                        <i className="fa-solid fa-link" />
                    </div>
                </div>

            </div>
            <textarea
                id='qa-textarea'
                className='form-control input-area'
                style={{ height: props.height }}
                onChange={handleInputChange}
                value={value}
            />
        </div>
    )
}
