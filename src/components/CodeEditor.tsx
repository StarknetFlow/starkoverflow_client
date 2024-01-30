import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Highlight, themes } from "prism-react-renderer"

interface CodeEditorProps {
  codeBlock: string
}

const MyEditor = (props: CodeEditorProps) => {

  const codeBlock = ``

  const customStyles = {
    maxHeight: '300px',
    overflowY: 'auto',
    overflowX: 'auto',
  };

  return (
    <div >
      <Highlight
        theme={themes.okaidia}
        code={props.codeBlock}
        language='jsx'

      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre style={{ ...style, fontSize: "13px", maxHeight: '500px', overflowY: 'auto', overflowX: 'auto', borderRadius: "10px" }}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {/* <span>{i + 1}</span> */}
                {line.map((token, key) => {
                  return (

                    <span
                      key={key}
                      {...getTokenProps({
                        token,
                        className: token.types.filter(type => type !== 'tag').join(' '),
                      })}
                    />
                  )
                })}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>

  );
};

export default MyEditor;
