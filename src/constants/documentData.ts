import { formatDate } from '@/utils/common';

const formatTime = formatDate(new Date());

const documentData = [
  {
    DocumentID: 'Document_04og7m0',
    Owner: 'You',
    type: 'Google Sheet',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_06gm8n0',
    Owner: 'Robot 1',
    type: 'PDF',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_1abc2def',
    Owner: 'ducan1406@gmail.com',
    type: 'Google Word',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_3xyz4uvw',
    Owner: 'Robot 2',
    type: 'Excel File',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_5pqr6stu',
    Owner: 'anduckhmt146@gmail.com',
    type: 'PowerPoint',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_7mnop8qrs',
    Owner: 'User 5',
    type: 'Text File',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_9tuv0wxy',
    Owner: 'User 6',
    type: 'Image',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_abcd1efgh',
    Owner: 'User 7',
    type: 'Google Sheet',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_cdef2ghij',
    Owner: 'User 8',
    type: 'Google Slide',
    last_modified: formatTime,
  },
  {
    DocumentID: 'Document_efgh3ijkl',
    Owner: 'User 9',
    type: 'CSV',
    last_modified: formatTime,
  },
];
export default documentData;
