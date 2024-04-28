import { AuthorizationProvider } from './enums/provider.enum';

export interface Connection {
  provider: AuthorizationProvider;
  name: string;
  createdAt: Date;
  connectionKey: string;
  isActivate?: boolean;
  [key: string]: any;
}
