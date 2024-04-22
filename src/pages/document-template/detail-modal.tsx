import BoundingBox from "@/components/BoundingBox/BoundingBox";
import { SaveDocumentTemplateDto } from "@/dtos/documentTemplateDto";
import { DocumentTemplate, DocumentTemplateDetail } from "@/interfaces/document-template";
import { DataTemplate, Rectangle } from "@/types/boundingBox";
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
  Box,
  useToast,
  Checkbox,
  RadioGroup,
  Radio,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react";
import documentTemplateApi from "@/apis/documentTemplateApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  documentTemplate?: DocumentTemplate;
  handleSaveDocumentTemplate: (saveDocumentTemplateDto: SaveDocumentTemplateDto) => void;
  isEditable? : boolean,  
  handleSelectDocumentTemplate?: (e:any) => void;
}

const TEMPLATE_SIZES = [
  [800, 600],
  [600, 800],
];

const DetailDocumentTemplateModal: React.FC<Props> = ({
  isOpen,
  onClose,
  documentTemplate,
  handleSaveDocumentTemplate,
  isEditable=true,
  handleSelectDocumentTemplate=(e:any)=>{}
}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [dataTemplate, setDataTemplate] = useState<DataTemplate>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [templateSizeIndex, setTemplateSizeIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (documentTemplate) {
      setIsLoading(true);
      setDataTemplate({});

      documentTemplateApi.getDocumentTemplateDetail(documentTemplate.id).then((res) => {
        const documentTemplateDetail: DocumentTemplateDetail = res;
        const { dataTemplate } = documentTemplateDetail;
        setDataTemplate(dataTemplate);
      });

      documentTemplateApi.getPresignedUrl(documentTemplate.id)
        .then((res) => {
          setImageUrl(res.url);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [documentTemplate]);

  const handleTemplateUpload = async () => {
    if (selectedFile && documentTemplate) {
      setIsLoading(true);
      setImageUrl('');
      const { id } = documentTemplate as DocumentTemplate;

      const res = await documentTemplateApi.uploadSampleDocument(id, selectedFile, isScanned, TEMPLATE_SIZES[templateSizeIndex]);
      setImageUrl(res.url);
      await documentTemplateApi.saveDocumentTemplate(id, {
        size: {
          width: TEMPLATE_SIZES[templateSizeIndex][0],
          height: TEMPLATE_SIZES[templateSizeIndex][1],
        },
        dataTemplate: {},
      });
      setDataTemplate({});
      setIsLoading(false);
    }
  };

  const handleImageError = () => {
    setImageUrl('');
  };

  const handleNewRectangle = (newRect: Rectangle) => {
    let incrementedLabel = Object.keys(dataTemplate).length + 1;
    let newLabel = `Field ${incrementedLabel}`;

    while (dataTemplate[newLabel]) {
      incrementedLabel++;
      newLabel = `Field ${incrementedLabel}`;
    }

    setDataTemplate({
      ...dataTemplate,
      [newLabel]: {
        left: Math.min(newRect.left, newRect.right),
        top: Math.min(newRect.top, newRect.bottom),
        right: Math.max(newRect.left, newRect.right),
        bottom: Math.max(newRect.top, newRect.bottom),
      },
    });
  };

  const handleDeleteField = (label: string) => {
    const newTemplate = { ...dataTemplate };
    delete newTemplate[label];
    setDataTemplate(newTemplate);
  };

  const handleLabelChange = (oldLabel: string, newLabel: string, event: React.ChangeEvent<HTMLInputElement>) => {
    if (oldLabel === newLabel) return;
    if (!newLabel) {
      toast({
        title: 'Error',
        description: 'Label cannot be empty',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      event.target.value = oldLabel;
      return;
    }
    if (dataTemplate[newLabel]) {
      toast({
        title: 'Error',
        description: 'Label already exists',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      event.target.value = oldLabel;
      return;
    }
    const newTemplate = { ...dataTemplate };
    newTemplate[newLabel] = newTemplate[oldLabel];
    delete newTemplate[oldLabel];
    setDataTemplate(newTemplate);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{documentTemplate?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h1 className="text-2xl mb-[20px]">Sample document</h1>
            {isEditable && <FormControl>
              <Box className="flex justify-between">
                <Box
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  className="my-[5px]">
                  <Input
                    type="file"
                    onChange={(e) => {
                      setSelectedFile(e.target.files?.[0]);
                    }}
                    accept="image/*"
                    p={2}
                    variant="unstyled"
                  />
                </Box>
              </Box>
            </FormControl> }

            <Box className="flex flex-col">
              <Checkbox
                disabled={!selectedFile}
                isChecked={isScanned}
                onChange={(e) => setIsScanned(e.target.checked)}
              >The sample document has already been scanned.</Checkbox>

              <RadioGroup
                onChange={(value) => {
                  setTemplateSizeIndex(parseInt(value));
                }}
                value={templateSizeIndex.toString()}
                isDisabled={!selectedFile}
              >
                <Stack direction="row">
                  <Text>Template size (Width x Height):</Text>
                  {TEMPLATE_SIZES.map((size, index) => (
                    <Radio key={index} value={index.toString()}>
                      {size[0]} x {size[1]}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>

              <Button
                colorScheme="teal"
                size="md"
                className="m-[10px]"
                onClick={handleTemplateUpload}>
                Upload Sample Document
              </Button>
            </Box>

            {!imageUrl && !isLoading && (
              <div className="flex justify-center items-center">
                <p>No sample document uploaded or the document cannot be processed.</p>
              </div>
            )}

            {imageUrl && !isLoading && (
              <BoundingBox
                imageUrl={imageUrl}
                dataTemplate={dataTemplate}
                onNewRectangle={handleNewRectangle}
                onLabelChange={handleLabelChange}
                onErrorImage={handleImageError}
              />
            )}

            {isEditable && <h1 className="text-2xl mt-[20px]">Data template</h1>}

            {isEditable && <ul>
              {Object.keys(dataTemplate).map((label, index) => {
                const rect = dataTemplate[label];
                return (
                  <li key={index}>
                    {label}: [Left: {rect.left.toFixed(2)}, Top:{' '}
                    {rect.top.toFixed(2)}, Right: {rect.right.toFixed(2)}, Bottom:{' '}
                    {rect.bottom.toFixed(2)}]
                    <Button
                      colorScheme="teal"
                      size="md"
                      className="m-[10px]"
                      onClick={() => handleDeleteField(label)}>
                      Delete
                    </Button>
                  </li>
                );

              })}
            </ul>}
          </ModalBody>
          <ModalFooter>
            {
              isEditable 
              ? 
                <Button
                    isLoading={isLoading}
                    colorScheme="teal"
                    mr={3}
                    onClick={() => handleSaveDocumentTemplate({
                      dataTemplate: dataTemplate,
                    })}>
                    Save
                </Button>
              :
                <Button
                  isLoading={isLoading}
                  colorScheme="teal"
                  mr={3}
                  onClick={() => handleSelectDocumentTemplate({
                    name: `${documentTemplate.type}-template-${documentTemplate.name ?? ""}`, 
                    dataTemplate: JSON.stringify(dataTemplate)
                  })}>
                  Select
                </Button>
            }

            <Button onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default DetailDocumentTemplateModal;