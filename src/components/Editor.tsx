import React from 'react';
import MonacoEditor, { OnChange } from '@monaco-editor/react';

interface Props {
  id: string,
  content: string,
  onChange: OnChange
}

const Editor = ({ id, content, onChange }: Props) => {

  return (
    <MonacoEditor
      //editorDidMount={onEditorDidMount}
      value={content}
      onChange={onChange}
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