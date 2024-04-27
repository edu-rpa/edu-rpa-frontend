import React, { useState, ChangeEvent } from 'react';
import { Box, Input, Text } from '@chakra-ui/react';

interface TextAutoCompleteProps {
  type: string;
  value: string;
  placeholder?: string;
  onChange: (newValue: string) => void;
  recommendedWords: string[];
}

const TextAutoComplete = (props: TextAutoCompleteProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    props.onChange(newValue);
    setIsDropdownOpen(false);
  };

  const handleSelectWord = (varName: string, varType: string) => {
    let prefix = '${';
    let suffix = '}';
    if (varType === 'list') {
      prefix = '@{';
    }
    if (varType === 'dictionary') {
      prefix = '&{';
    }
    props.onChange(`${prefix}${varName}${suffix}`);
    setIsDropdownOpen(false);
  };

  return (
    <Box position="relative">
      <Input
        type={props.type || 'text'}
        value={props.value}
        onChange={handleInputChange}
        onFocus={() => {
          setIsDropdownOpen(true);
        }}
        placeholder={props.placeholder || 'Type or select variables'}
      />
      {isDropdownOpen &&
        props.recommendedWords &&
        props.recommendedWords.length > 0 && (
          <Box
            position="absolute"
            top="100%"
            left={0}
            right={0}
            bg="white"
            boxShadow="lg"
            borderRadius="4px"
            border="1px solid #E2E8F0"
            zIndex={1}>
            {props.recommendedWords.map((word) => (
              <Text
                key={word[0]}
                onClick={() => handleSelectWord(word[0], word[1])}
                p={2}
                _hover={{ bg: 'gray.100' }}
                cursor="pointer"
                fontSize="md"
                fontWeight="normal"
                color="black">
                {word[0]}
              </Text>
            ))}
          </Box>
        )}
    </Box>
  );
};

export default TextAutoComplete;
