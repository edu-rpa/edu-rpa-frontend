export interface LogStream {
  logStreamName: string;
  creationTime: string;
  lastEventTime: string;
}

export interface LogEvent {
  message: string;
  timestamp: string;
}
