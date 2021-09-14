import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

interface Props{
  id:string,
}

const Editor = ()=>{


    return(
      <MonacoEditor
        //editorDidMount={onEditorDidMount}
        value={'initialValue'}
        theme="vs-dark"
        language="javascript"
        height="90%"
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