import React from 'react';
//@ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//@ts-ignore
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Box } from '@chakra-ui/react';

const supportedLanguages: Record<string, string> = {
  json: 'json',
  robot: 'robot',
};

const getLanguage = (language: string): string =>
  supportedLanguages[language] || 'plaintext';

interface CodeViewerProps {
  code: string;
  language: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, language }) => {
  const highlightedLanguage = getLanguage(language);

  return (
    <Box p={4} borderRadius="md" bg="#4FD1C5" boxShadow="md" overflow="hidden">
      <SyntaxHighlighter language={highlightedLanguage} style={oneLight}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeViewer;
