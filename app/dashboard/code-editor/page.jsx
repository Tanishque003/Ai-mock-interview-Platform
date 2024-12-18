'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, X } from 'lucide-react';

export default function CodeEditorPage() {
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('default');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isCodeMirrorReady, setIsCodeMirrorReady] = useState(false);
  const editorRef = useRef(null);
  const outputRef = useRef(null);
  const codeMirrorRef = useRef(null);

  useEffect(() => {
    // Check if CodeMirror is available
    const initCodeMirror = () => {
      if (window.CodeMirror && editorRef.current && !codeMirrorRef.current) {
        try {
          codeMirrorRef.current = window.CodeMirror.fromTextArea(editorRef.current, {
            mode: language,
            theme: theme === 'default' ? 'default' : theme,
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            autofocus: true,
            extraKeys: {
              'Tab': 'insertSoftTab'
            }
          });

          // Add change event listener to update code state
          codeMirrorRef.current.on('change', (instance) => {
            setCode(instance.getValue());
          });

          setIsCodeMirrorReady(true);
        } catch (error) {
          console.error('Error initializing CodeMirror:', error);
        }
      }
    };

    // If CodeMirror script is not loaded yet, wait for it
    if (!window.CodeMirror) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.62.0/codemirror.min.js';
      script.onload = initCodeMirror;
      document.body.appendChild(script);
    } else {
      initCodeMirror();
    }

    // Cleanup function
    return () => {
      if (codeMirrorRef.current) {
        codeMirrorRef.current.toTextArea();
      }
    };
  }, [language, theme]);

  const runCode = async () => {
    // Ensure we have the latest code from CodeMirror
    if (codeMirrorRef.current) {
      setCode(codeMirrorRef.current.getValue());
    }

    setIsRunning(true);
    setOutput('');

    try {
      // Placeholder for actual code execution logic
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code
        })
      });

      const result = await response.json();
      setOutput(result.output || 'Code executed successfully');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearEditor = () => {
    if (codeMirrorRef.current) {
      codeMirrorRef.current.setValue('');
    }
    setCode('');
    setOutput('');
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Code Editor</h1>
      </header>
      
      <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="language-select" className="text-sm font-medium">
            Language:
          </label>
          <select 
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="form-select px-2 py-1 border rounded"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label htmlFor="theme-select" className="text-sm font-medium">
            Theme:
          </label>
          <select 
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="form-select px-2 py-1 border rounded"
          >
            <option value="default">Default</option>
            <option value="monokai">Monokai</option>
            <option value="dracula">Dracula</option>
          </select>
        </div>
      </div>

      <div className="editor-wrapper mb-4 border rounded-lg overflow-hidden">
        <textarea 
          ref={editorRef} 
          id="code-editor"
          className="hidden"
        />
        {!isCodeMirrorReady && (
          <div className="p-4 text-center text-gray-500">
            Loading code editor...
          </div>
        )}
      </div>

      <div className="flex space-x-4 mb-4">
        <button 
          onClick={runCode} 
          disabled={isRunning || !isCodeMirrorReady}
          className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {isRunning ? (
            <svg className="animate-spin mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <Play className="mr-2" size={20} />
          )}
          Run Code
        </button>
        
        <button 
          onClick={clearEditor}
          disabled={!isCodeMirrorReady}
          className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
        >
          <X className="mr-2" size={20} />
          Clear
        </button>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-2">Output</h3>
        <div 
          ref={outputRef}
          className="bg-gray-100 p-3 rounded max-h-48 overflow-y-auto font-mono text-sm"
        >
          {output || 'Output will appear here...'}
        </div>
      </div>
    </div>
  );
}