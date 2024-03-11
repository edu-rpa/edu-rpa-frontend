import { AuthorizationProvider } from "./enums/provider.enum";

export interface Connection {
  provider: AuthorizationProvider;
  name: string;
  createdAt: Date;
  [key: string]: any;
}