import CustomTable from '@/components/CustomTable/CustomTable';
import React, { useRef } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import TemplateCard from '@/components/TemplateCard/TemplateCard';

export default function Studio() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  return (
    <div>
      <div className="bg-white w-[75vw] rounded-[15px] py-[30px]">
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Process List
        </h1>
        <div className="flex justify-between w-90 mx-auto my-[30px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              width="45vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
          </InputGroup>
          <div className="flex justify-between gap-[10px]">
            <Button colorScheme="teal" onClick={onOpen}>
              New Process
            </Button>
            <Button variant="outline" colorScheme="teal">
              Import Process
            </Button>
          </div>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new process</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Process name</FormLabel>
                  <Input ref={initialRef} placeholder="Process name" />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div className="w-90 m-auto">
          <CustomTable />
        </div>
      </div>
      <div className="bg-white w-[75vw] rounded-[15px] py-[30px] mt-[30px]">
        <h1 className="px-[20px] ml-[30px] font-bold text-2xl text-[#319795]">
          Select from our templates
        </h1>
        <div className="grid grid-cols-3 gap-[15px] w-90 m-auto">
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
          <TemplateCard />
        </div>
      </div>
    </div>
  );
}
