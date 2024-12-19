'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, X } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';

const languageExtensions = {
  python: [python()],
  javascript: [javascript()],
  c: [cpp()],
  cpp: [cpp()],
  java: [java()],
};

const languageTemplates = {
  python: `# Python Code
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
  javascript: `// JavaScript Code
function main() {
    console.log("Hello, World!");
}

main();`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`
};

export default function CodeEditorPage() {
  const [language, setLanguage] = useState('python');
  const [theme, setTheme] = useState('light');
  const [code, setCode] = useState(languageTemplates.python);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef(null);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      const response = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          language,
          code,
        }),
      });

      const result = await response.json();
      setOutput(result.output || result.error || 'Code executed successfully');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const clearEditor = () => {
    setCode(languageTemplates[language]);
    setOutput('');
  };

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    setCode(languageTemplates[newLanguage]);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Code Editor</h1>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 border rounded-lg p-4 bg-gray-100">
          <h2 className="text-lg font-semibold mb-4">Questions</h2>
          <ul className="space-y-2">
            {/* Add your questions here */}
          </ul>
        </div>

        <div className="md:w-2/3">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label htmlFor="language-select" className="text-sm font-medium">
                  Language:
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={handleLanguageChange}
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
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <CodeMirror
                value={code}
                height="400px"
                theme={theme}
                extensions={languageExtensions[language] || []}
                onChange={(value) => setCode(value)}
                className="text-sm"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isRunning ? (
                  <svg
                    className="animate-spin mr-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <Play className="mr-2" size={20} />
                )}
                Run Code
              </button>

              <button
                onClick={clearEditor}
                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
        </div>
      </div>
    </div>
  );
}
