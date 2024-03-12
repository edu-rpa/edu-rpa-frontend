import robotApi from '@/apis/robotApi';
import TextAutoComplete from '@/components/Input/AutoComplete/TextAutoComplete';
import LoadingIndicator from '@/components/LoadingIndicator/LoadingIndicator';
import { CreateRobotDto } from '@/dtos/robotDto';
import { useSaveShortcut } from '@/hooks/useSaveShortCut';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { FaPlay, FaSave } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
import { MdPublish } from 'react-icons/md';
import { ShareWithModal } from './ShareWithModal';

interface FunctionalTabBarProps {
  processID: string;
  genRobotCode: any;
  onSaveAll: any;
}

export default function FunctionalTabBar(props: FunctionalTabBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setType] = useState('publish');
  // Ctrl + S for save
  useSaveShortcut(props.onSaveAll);

  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const router = useRouter();

  const handleCreateRobotWithApi = useMutation({
    mutationFn: async (payload: CreateRobotDto) => {
      return await robotApi.createRobot(payload);
    },
    onSuccess: () => {
      toast({
        title: 'Create robot successfully!',
        status: 'success',
        position: 'top-right',
        duration: 1000,
        isClosable: true,
      });
      router.push('/robot');
    },
    onError: () => {},
  });

  const handlePublish = async () => {
    try {
      const robotName = initialRef.current?.value ?? '';
      const robotCode = await props.genRobotCode(props.processID);

      const publishPayload = {
        name: robotName,
        processId: props.processID as string,
        code: JSON.stringify(robotCode),
      };
      handleCreateRobotWithApi.mutate(publishPayload);
    } catch (error) {
      console.error('Error in publishing:', error);
    }
  };

  if (handleCreateRobotWithApi.isPending) {
    return <LoadingIndicator />;
  }

  const PublishRobotModal = () => {
    return (
      <ModalContent>
        <ModalHeader>Publish Robot</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Robot name</FormLabel>
            <Input ref={initialRef} placeholder="Your robot name" />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Process ID</FormLabel>
            <Input
              placeholder="Last name"
              disabled={true}
              backgroundColor="gray.200"
              value={props.processID}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} colorScheme="teal" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="teal"
            onClick={async () => {
              if (modalType === 'publish') {
                await handlePublish();
              }
            }}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    );
  };

  return (
    <Stack direction="row" spacing={4}>
      <Button
        leftIcon={<FaSave />}
        colorScheme="blue"
        variant="solid"
        onClick={props.onSaveAll}>
        Save All
      </Button>
      <Button leftIcon={<FaPlay />} colorScheme="teal" variant="solid">
        Run
      </Button>
      <Button
        leftIcon={<MdPublish />}
        onClick={() => {
          onOpen();
          setType('publish');
        }}
        colorScheme="orange"
        variant="solid">
        Publish
      </Button>
      <Button
        leftIcon={<IoMdShare />}
        onClick={() => {
          onOpen();
          setType('share');
        }}
        colorScheme="red"
        variant="solid">
        Share
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        {modalType == 'publish' 
          ? <PublishRobotModal /> 
          : <ShareWithModal onClose={onClose} processID={props.processID} />}
      </Modal>
    </Stack>
  );
}
