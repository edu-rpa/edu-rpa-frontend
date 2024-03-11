import IconImage from '@/components/IconImage/IconImage';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { providerData } from '@/constants/providerData';
import { userSelector } from '@/redux/selector';
import { useSelector } from 'react-redux';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateNewConnectionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const user = useSelector(userSelector);

  const handleCreateNewConnection = (slug: string) => {
    window.open(
      `${process.env.NEXT_PUBLIC_DEV_API}/auth/${slug}?fromUser=${user.id}`,
      '_self'
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new connection</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <div className="grid grid-cols-3 gap-[15px]">
            {providerData.map((provider) => (
              <div
                key={provider.name}
                className="flex flex-col items-center justify-center">
                <IconImage
                  icon={provider.icon}
                  label={provider.name}
                  onClick={() => handleCreateNewConnection(provider.slug)}
                />
              </div>
            ))}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateNewConnectionModal;
