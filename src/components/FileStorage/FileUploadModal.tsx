import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
  Button,
  Input
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { uploadFile } from "@/apis/fileStorageApi";

interface Props {
  isOpen: boolean;
  path: string;
  onClose: () => void;
}

const MAX_FILE_SIZE = 1024 * 1024 * 100; // 100MB

const FileUploadModal: React.FC<Props> = ({
  isOpen,
  path,
  onClose,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean[]>([]);

  const handleUploadFiles = () => {
    setIsUploading(files.map(() => true));
    Promise.all(files.map((file) => {
      return uploadFile(path, file);
    }))
      .then(() => {
        setFiles([]);
        onClose();
      })
      .finally(() => {
        setIsUploading(files.map(() => false));
      });
  };

  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files || []);
      const isFileSizeValid = selectedFiles.every((file) => file.size <= MAX_FILE_SIZE);
      if (!isFileSizeValid) {
        alert(`The maximum file size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`);
        return;
      }
      setFiles([...files, ...selectedFiles]);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload files</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          The maximum file size is 100MB.
          <FormControl>
            <FormLabel>Files</FormLabel>
            <Input
              type="file"
              multiple
              onChange={handleSelectFiles}
            />
          </FormControl>
          {files.map((file, index) => (
            <div key={index} className='flex flex-start gap-[10px]'>
              {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              <Button
                size='sm'
                colorScheme='red'
                variant='outline'
                disabled={isUploading[index]}
                isLoading={isUploading[index]}
                onClick={() => {
                  setFiles(files.filter((_, i) => i !== index));
                }}
              >
                Remove
              </Button>
            </div>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            disabled={!files.length || isUploading.some((isUploading) => isUploading)}
            isLoading={isUploading.some((isUploading) => isUploading)}
            onClick={handleUploadFiles}>
            Upload
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FileUploadModal;