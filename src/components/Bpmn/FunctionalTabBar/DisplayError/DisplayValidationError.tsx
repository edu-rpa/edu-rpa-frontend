import React from 'react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const RobotExecutionComponent = ({ data }) => {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Robot Execution Details
      </Heading>
      {/* <Text>User ID: {data.userId}</Text>
      <Text>Process ID Version: {data.processIdVersion}</Text>
      <Text>UUID: {data.uuid}</Text> */}
      <Box mt={4}>
        <Heading as="h3" size="md" mb={2}>
          Robot Detail
        </Heading>
        <Text>Failed: {data.robotDetail.stats.failed}</Text>
        <Text>Passed: {data.robotDetail.stats.passed}</Text>
        <Text>Error: {data.robotDetail.errors.error ? 'Yes' : 'No'}</Text>
        <Text>Error Message: {data.robotDetail.errors.message}</Text>
      </Box>
      <Box mt={4}>
        <Heading as="h3" size="md" mb={2}>
          Run Details
        </Heading>
        <Box maxHeight="400px" overflowY="auto">
          <Table variant="simple" minWidth="100%">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Keyword Name</Th>
                <Th>Status</Th>
                <Th>Start Time</Th>
                <Th>End Time</Th>
                <Th>Messages</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.robotDetail.run.map((run, index) => (
                <Tr key={index}>
                  <Td>{run.id}</Td>
                  <Td>{run.kw_name}</Td>
                  <Td>{run.kw_status}</Td>
                  <Td>{run.start_time}</Td>
                  <Td>{run.end_time}</Td>
                  <Td>{run.messages}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
      <Box mt={4}>
        <Heading as="h3" size="md" mb={2}>
          Time Result
        </Heading>
        <Text>Start Time: {data.time_result.starttime}</Text>
        <Text>End Time: {data.time_result.endtime}</Text>
        <Text>Elapsed Time: {data.time_result.elapsed_time}</Text>
      </Box>
    </Box>
  );
};

export default RobotExecutionComponent;
