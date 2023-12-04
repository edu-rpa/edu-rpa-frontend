import Log from '@/components/Log/Log';
import CodeViewer from '@/components/CodeViewer/CodeViewer';
import React from 'react';
import MultiSelect from '@/components/Input/MultiTagInput/MultiTagInput';

interface LogMessage {
  type: 'success' | 'error';
  text: string;
}

export default function Test() {
  const logMessages: LogMessage[] = [
    { type: 'success', text: 'Compilation completed successfully.' },
    { type: 'error', text: 'Syntax error in line 23.' },
    { type: 'success', text: 'No lint errors found.' },
    { type: 'error', text: 'Missing dependency in package.json.' },
    { type: 'success', text: 'All tests passed.' },
    { type: 'error', text: 'Failed to connect to the database.' },
    { type: 'success', text: 'Deployment successful.' },
    { type: 'error', text: 'Invalid configuration settings.' },
  ];

  const jsonCode = `{
        "key": "value",
        "number": 123
    }`;

  const robotCode = `*** Settings ***
    Library           SeleniumLibrary

    *** Test Cases ***
    My Test Case
        [Documentation]    Example test
        Open Browser    https://www.example.com    chrome`;

  return (
    <div>
      <Log messages={logMessages} />
      <div>
        <CodeViewer code={jsonCode} language="json" />
        <CodeViewer code={robotCode} language="robot" />
      </div>
      <div>
        <MultiSelect />
      </div>
    </div>
  );
}
