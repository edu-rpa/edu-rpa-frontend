import { formatDate } from '@/utils/common';

const formatTime = formatDate(new Date());

const connectionData = [
  {
    name: 'Google Drive',
    connectionID: '2023-09-17T06:55:54.536',
    email: 'ducan1406@gmail.com',
    last_modified: formatTime,
    status: 'Connected',
    id: 'google-drive',
  },
  {
    name: 'Dropbox',
    connectionID: '2023-09-18T09:30:22.123',
    email: 'example@email.com',
    last_modified: formatTime,
    status: 'Disconnected',
    id: 'dropbox',
  },
  {
    name: 'Microsoft OneDrive',
    connectionID: '2023-09-18T11:45:37.789',
    email: 'user@example.com',
    last_modified: formatTime,
    status: 'Connected',
    id: 'onedrive',
  },
  {
    name: 'Box',
    connectionID: '2023-09-18T13:20:15.456',
    email: 'boxuser@example.com',
    last_modified: formatTime,
    status: 'Disconnected',
    id: 'box',
  },
  {
    name: 'OneNote',
    connectionID: '2023-09-18T15:10:58.987',
    email: 'noteuser@example.com',
    last_modified: formatTime,
    status: 'Connected',
    id: 'onenote',
  },
  {
    name: 'iCloud',
    connectionID: '2023-09-18T17:55:42.222',
    email: 'iclouduser@example.com',
    last_modified: formatTime,
    status: 'Disconnected',
    id: 'icloud',
  },
  {
    name: 'Amazon Drive',
    connectionID: '2023-09-19T08:45:30.111',
    email: 'amazonuser@example.com',
    last_modified: formatTime,
    status: 'Connected',
    id: 'amazon',
  },
  {
    name: 'Adobe Creative Cloud',
    connectionID: '2023-09-19T10:20:14.789',
    email: 'adobeuser@example.com',
    last_modified: formatTime,
    status: 'Disconnected',
    id: 'creative-cloud',
  },
  {
    name: 'GitHub',
    connectionID: '2023-09-19T12:15:45.333',
    email: 'githubuser@example.com',
    last_modified: formatTime,
    status: 'Connected',
    id: 'github',
  },
  {
    name: 'Slack',
    connectionID: '2023-09-19T14:30:55.666',
    email: 'slackuser@example.com',
    last_modified: formatTime,
    status: 'Disconnected',
    id: 'slack',
  },
];
export default connectionData;
