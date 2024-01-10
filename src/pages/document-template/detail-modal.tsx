import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { SaveDocumentTemplateDto } from "@/dtos/documentTemplateDto";
import { DocumentTemplate, DocumentTemplateDetail } from "@/interfaces/document-template";
import { DocumentTemplateType } from "@/interfaces/enums/document-template-type"
import { Rectangle } from "@/types/boundingBox";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  ModalFooter,
  Button,
  Input,
  Box
} from "@chakra-ui/react"
import { useState } from "react";

const documentTemplateDetail: DocumentTemplateDetail = {
  _id: '1',
  dataTemplate: [
    {
      left: 100,
      top: 100,
      right: 200,
      bottom: 200,
      label: 'Label 1',
    },
    {
      left: 300,
      top: 300,
      right: 400,
      bottom: 400,
      label: 'Label 2',
    },
  ],
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  documentTemplate?: DocumentTemplate;
  handleSaveDocumentTemplate: (saveDocumentTemplateDto: SaveDocumentTemplateDto) => void;
}

const DetailDocumentTemplateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  documentTemplate,
  handleSaveDocumentTemplate,
}) => {
  const [imageUrl, setImageUrl] = useState<string>('https://picsum.photos/600/800');
  const [rectangles, setRectangles] = useState<Rectangle[]>(documentTemplateDetail.dataTemplate);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{documentTemplate?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
              </Box>
            </FormControl>

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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleSaveDocumentTemplate({
                dataTemplate: rectangles,
              })}>
              Save
            </Button>
            <Button onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default DetailDocumentTemplateModal;