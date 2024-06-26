import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  HStack,
  Tag,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import {
  DeleteIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  RepeatIcon,
} from '@chakra-ui/icons';
import ReactPaginate from 'react-paginate';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import { Robot, TriggerType } from '@/interfaces/robot';
import { toastError, toastSuccess } from '@/utils/common';
import RobotRow from './RobotRow';
import ConfigTriggerModal from './ConfigTriggerModal';
import robotApi from '@/apis/robotApi';
import { useRouter } from 'next/router';

interface RobotTableProps {
  header: string[];
  data: Omit<Robot, 'userId'>[];
  maxRows?: number;
  isLoading?: boolean;
}

const RobotTable = (props: RobotTableProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedForRemove, setSelectedForRemove] = useState({
    userId: 0,
    processId: '',
    processVersion: 0,
    robotKey: '',
  });
  const [selectedForConfigTrigger, setSelectedForConfigTrigger] = useState({
    userId: 0,
    processId: '',
    processVersion: 0,
    triggerType: TriggerType.MANUAL,
  });
  const [isLoading, setIsLoading] = useState(false);
  const robotData = props.data;
  const itemsPerPage = 5;
  const pageCount = Math.ceil(robotData.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = robotData.slice(startIndex, endIndex);
  const toast = useToast();
  const router = useRouter();

  const {
    isOpen: isOpenForRemove,
    onOpen: onOpenForRemove,
    onClose: onCloseForRemove,
  } = useDisclosure();
  const {
    isOpen: isOpenForConfigTrigger,
    onOpen: onOpenForConfigTrigger,
    onClose: onCloseForConfigTrigger,
  } = useDisclosure();

  if (currentData.length == 0) return <Box></Box>;

  if (props.isLoading) {
    return <LoadingIndicator />;
  }

  const handlePageChange = (selected: any) => {
    setCurrentPage(selected.selected);
  };

  const handleRemoveRobot = async (robotKey: string) => {
    setIsLoading(true);
    try {
      await robotApi.deleteRobot(robotKey);
      toastSuccess(toast, 'Robot removed successfully');
    } catch (error) {
      toastError(toast, 'Failed to remove robot');
    }
    setIsLoading(false);
    onCloseForRemove();
    router.reload();
  };

  const handleSelectForRemove = (
    userId: number,
    processId: string,
    processVersion: number,
    robotKey: string
  ) => {
    setSelectedForRemove({ userId, processId, processVersion, robotKey });
    onOpenForRemove();
  };

  const handleSelectForConfigTrigger = (
    userId: number,
    processId: string,
    processVersion: number,
    triggerType: TriggerType
  ) => {
    setSelectedForConfigTrigger({
      userId,
      processId,
      processVersion,
      triggerType,
    });
    onOpenForConfigTrigger();
  };

  return (
    <Box
      border="1px solid"
      borderColor="#319795"
      borderRadius="15px"
      overflow="hidden">
      <Table variant="simple">
        <Thead>
          <Tr>
            {props.header.map((item: string) => (
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {currentData.map((item, index) => (
            <RobotRow
              key={index}
              data={item}
              onSelectedForRemove={handleSelectForRemove}
              onSelectedForConfigTrigger={handleSelectForConfigTrigger}
            />
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpenForRemove} onClose={onCloseForRemove}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation to remove robot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure to remove this robot ?</Text>
            <Text fontWeight={'bold'}>
              Process ID: {selectedForRemove.processId}, Version:{' '}
              {selectedForRemove.processVersion}
            </Text>
            <Text>
              This action will stop the robot if it is running and remove it
              from the system.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onCloseForRemove}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              isLoading={isLoading}
              onClick={() => {
                handleRemoveRobot(selectedForRemove.robotKey);
              }}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <ConfigTriggerModal
        isOpen={isOpenForConfigTrigger}
        onClose={onCloseForConfigTrigger}
        userId={selectedForConfigTrigger.userId}
        processId={selectedForConfigTrigger.processId}
        processVersion={selectedForConfigTrigger.processVersion}
        triggerType={selectedForConfigTrigger.triggerType}
      />

      <ReactPaginate
        previousLabel={
          <IconButton aria-label="Previous">
            <ChevronLeftIcon />
          </IconButton>
        }
        nextLabel={
          <IconButton aria-label="Next">
            <ChevronRightIcon />
          </IconButton>
        }
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'flex justify-end items-center m-4 gap-[5px]'}
        previousLinkClassName={'font-bold'}
        nextLinkClassName={'font-bold'}
        disabledClassName={'opacity-50 cursor-not-allowed'}
        activeClassName={'bg-primary rounded-[5px] text-white py-[8px]'}
        pageLinkClassName={
          'border rounded-[5px] px-[15px] py-[10px] hover:bg-primary hover:text-white'
        }
      />
    </Box>
  );
};

export default RobotTable;
