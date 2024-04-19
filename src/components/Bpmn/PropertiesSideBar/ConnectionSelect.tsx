import connectionApi from '@/apis/connectionApi';
import { Connection } from '@/interfaces/connection';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import { Select } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export interface ConnectionOptionsParams {
  value: string;
  onChange: (e: any) => void;
  provider: AuthorizationProvider;
}
export default function ConnectionOptions(props: ConnectionOptionsParams) {
  const { onChange, provider, value } = props;
  const [options, setOptions] = useState<Connection[]>([]);
  const handleCreateGoogleCredentialFilePath = (path: string) => `${process.env["NEXT_PUBLIC_ROBOT_CREDENTIAL_FOLDER"]}/${path}.json`
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const connections = await connectionApi.queryConnections(provider);
        setOptions(connections);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Select
      onChange={onChange}
      placeholder="Choose the connection"
      value={value}>
      {options.map((option) => (
        <option key={option.name} value={handleCreateGoogleCredentialFilePath(option.connectionKey)}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}
