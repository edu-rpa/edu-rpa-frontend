import connectionApi from "@/apis/connectionApi"
import { Connection } from "@/interfaces/connection"
import { AuthorizationProvider } from "@/interfaces/enums/provider.enum"
import { Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export interface ConnectionOptionsParams {
    defaultValue: string,
    onChange: (e:any) => void,
    provider: AuthorizationProvider
}
export default function ConnectionOptions(props: ConnectionOptionsParams) {
    const {defaultValue, onChange, provider} = props
    const [options, setOptions] = useState<Connection[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const connections = await connectionApi.queryConnections(provider)
                setOptions(connections)
            } catch (error) {
                
            }
        }
        fetchData();
    }, []);

    return <Select
        defaultValue = ""
        onChange = {onChange}
    >
        <option value="" disabled>
            {defaultValue}
        </option>
        {
            options.map((option) => (
                <option key={option.name} value={option.connectionKey}>{option.name}</option>
            ))
        }
        <option key="clear" value="">...</option>
    </Select>
}