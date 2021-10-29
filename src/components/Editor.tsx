import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

interface Props{
  id:string,
  content:string,
}

const Editor = ({id, content}:Props)=>{


    return(
      <MonacoEditor
        //editorDidMount={onEditorDidMount}
        value={content}
        theme="vs-dark"
        language="typescript"
        height="90%"
        path={id}
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    )
}

export default Editor;