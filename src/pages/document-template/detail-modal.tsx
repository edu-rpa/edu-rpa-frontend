import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { SaveDocumentTemplateDto } from "@/dtos/documentTemplateDto";
import { DocumentTemplate, DocumentTemplateDetail } from "@/interfaces/document-template";
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
import { useEffect, useState } from "react";
import documentTemplateApi from "@/apis/documentTemplateApi";
import { s3Client, createPresignedUrlWithClient } from "@/utils/aws";
import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

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
  const [imageUrl, setImageUrl] = useState<string>('');
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (documentTemplate) {
      setIsLoading(true);

      documentTemplateApi.getDocumentTemplateDetail(documentTemplate.id).then((res) => {
        const documentTemplateDetail: DocumentTemplateDetail = res;
        const { dataTemplate } = documentTemplateDetail;
        setRectangles(dataTemplate);
      });

      createPresignedUrlWithClient({
        bucket: 'edurpa-document-template',
        key: `${documentTemplate.id}/sample-processed.jpg`,
      })
        .then((url) => {
          setImageUrl(url);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [documentTemplate]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const { id } = documentTemplate as DocumentTemplate;
      const fileName = `sample-original.jpg`;
      const fileKey = `${id}/${fileName}`;
      const uploadParams = {
        Bucket: 'edurpa-document-template',
        Key: fileKey,
        Body: file,
      };
      const uploadCommand = new PutObjectCommand(uploadParams);
      await s3Client.send(uploadCommand);
      
      // WARNING: this is a temporary solution
      setImageUrl('');
      setTimeout(() => {
        createPresignedUrlWithClient({
          bucket: 'edurpa-document-template',
          key: `${id}/sample-processed.jpg`,
        })
          .then((url) => {
            setImageUrl(url);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }, 5000);
    }
  };

  const handleImageError = () => {
    setImageUrl('');
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

  // TODO: fix the document template flow
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

            <h1 className="text-2xl mt-[20px]">Sample document</h1>

            {!imageUrl && !isLoading && (
              <div className="flex justify-center items-center">
                <p>No sample document uploaded or the document cannot be processed</p>
              </div>
            )}

            {imageUrl && !isLoading && (
              <BoundingBox
                imageUrl={imageUrl}
                rectangles={rectangles}
                onNewRectangle={handleNewRectangle}
                onErrorImage={handleImageError}
              />
            )}

            <h1 className="text-2xl mt-[20px]">Data template</h1>

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
              isLoading={isLoading}
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