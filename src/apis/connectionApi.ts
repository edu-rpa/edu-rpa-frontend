import { Connection } from '@/interfaces/connection';
import apiBase from './config';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import { ActivateConnectionDto } from '@/dtos/connectionDto';

const queryConnections = async (
  provider?: AuthorizationProvider
): Promise<Connection[]> => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/connection?provider=${
        provider ? provider : ''
      }`
    )
    .then((res: any) => {
      return res.data;
    });
};

const refreshConnection = async (
  provider: string,
  name: string
): Promise<void> => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/connection/refresh?provider=${provider}&name=${name}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const removeConnection = async (
  provider: string,
  name: string
): Promise<void> => {
  return await apiBase
    .delete(
      `${process.env.NEXT_PUBLIC_DEV_API}/connection?provider=${provider}&name=${name}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const getAllConnectionsByRobotKey = async (
  robotKey: string
): Promise<Connection[]> => {
  return await apiBase
    .get(`${process.env.NEXT_PUBLIC_DEV_API}/connection/robot/${robotKey}`)
    .then((res: any) => {
      return res.data;
    });
};

const getConnectionsByConnectionKey = async (
  connectionKeys: string[]
): Promise<Connection[]> => {
  return await apiBase
    .post(`${process.env.NEXT_PUBLIC_DEV_API}/connection/connectionKey`, {
      connectionKeys,
    })
    .then((res: any) => {
      return res.data.connections;
    });
};

const activateConnection = async (
  robotKey: string,
  payload: ActivateConnectionDto
) => {
  return await apiBase
    .post(
      `${process.env.NEXT_PUBLIC_DEV_API}/connection/activate/robot/${robotKey}`,
      payload
    )
    .then((res: any) => {
      return res.data;
    });
};

const connectionApi = {
  queryConnections,
  refreshConnection,
  removeConnection,
  getAllConnectionsByRobotKey,
  getConnectionsByConnectionKey,
  activateConnection,
};

export default connectionApi;
