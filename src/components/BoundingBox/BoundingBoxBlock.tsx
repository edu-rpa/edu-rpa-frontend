import BoundingBox from '@/components/BoundingBox/BoundingBox';
import React, { useState } from 'react';
import SampleImage from '@/assets/images/sample.png';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  FormLabel,
  Input,
  Box,
  FormControl,
} from '@chakra-ui/react';
import { Rectangle } from '@/types/boundingBox';

export default function BoundingBoxBlock() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [imageUrl, setImageUrl] = useState('');
  const [editedImageUrl, setEditedImageUrl] = useState('');

  const handleNewRectangle = (newRect: Rectangle | Rectangle[]) => {
    if (Array.isArray(newRect)) {
      setRectangles(newRect);
    } else {
      setRectangles([...rectangles, newRect]);
    }
  };
  const handleDeleteRectangle = (index: number) => {
    const updatedRectangles = rectangles.filter((_, i) => i !== index);
    setRectangles(updatedRectangles);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
        onOpen();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageEditing = () => {
    setEditedImageUrl(imageUrl);
    onOpen();
  };

  const formatBoundingBox = (rectangles: Rectangle[]) => {
    return rectangles.map((rect) => [
      rect.top,
      rect.left,
      rect.bottom,
      rect.right,
    ]);
  };

  return (
    <div>
      <FormControl>
        <Box className="flex justify-between">
          <Box
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            className="my-[10px]">
            <Input
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              p={2}
              variant="unstyled"
            />
          </Box>
          <Button
            colorScheme="teal"
            size="md"
            className="m-[10px]"
            onClick={handleImageEditing}>
            Edit Image
          </Button>
        </Box>
      </FormControl>
      <FormControl>
        <FormLabel>Bounding Box Value</FormLabel>
        <Input
          type="text"
          value={JSON.stringify(formatBoundingBox(rectangles))}
        />
      </FormControl>

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Image Annotation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {imageUrl && (
              <BoundingBox
                imageUrl={imageUrl}
                rectangles={rectangles}
                onNewRectangle={handleNewRectangle}
              />
            )}
            <ul>
              {rectangles.map((rect, index) => (
                <li key={index}>
                  {rect.label || 'Label'}: [Left: {rect.left.toFixed(2)}, Right:{' '}
                  {rect.right.toFixed(2)}, Top: {rect.top.toFixed(2)}, Bottom:{' '}
                  {rect.bottom.toFixed(2)}]
                  <Button
                    colorScheme="teal"
                    size="md"
                    className="m-[10px]"
                    onClick={() => handleDeleteRectangle(index)}>
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
