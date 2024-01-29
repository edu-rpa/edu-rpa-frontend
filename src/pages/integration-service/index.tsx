import { formatDate } from '@/utils/common';
import React, { useRef, useState } from 'react';
import connectionData from '../../constants/serviceData';
import SidebarContent from '@/components/Sidebar/SidebarContent/SidebarContent';
import {
  Box,
  Button,
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
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CustomTable from '@/components/CustomTable/CustomTable';
import { useRouter } from 'next/router';
import GoogleDriveIcon from '@/assets/images/services/icons8-google-drive-96.png';
import GmailIcon from '@/assets/images/services/icons8-gmail-96.png';
import GoogleSheetIcon from '@/assets/images/services/icons8-google-sheets-96.png';
import ConditionIcon from '@/assets/images/services/icons8-rule-64.png';
import LoopIcon from '@/assets/images/services/icons8-repeat-100.png';
import NavigationIcon from '@/assets/images/services/icons8-navigation-100-2.png';
import BrowserEventIcon from '@/assets/images/services/icons8-search-in-browser-100.png';
import TextExtractionIcon from '@/assets/images/services/icons8-image-100.png';
import IconImage from '@/components/IconImage/IconImage';

export default function Service() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const [selectFilter, setSelectFilter] = useState('all');
  const tableProps = {
    header: ['Service', 'Connection ID', 'Owner', 'Last Modified', 'Status'],
    data: connectionData,
  };
  const handleViewService = (serviceID: string) => {
    router.push(`/service/detail/${serviceID}`);
  };

  const servicesIcon = [
    { label: 'Google Drive', icon: GoogleDriveIcon },
    { label: 'Gmail', icon: GmailIcon },
    { label: 'Google Sheet', icon: GoogleSheetIcon },
    { label: 'Condition', icon: ConditionIcon },
    { label: 'Loop', icon: LoopIcon },
    { label: 'Navigation', icon: NavigationIcon },
    { label: 'Browser Event', icon: BrowserEventIcon },
    { label: 'Text Extraction', icon: TextExtractionIcon },
  ];

  return (
    <div className="mb-[200px]">
      <SidebarContent>
        <h1 className="px-[20px] ml-[35px] font-bold text-2xl text-[#319795]">
          Connection List
        </h1>
        <div className="flex justify-between w-90 mx-auto my-[30px]">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              width="40vw"
              bg="white.300"
              type="text"
              placeholder="Search..."
            />
            <Box className="w-[15vw] ml-[20px]">
              <Select
                defaultValue="all"
                onChange={(e) => setSelectFilter(e.target.value)}>
                <option value="connected">Connected</option>
                <option value="unconnected">Unconnected</option>
                <option value="all">All</option>
              </Select>
            </Box>
          </InputGroup>
          <div className="flex justify-between gap-[10px]">
            <Button colorScheme="teal" onClick={onOpen}>
              New Connection
            </Button>
          </div>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create new connection</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <div className="grid grid-cols-3 gap-[15px]">
                  {servicesIcon.map((service) => {
                    return (
                      <div key={service.label}>
                        <IconImage icon={service.icon} label={service.label} />
                      </div>
                    );
                  })}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Create
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>

        <div className="w-90 m-auto">
          <CustomTable
            header={tableProps.header}
            maxRows={5}
            data={tableProps.data}
            onView={handleViewService}
          />
        </div>
      </SidebarContent>
    </div>
  );
}
