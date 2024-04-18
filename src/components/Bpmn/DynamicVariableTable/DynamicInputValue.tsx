import { Variable, VariableType } from "@/types/variable";
import { Input } from "@chakra-ui/react";
import DocumentTemplateInput from "./InputVariation/DocumentTemplateInput";

export interface DynamicInputValueParams {
    row: Variable,
    onChange: any;
}
export default function DynamicInputValue(props: DynamicInputValueParams) {
    const {row, onChange} = props
    
    switch (row.type) {
        case VariableType.DocumentTemplate:
            return(
                <DocumentTemplateInput
                    {...props}
                ></DocumentTemplateInput>
            )
        default:
            return(
                <Input
                    value={row.value}
                    onChange={onChange}
                />
            )
    }
}