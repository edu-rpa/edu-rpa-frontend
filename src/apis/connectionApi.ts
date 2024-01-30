import { Connection } from '@/interfaces/connection';
import apiBase from './config';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';

const queryConnections = async (provider?: AuthorizationProvider): Promise<Connection[]> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/connection?provider=${provider? provider : ''}`)
    .then((res: any) => {
      return res.data;
    });
};

const connectionApi = {
  queryConnections,
};

export default connectionApi;
