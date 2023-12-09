export const ActivityTemplates = [
  {
    _id: 'google_workspace',
    displayName: 'Google Workspace',
    description:
      'Help you integrate your work with Google Workspace applications (like Google Drive)',
    iconCode: 'FcGoogle',
    library: 'RPA.Cloud.Google',
    activityTemplates: [
      {
        templateId: 'drive.create_folder',
        displayName: 'Create folder',
        description: 'Create a Google Drive folder in a given directory',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        keyword: 'Create Drive Directory',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          'Folder name': {
            type: 'string',
            description: 'The name of the folder',
            keywordArg: 'folder',
            value: '',
          },
          'Parent Folder Path': {
            type: 'string',
            description: 'The path to the parent folder',
            keywordArg: 'parent_folder',
            value: '',
          },
        },
        return: {
          displayName: 'Folder',
          assignedTo: null,
          type: 'dictionary',
          description:
            'The created folder. This is a dictionary, contains: id (folder id), url (folder url)',
        },
      },
      {
        templateId: 'drive.for_each_file_in_folder',
        displayName: 'For each file in folder',
        description: 'Iterates over a list of files in a Google Drive folder',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'subprocess',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          'Folder Path': {
            type: 'string',
            description: 'The path to the folder',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'drive.get_file_list_in_folder',
        displayName: 'Get file list in folder',
        description: 'Get a list of files in a given folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        keyword: 'Search Drive Files',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          'Folder Path': {
            type: 'string',
            description: 'The path to the folder',
            keywordArg: 'source',
            value: '',
          },
          Query: {
            type: 'string',
            description: 'Enter your query condition',
            keywordArg: 'query',
            value: '',
          },
        },
        return: {
          displayName: 'File List',
          assignedTo: null,
          type: 'list',
          description:
            'A list of files. Each file is a dictionary, contains: id (file id), url (file url), name (file name), is_folder, mimeType (file mime type), size (file size), modifiedTime (file modified time)',
        },
      },
      {
        templateId: 'drive.get_file_folder',
        displayName: 'Get a file/folder',
        description: 'Get a file/folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        keyword: 'Get Drive File By Id',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          ID: {
            type: 'string',
            description: 'The ID of folder or file',
            keywordArg: 'file_id',
            value: '',
          },
        },
        return: {
          displayName: 'File/Folder',
          assignedTo: null,
          type: 'dictionary',
          description:
            'The file/folder. This is a dictionary, contains: id (file/folder id), url (file/folder url), name (file/folder name), is_folder, mimeType (file/folder mime type), size (file/folder size), modifiedTime (file/folder modified time)',
        },
      },
      {
        templateId: 'drive.delete_file_folder',
        displayName: 'Delete file/folder',
        description: 'Delete a file/folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        keyword: 'Delete Drive File',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          ID: {
            type: 'string',
            description: 'The ID of folder or file',
            keywordArg: 'file_id',
            value: '',
          },
        },
        return: {
          displayName: 'Number of deleted',
          assignedTo: null,
          type: 'number',
          description: 'The number of deleted files/folders',
        },
      },
      {
        templateId: 'drive.move_file_folder',
        displayName: 'Move file/folder',
        description: 'Move a file/folder to another folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        keyword: 'Move Drive File',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          'Source ID': {
            type: 'string',
            description: 'The ID of source folder or file',
            keywordArg: 'file_id',
            value: '',
          },
          'Destination Folder Path': {
            type: 'string',
            description: 'The path to destination folder',
            keywordArg: 'target',
            value: '',
          },
        },
        return: {
          displayName: 'List of files/folders id',
          assignedTo: null,
          type: 'list',
          description: 'A list of files/folders id',
        },
      },
      {
        templateId: 'drive.share_file_folder',
        displayName: 'Share a file/folder',
        description: 'Share a file/folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        keyword: 'Add Drive Share',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          'Share Type': {
            type: 'enum.shareType',
            description: 'Share with list emails or all people',
            keywordArg: 'share_type',
            value: 'user',
          },
          'Share with Email': {
            type: 'email',
            description: 'Email address to share with',
            keywordArg: 'email',
            value: '',
          },
          Permission: {
            type: 'enum.permission',
            description: 'The role including reader, commenter, writer',
            keywordArg: 'role',
            value: 'reader',
          },
          ID: {
            type: 'string',
            description: 'The ID of the file or folder',
            keywordArg: 'file_id',
            value: '',
          },
        },
        return: {
          displayName: 'Share response',
          assignedTo: null,
          type: 'dictionary',
          description:
            'The share response. This is a dictionary, contains: file_id, permission_id',
        },
      },
      {
        templateId: 'gmail.send_email',
        displayName: 'Send email',
        description: 'Send an email to other people using Gmail',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        keyword: 'Send Message',
        arguments: {
          Connection: {
            type: 'connection.Gmail',
            description: 'Your connection ID with Gmail',
            value: null,
          },
          From: {
            type: 'string',
            description: 'Your source email',
            keywordArg: 'sender',
            value: 'me',
          },
          To: {
            type: 'email',
            description: 'Email you want to send email to',
            keywordArg: 'to',
            value: '',
          },
          Subject: {
            type: 'string',
            description: 'The subject of email',
            keywordArg: 'subject',
            value: '',
          },
          Body: {
            type: 'string',
            description: 'The body of email',
            keywordArg: 'message_text',
            value: '',
          },
        },
        return: {
          displayName: 'Sent message',
          assignedTo: null,
          type: 'dictionary',
          description:
            'The sent message. This is a dictionary, contains: id (message id), threadId (message thread id)',
        },
      },
      {
        templateId: 'gmail.for_each_email',
        displayName: 'For each email',
        description: 'Iterates over a list of email',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'subprocess',
        arguments: {
          Connection: {
            type: 'connection.Gmail',
            description: 'Your connection ID with Gmail',
            value: null,
          },
          'Email Folder Path': {
            type: 'label_ids',
            description: 'The source email folder path',
            value: [],
          },
          'Max number emails': {
            type: 'number',
            description: 'Filter by the limit number of emails',
            keywordArg: 'max_results',
            value: 100,
          },
          'From email': {
            type: 'email',
            description: 'Filter by source email',
            value: '',
          },
          'Starred Email': {
            type: 'boolean',
            description: 'Filter by starred email',
            value: false,
          },
          'Read Email': {
            type: 'boolean',
            description: 'Filter by read email',
            value: false,
          },
          'From date': {
            type: 'date',
            description: 'Filter by range of day (start day)',
            value: null,
          },
          'To date': {
            type: 'date',
            description: 'Filter by range of day (end day)',
            value: null,
          },
        },
        return: null,
      },
      {
        templateId: 'gmail.list_emails',
        displayName: 'Get list emails',
        description: 'List emails in a given folder in Gmail',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        keyword: 'List Messages',
        arguments: {
          Connection: {
            type: 'connection.Gmail',
            description: 'Your connection ID with Gmail',
            value: null,
          },
          'Email Folder Path': {
            type: 'list',
            description: 'The source email folder path',
            keywordArg: 'label_ids',
            value: [],
          },
          'User ID': {
            type: 'string',
            description: 'The ID of user',
            keywordArg: 'user_id',
            value: 'me',
          },
          Query: {
            type: 'string',
            description: 'The query condition',
            keywordArg: 'query',
            value: '',
          },
          'Max number emails': {
            type: 'number',
            description: 'Filter by the limit number of emails',
            keywordArg: 'max_results',
            value: 100,
          },
        },
        return: {
          displayName: 'Emails',
          assignedTo: null,
          type: 'list',
          description:
            'A list of emails. Each email is a dictionary, contains: id (email id), from (email from), to (email to), cc (email cc), bcc (email bcc), subject (email subject), body (email body), attachments (email attachments)',
        },
      },
      {
        templateId: 'sheet.create_spreadsheet',
        displayName: 'Create SpreadSheet',
        description: 'Create SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Create Spreadsheet',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
          'SpreadSheet Name': {
            type: 'string',
            description: 'The spread sheet name',
            keywordArg: 'title',
            value: '',
          },
        },
        return: {
          displayName: 'SpreadSheet ID',
          assignedTo: null,
          type: 'string',
          description: 'The created spreadsheet id',
        },
      },
      {
        templateId: 'sheet.for_each_sheet_in_spreadsheet',
        displayName: 'For Each Sheet',
        description: 'Iterates over a list of Sheet in a Spreadsheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'subprocess',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'sheet.get_spreadsheet_by_id',
        displayName: 'Get SpreadSheet By Id',
        description: 'Get SpreadSheet By Id in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Get Spreadsheet Basic Information',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
        },
        return: {
          displayName: 'SpreadSheet',
          assignedTo: null,
          type: 'dictionary',
          description:
            'The spreadsheet. This is a dictionary, contains: id (spreadsheet id), url (spreadsheet url), name (spreadsheet name), sheets (spreadsheet sheets)',
        },
      },
      {
        templateId: 'sheet.add_sheet',
        displayName: 'Add sheet',
        description: 'Add sheet to a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Create Sheet',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
          'Sheet Name': {
            type: 'string',
            description: 'The name of the sheet',
            keywordArg: 'sheet_name',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'sheet.delete_sheet',
        displayName: 'Delete sheet',
        description: 'Delete sheet from a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Delete Sheet',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
          'Sheet Name': {
            type: 'string',
            description: 'The name of the sheet',
            keywordArg: 'sheet_name',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'sheet.rename_sheet',
        displayName: 'Rename sheet',
        description: 'Rename sheet of a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Rename Sheet',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
          'Old Sheet Name': {
            type: 'string',
            description: 'The old name of sheet',
            keywordArg: 'sheet_name',
            value: '',
          },
          'New Sheet Name': {
            type: 'string',
            description: 'The new name of sheet',
            keywordArg: 'new_sheet_name',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'sheet.write_data_to_sheet',
        displayName: 'Write Data To Sheet',
        description:
          'Write Data To Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Update Sheet Values',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
          'Sheet Range': {
            type: 'string',
            description: 'The range of the sheet',
            keywordArg: 'sheet_range',
            value: '',
          },
          Content: {
            type: 'list',
            description: 'The data written to the sheet',
            keywordArg: 'values',
            value: [],
          },
        },
        return: null,
      },
      {
        templateId: 'sheet.read_data_from_sheet',
        displayName: 'Read Data From Sheet',
        description:
          'Read Data From Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Get Sheet Values',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
          'Sheet Range': {
            type: 'string',
            description: 'The range of the sheet',
            keywordArg: 'sheet_range',
            value: '',
          },
        },
        return: {
          displayName: 'Sheet Values',
          assignedTo: null,
          type: 'list',
          description: 'A list of values. Each value is a list of cells value',
        },
      },
      {
        templateId: 'sheet.clear_data_from_sheet',
        displayName: 'Clear Data From Sheet',
        description:
          'Clear Data From Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        keyword: 'Clear Sheet Values',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
          'Sheet Range': {
            type: 'string',
            description: 'The range of the sheet',
            keywordArg: 'sheet_range',
            value: '',
          },
        },
        return: null,
      },
    ],
  },
  {
    _id: 'control',
    displayName: 'Control',
    description: 'Help you control the execution flow of your robot',
    iconCode: 'MdControlCamera',
    activityTemplates: [
      {
        templateId: 'if',
        displayName: 'If/Else',
        description:
          'If a condition is met, then execute a set of activities, otherwise execute another set of activities',
        iconCode: 'AiOutlineBranches',
        service: 'Condition',
        type: 'gateway',
        arguments: {
          Condition: {
            type: 'expression.logic',
            description: 'The condition to execute',
            value: {
              left: {
                type: 'string',
                description: 'The left operand',
                value: '',
              },
              operator: {
                type: 'enum.operator.logic',
                description: 'The operator',
                value: '=',
              },
              right: {
                type: 'string',
                description: 'The right operand',
                value: '',
              },
            },
          },
        },
        return: null,
      },
      {
        templateId: 'for_each',
        displayName: 'For each',
        description: 'Execute a set of activities for each item in a list',
        iconCode: 'ImLoop2',
        service: 'Loop',
        type: 'subprocess',
        arguments: {
          List: {
            type: 'list',
            description: 'List of value',
            value: [],
          },
          Item: {
            type: 'string',
            description: 'The initial variable for the loop',
            value: '',
          },
        },
        return: null,
      },
    ],
  },
  {
    _id: 'browser_automation',
    displayName: 'Browser automation',
    description:
      'Help you automate tasks that need to be done in a web browser (like Chrome)',
    iconCode: 'TbBrowserCheck',
    library: 'RPA.Browser.Playwright',
    activityTemplates: [
      {
        templateId: 'use_browser',
        displayName: 'Use browser',
        description: 'Open a browser and use it to execute a set of activities',
        service: 'Navigation',
        iconCode: 'GoBrowser',
        type: 'subprocess',
        keyword: 'New Browser',
        arguments: {},
        return: null,
      },
      {
        templateId: 'go_to_url',
        displayName: 'Go to URL',
        description: 'Go to a given URL in the current browser tab',
        iconCode: 'GoBrowser',
        service: 'Navigation',
        type: 'activity',
        keyword: 'Go To',
        arguments: {
          URL: {
            type: 'string',
            description: 'The URL link',
            keywordArg: 'url',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'click',
        displayName: 'Click',
        description: 'Click on a given element in the current browser tab',
        iconCode: 'FaMousePointer',
        type: 'activity',
        service: 'Browser Event',
        keyword: 'Click',
        arguments: {
          Element: {
            type: 'string',
            description: 'The element HTML DOM of the website',
            keywordArg: 'selector',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'type',
        displayName: 'Type Into',
        description:
          'Type a given text into a given element in the current browser tab',
        iconCode: 'FaKeyboard',
        type: 'activity',
        service: 'Browser Event',
        keyword: 'Fill Text',
        arguments: {
          Element: {
            type: 'string',
            description: 'The HTML DOM element of the website',
            keywordArg: 'selector',
            value: '',
          },
          Text: {
            type: 'string',
            description: 'The text to type to the website',
            keywordArg: 'txt',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'get_text',
        displayName: 'Get text',
        description:
          'Get the text of a given element in the current browser tab',
        iconCode: 'FaFont',
        type: 'activity',
        service: 'Browser Event',
        keyword: 'Get Text',
        arguments: {
          Element: {
            type: 'string',
            description: 'The HTML DOM element of the website',
            keywordArg: 'selector',
            value: '',
          },
        },
        return: {
          displayName: 'Text',
          assignedTo: null,
          type: 'string',
          description: 'The text of the element',
        },
      },
    ],
  },
  {
    _id: 'document_automation',
    displayName: 'Document automation',
    description:
      'Help you automate tasks related to documents (traditional paper documents or digital documents like PDFs) with the help of AI',
    iconCode: 'FaFileAlt',
    activityTemplates: [
      {
        templateId: 'ocr.bbox_annotation',
        displayName: 'Bounding Box Annotation',
        description: 'Select bounding box  for marking image annotations',
        iconCode: 'FaImage',
        service: 'OCR',
        type: 'activity',
        keyword: 'Text Extraction',
        arguments: {
          'File URL': {
            type: 'bbox.file',
            description: 'Import image and draw bounding box',
            value: null,
          },
          'Bounding Box Values': {
            type: 'bbox.value',
            description: 'The list of bounding box value',
            keywordArg: 'annotations',
            value: null,
          },
        },
        return: null,
      },
    ],
  },
];
