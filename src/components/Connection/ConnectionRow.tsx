import connectionApi from '@/apis/connectionApi';
import { providerData } from '@/constants/providerData';
import { Connection } from '@/interfaces/connection';
import { userSelector } from '@/redux/selector';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Td,
  Text,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IoDocumentText } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import IconImage from '../IconImage/IconImage';
import { DeleteIcon, RepeatIcon } from '@chakra-ui/icons';
import { useMutation } from '@tanstack/react-query';
import { ActivateConnectionDto } from '@/dtos/connectionDto';
import { useRouter } from 'next/router';

interface ConnectionRowProps {
  data: Connection;
  robotKey?: string;
  onView?: (connectionKey: string, provider: string, name: string) => void;
  onSelectedForRemove: (provider: string, name: string) => void;
}

const ConnectionRow = (props: ConnectionRowProps) => {
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [status, setStatus] = useState('Connected');
  const user = useSelector(userSelector);
  const { connectionKey, userId, isActivate, ...data } = props.data;

  const handleRefreshConnection = async () => {
    setIsLoadingRefresh(true);
    try {
      await connectionApi.refreshConnection(data.provider, data.name);
      setStatus('Connected');
    } catch (error) {
      setStatus('Disconnected');
    }
    setIsLoadingRefresh(false);
  };

  const handleReconnect = async () => {
    const provider = providerData.find(
      (provider) => provider.name === data.provider
    );
    if (provider) {
      window.open(
        `${process.env.NEXT_PUBLIC_DEV_API}/auth/${provider.slug}?fromUser=${user.id}&reconnect=true`,
        '_blank'
      );
    }
  };

  useEffect(() => {
    handleRefreshConnection();
  }, []);

  const renderTableCell = (type: string, value: string) => {
    switch (type) {
      case 'status':
        return (
          <Tag
            colorScheme={value === 'Connected' ? 'green' : 'red'}
            size="md"
            p={3}
            rounded={10}>
            {value}
          </Tag>
        );
      case 'type':
        return (
          <Box className="flex justify-between">
            <Box className="flex justify-between">
              <IoDocumentText
                size="20px"
                className="hover:opacity-80 hover:cursor-pointer"
              />
              <Text className="text-[16px] ml-[10px]">{value}</Text>
            </Box>
            <Box></Box>
          </Box>
        );
      case 'provider':
        const provider = providerData.find(
          (provider) => provider.name === value
        );
        return (
          <Box className="flex justify-between items-center">
            <IconImage icon={provider!.icon} label={provider!.name} />
          </Box>
        );
      default:
        return <Text>{value}</Text>;
    }
  };

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleToggleActivateConnection = useMutation({
    mutationFn: async (payload: ActivateConnectionDto) => {
      return await connectionApi.activateConnection(props.robotKey, payload);
    },
    onSuccess: () => {
      router.reload();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleActivate = (e: any) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <Tr
      _hover={{
        bg: '#4FD1C5',
        cursor: 'pointer',
        color: 'white',
        borderRadius: '15px',
      }}
      onClick={() =>
        props.onView && props.onView(connectionKey, data.provider, data.name)
      }>
      {Object.keys(data).map((key, columnIndex) => (
        <Td key={key}>{renderTableCell(key, data[key])}</Td>
      ))}
      <Td>
        {isLoadingRefresh ? (
          <Button
            isLoading
            loadingText="Refreshing"
            colorScheme="teal"
            variant="outline"
            size="sm"
            onClick={handleRefreshConnection}>
            Refresh
          </Button>
        ) : (
          <Tag
            colorScheme={status === 'Connected' ? 'green' : 'red'}
            size="md"
            p={3}
            rounded={10}>
            {status}
          </Tag>
        )}
      </Td>
      <Td>
        {isActivate !== undefined ? (
          <Box>
            {' '}
            <Button
              colorScheme={isActivate ? 'green' : 'red'}
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleActivate}>
              {isActivate ? 'Activated' : 'Inactivated'}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {isActivate ? 'Inactivate Robot' : 'Activate Robot'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    {isActivate
                      ? 'Are you sure you want to inactivate robot?'
                      : 'Are you sure you want to activate robot?'}
                  </Text>
                </ModalBody>
                <ModalFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme={isActivate ? 'red' : 'teal'}
                    onClick={() => {
                      handleToggleActivateConnection.mutate({
                        connectionKey: connectionKey,
                        status: !isActivate,
                      });
                      onClose();
                    }}>
                    {isActivate ? 'Inactivate' : 'Activate'}
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
        ) : (
          <HStack spacing={2}>
            <Box>
              <IconButton
                bg="white"
                aria-label="Delete item"
                onClick={(e) => {
                  e.stopPropagation();
                  props.onSelectedForRemove(data.provider, data.name);
                }}
                icon={<DeleteIcon color="#319795" />}
              />
            </Box>
            <Box>
              <IconButton
                bg="white"
                aria-label="View code"
                icon={<RepeatIcon color="#319795" />}
                onClick={(e) => {
                  e.stopPropagation();
                  handleReconnect();
                }}
              />
            </Box>
          </HStack>
        )}
      </Td>
    </Tr>
  );
};

export default ConnectionRow;
