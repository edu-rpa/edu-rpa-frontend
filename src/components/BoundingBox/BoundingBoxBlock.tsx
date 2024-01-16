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
  FormLabel,
  Input,
  Box,
  FormControl,
} from '@chakra-ui/react';
import { Rectangle } from '@/types/boundingBox';

interface BoundingBoxBlockProps {
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  rectangles: Rectangle[];
  setRectangles: React.Dispatch<React.SetStateAction<Rectangle[]>>;
}

export default function BoundingBoxBlock({
  rectangles,
  setRectangles,
  imageUrl,
  setImageUrl,
}: BoundingBoxBlockProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editedImageUrl, setEditedImageUrl] = useState('');

  const handleNewRectangle = (newRect: Rectangle | Rectangle[]) => {
    if (Array.isArray(newRect)) {
      setRectangles(
        newRect.map((rect) => ({
          ...rect,
          left: Math.min(rect.left, rect.right),
          top: Math.min(rect.top, rect.bottom),
          right: Math.max(rect.left, rect.right),
          bottom: Math.max(rect.top, rect.bottom),
        }))
      );
    } else {
      setRectangles([
        ...rectangles,
        {
          ...newRect,
          left: Math.min(newRect.left, newRect.right),
          top: Math.min(newRect.top, newRect.bottom),
          right: Math.max(newRect.left, newRect.right),
          bottom: Math.max(newRect.top, newRect.bottom),
        },
      ]);
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

  return (
    <div>
      <FormControl>
        <Box className="flex justify-between">
          <Box
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            className="my-[5px]">
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

      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
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
                  {rect.label || 'Label'}: [Left: {rect.left.toFixed(2)}, Top:{' '}
                  {rect.top.toFixed(2)}, Right: {rect.right.toFixed(2)}, Bottom:{' '}
                  {rect.bottom.toFixed(2)}]
                  <Button
                    colorScheme="red"
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
            <Button
              colorScheme="teal"
              variant="outline"
              mr={3}
              onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
