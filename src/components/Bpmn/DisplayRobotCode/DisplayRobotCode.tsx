import CodeViewer from "@/components/CodeViewer/CodeViewer";
import DocumentTemplateList from "@/pages/document-template";
import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export interface DisplayRobotCodeParams {
    compileRobotCode: any;
}
export default function DisplayRobotCode(props: DisplayRobotCodeParams) {
    const {compileRobotCode} = props
    const [robotCode, setRobotCode] = useState<string>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleDisplayRobotCode = () => {
        const code: any = compileRobotCode()   
        setRobotCode(JSON.stringify(code, null, 4))
        onOpen()
    }

    return(
        <>
            <Button
                colorScheme="blue"
                size="md"
                className="mx-[5px]"
                onClick={() => handleDisplayRobotCode()}>
                Compile Robot
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay />
                <ModalContent maxW="50%">
                    <ModalCloseButton />
                        <CodeViewer
                            code={robotCode}
                            language="json"
                        >
                        </CodeViewer>
                </ModalContent>
            </Modal>
        </>
    )
}