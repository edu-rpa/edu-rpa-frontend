import {
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  IconButton,
  Text,
  useToast,
} from "@chakra-ui/react";
import processApi from "@/apis/processApi";
import { useState, useEffect } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { toastSuccess, toastError } from "@/utils/common";
import { getProcessFromLocalStorage } from "@/utils/processService";

const removableChipStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '5px 10px',
  borderRadius: '5px',
  backgroundColor: '#f0f0f0',
  width: '100%',
  marginBottom: '10px',
};

interface ShareWithModalProps {
  processID: string;
  onClose: () => void;
}

export const ShareWithModal = ({
  onClose,
  processID,
}: ShareWithModalProps) => {
  const process = getProcessFromLocalStorage(processID);
  const [email, setEmail] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const [shared, setShared] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const getSharedToOfProcess = async () => {
    try {
      const res = await processApi.getSharedToOfProcess(processID);
      setShared(res.map((item: any) => item.user.email));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSharedToOfProcess();
  }, []);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter' && email !== '') {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleBlur = () => {
    if (email !== '') {
      setEmails([...emails, email]);
      setEmail('');
    }
  };

  const handleShareProcess = async () => {
    setLoading(true);
    try {
      const res = await processApi.shareProcessToEmails(processID, emails);
      toastSuccess(toast, 'Share process successfully');
      setEmails([]);
    } catch (error) {
      console.log(error);
      toastError(toast, 'Share process failed');
    }
    getSharedToOfProcess();
    setLoading(false);
  }

  return (
    <ModalContent>
      <ModalHeader>Share with people</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        {
          process.sharedByUser
            ? (

              <>
                <Text fontWeight={'bold'}>This process is shared to you by {process.sharedByUser.name}</Text>
                <Text>Only the owner can share this process</Text>
                <Text>Please contact the owner if you want to share this process to other people</Text>
              </>

            ) : <>

              <Text fontWeight={'bold'}>Shared</Text>
              {shared.length === 0 ? (
                <Text>You have not shared this process with anyone</Text>
              ) : (
                shared.map((email, index) => (
                  <div key={index}> {email} </div>
                ))
              )}
              <FormControl>
                <FormLabel>Emails</FormLabel>
                Press Enter to add email
                <Input
                  placeholder="Emails"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleBlur}
                />
                {emails.map((email, index) => (
                  <div
                    key={index}
                    style={removableChipStyle}
                  >
                    {email}
                    <IconButton
                      isRound={true}
                      variant='solid'
                      colorScheme='gray'
                      aria-label='Remove email'
                      fontSize='20px'
                      icon={<CloseIcon />}
                      onClick={() => {
                        setEmails(emails.filter((e) => e !== email));
                      }}
                    />
                  </div>
                ))}
              </FormControl>

            </>
        }
      </ModalBody>

      <ModalFooter>
        {process.sharedByUser !== null || <Button
          mr={3}
          colorScheme="teal"
          onClick={handleShareProcess}
          isLoading={loading}
          disabled={emails.length === 0}
        >
          Share
        </Button>}
        <Button colorScheme="teal" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};