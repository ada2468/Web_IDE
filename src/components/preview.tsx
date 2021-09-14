import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const html = `
<html>
  <head>
    <style>html { background-color: white; }</style>
  </head>
  <body>
    <div id="root"><p>123</p></div>
    <script>
      const handleError = (err) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
        console.error(err);
      };

      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });

      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          handleError(err);
        }
      }, false);
    </script>
  </body>
</html>
`;

const Wrapper = styled.div`
  display: flex;
  height:100%;
  width:100%;
`;

const Preview: React.FC = () => {
    const iframe = useRef<any>();

    const code = '';
    const err = null;
  
    useEffect(() => {
      iframe.current.srcdoc = html;
      setTimeout(() => {
        iframe.current.contentWindow.postMessage(code, '*');
      }, 50);
    }, [code]);
  
    return (
        <iframe
          title="preview"
          ref={iframe}
          sandbox="allow-scripts"
          srcDoc={html}
          height={"100%"}
          width={"100%"}
        />
 
    );
  };
  
  export default Preview;