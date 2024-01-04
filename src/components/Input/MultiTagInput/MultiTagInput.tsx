import React, { useState } from 'react';
import { Input, Tag, TagLabel, TagCloseButton, Flex } from '@chakra-ui/react';

function MultipleInvitationInput() {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleTagClose = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(updatedTags);
    setInputValue(updatedTags.join(', '));
  };

  return (
    <div className="my-[30px]">
      <Input
        placeholder="Add email addresses..."
        onBlur={() => setInputValue(tags.join(', '))}
        onFocus={() => setInputValue('')}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <Flex flexWrap="wrap">
        {tags.map((tag) => (
          <Tag key={tag} size="md" m={1}>
            <TagLabel>{tag}</TagLabel>
            <TagCloseButton onClick={() => handleTagClose(tag)} />
          </Tag>
        ))}
      </Flex>
    </div>
  );
}

export default MultipleInvitationInput;
