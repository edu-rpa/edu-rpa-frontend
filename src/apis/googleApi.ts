import apiBase from './config';
import { AuthorizationProvider } from '@/interfaces/enums/provider.enum';
import { GoogleForm } from '@/interfaces/google';

const getForms = async (connectionName: string): Promise<GoogleForm[]> => {
  const provider = AuthorizationProvider.G_FORMS;
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/google-forms?connectionName=${connectionName}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const googleApi = {
  getForms,
};

export default googleApi;
