import CodeViewer from "@/components/CodeViewer/CodeViewer";
import DocumentTemplateList from "@/pages/document-template";
import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

export interface DisplayRobotCodeParams {
    compileRobotCode: any;
    errorTrace?: string;
    setErrorTrace: any
}
export default function DisplayRobotCode(props: DisplayRobotCodeParams) {
    const {compileRobotCode, errorTrace, setErrorTrace} = props
    const [displayTxt, setDisplayTxt] = useState<string>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    const handleDisplayRobotCode = () => {
        const result: any = compileRobotCode()
        if(errorTrace && errorTrace.length > 0) {
            setDisplayTxt(errorTrace)
        }   
        else {
            setDisplayTxt(JSON.stringify(result?.code ?? "", null, 4).replaceAll("\\",""))
        }
        onOpen()
    }

    const onCloseDisplay = () => {
        setErrorTrace('')
        onClose();
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
            <Modal isOpen={isOpen} onClose={onCloseDisplay} size="xl">
                <ModalOverlay />
                <ModalContent maxW="50%">
                    <ModalCloseButton />
                        <CodeViewer
                            code={displayTxt}
                            language="json"
                        >
                        </CodeViewer>
                </ModalContent>
            </Modal>
        </>
    )
}