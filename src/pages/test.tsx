import BoundingBox from '@/components/BoundingBox/BoundingBox';
import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { Rectangle } from '@/types/boundingBox';

export default function Test() {
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

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      <Button onClick={handleImageEditing}>Edit Image</Button>
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
