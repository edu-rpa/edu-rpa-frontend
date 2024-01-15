import TextAutoComplete from '@/components/Input/AutoComplete/TextAutoComplete';
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
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { FaPlay, FaSave } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
import { MdPublish } from 'react-icons/md';

interface FunctionalTabBarProps {
  processID: string;
  genRobotCode: any;
  onSaveAll: any;
}

export default function FunctionalTabBar(props: FunctionalTabBarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setType] = useState('publish');

  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef(null);

  const handlePublish = async () => {
    try {
      const robotName = initialRef.current?.value ?? '';
      const robotCode = await props.genRobotCode(props.processID);

      const publishPayload = {
        robotName,
        processID: props.processID,
        robotCode: JSON.stringify(robotCode),
      };
      console.log('Publish', publishPayload);
    } catch (error) {
      console.error('Error in publishing:', error);
    }
  };

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
          <Button
            colorScheme="teal"
            mr={3}
            onClick={async () => {
              if (modalType === 'publish') {
                await handlePublish();
              }
            }}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    );
  };

  const ShareRobotModal = () => {
    return (
      <ModalContent>
        <ModalHeader>Share with people</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <TextAutoComplete
            type="text"
            value={''}
            placeholder="Share with emails"
            onChange={() => {}}
            recommendedWords={[
              'an.nguyenduc1406@hcmut.edu.vn',
              'vinh.huynhdavid2002@hcmut.edu.vn',
              'khanh.nguyenqk09@hcmut.edu.vn',
            ]}
          />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="teal" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
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
        {modalType == 'publish' ? <PublishRobotModal /> : <ShareRobotModal />}
      </Modal>
    </Stack>
  );
}
