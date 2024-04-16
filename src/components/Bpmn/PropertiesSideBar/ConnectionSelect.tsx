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
        <option key={option.name} value={option.connectionKey}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}
