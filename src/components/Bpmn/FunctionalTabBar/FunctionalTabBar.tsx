import { useSaveShortcut } from '@/hooks/useSaveShortCut';
import {
  Button,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { FaPlay, FaSave } from 'react-icons/fa';
import { IoMdShare } from 'react-icons/io';
import { MdPublish } from 'react-icons/md';
import { ShareWithModal } from './ShareWithModal';
import { PublishRobotModal } from './PublishRobotModal';

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
          ? <PublishRobotModal {...props} onClose={onClose} /> 
          : <ShareWithModal onClose={onClose} processID={props.processID} />}
      </Modal>
    </Stack>
  );
}
