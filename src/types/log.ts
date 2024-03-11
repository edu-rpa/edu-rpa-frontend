export interface LogMessage {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
}
