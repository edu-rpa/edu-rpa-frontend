import React from 'react';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { SearchIcon, RepeatIcon } from '@chakra-ui/icons';

const RefetchBar = ({
  selectedLogStream,
  setSelectedLogStream,
  logStreams,
  handleRefetch,
}) => {
  return (
    <Box className="flex justify-between my-5">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.500" />
        </InputLeftElement>
        <Input bg="white.300" type="text" placeholder="Search..." />
      </InputGroup>
      <Select
        size="md"
        className="mx-3"
        value={selectedLogStream}
        onChange={(e) => setSelectedLogStream(e.target.value)}>
        {logStreams?.length > 0 &&
          logStreams.map((stream) => (
            <option key={stream.logStreamName} value={stream.logStreamName}>
              {new Date(stream.lastEventTime).toLocaleString()}
            </option>
          ))}
      </Select>
      <IconButton
        aria-label="Refresh"
        icon={<RepeatIcon />}
        onClick={handleRefetch}
        className="ml-5"
      />
    </Box>
  );
};

export default RefetchBar;
