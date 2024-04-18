import { DocumentTemplate } from "@/interfaces/document-template";
import DocumentTemplateList from "@/pages/document-template";
import { DataTemplate } from "@/types/boundingBox";
import { Variable, VariableType } from "@/types/variable";
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { MdMargin } from "react-icons/md";

export interface DocumentTemplateInputParams {
    row: Variable,
    onChange: (dataTemplate: string, label: string) => void;
}
export default function DocumentTemplateInput(props: DocumentTemplateInputParams) {
    const {row, onChange} = props
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [label, setLabel] = useState<string>(row.label)

    const handleSelectDocumentTemplate = ({
        name,
        dataTemplate
    }) => {
        setLabel(name);
        onClose();
        onChange(dataTemplate, name);
    }

    return(
        <>
            <Button onClick={onOpen}>{label && label.length != 0 ?  label : "Select Document"}</Button>
            <Modal isOpen={isOpen} onClose={onClose} size="fit">
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <DocumentTemplateList
                            isEditable={false}
                            handleSelectDocumentTemplate={handleSelectDocumentTemplate}
                        ></DocumentTemplateList>
                    </div>
                </ModalContent>
            </Modal>
        </>
    )
}