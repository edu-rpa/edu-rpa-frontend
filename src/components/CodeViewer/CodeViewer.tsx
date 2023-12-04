import React from 'react';
//@ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
//@ts-ignore
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Box } from '@chakra-ui/react';

// Define the supported code languages
const supportedLanguages: Record<string, string> = {
  json: 'json',
  robot: 'robot',
};

// Define a function to get the language for syntax highlighting
const getLanguage = (language: string): string =>
  supportedLanguages[language] || 'plaintext';

// Create a component for displaying code snippets
interface CodeViewerProps {
  code: string;
  language: string;
}

const CodeViewer: React.FC<CodeViewerProps> = ({ code, language }) => {
  const highlightedLanguage = getLanguage(language);

  return (
    <Box
      p={4}
      borderRadius="md"
      bgGradient="linear(to-r, teal.100, white)"
      boxShadow="md"
      overflow="hidden">
      <SyntaxHighlighter language={highlightedLanguage} style={oneLight}>
        {code}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeViewer;
