export const ActivityPackageTemplates = [
  {
    _id: 'google_workspace',
    displayName: 'Google Workspace',
    description:
      'Help you integrate your work with Google Workspace applications (like Google Drive)',
    iconCode: 'FcGoogle',
    color: 'red',
    activityTemplates: [
      {
        templateId: 'drive.create_folder',
        displayName: 'Create folder',
        description: 'Create a Google Drive folder in a given directory',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          'Folder name': {
            type: 'string',
            value: '',
          },
          'Parent Folder Path': {
            type: 'string',
            value: '',
          },
          'Overwrite if folder exists': {
            type: 'boolean',
            value: false,
          },
        },
        return: {
          'Folder ID': null,
          'Folder URL': null,
        },
      },
      {
        templateId: 'drive.upload_files',
        displayName: 'Upload files',
        description: 'Upload files to a given directory in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          Files: [
            {
              type: 'file',
              value: null,
            },
          ],
          'Destination Folder Path': {
            type: 'string',
            value: '',
          },
          'Overwrite if file exists': {
            type: 'boolean',
            value: false,
          },
        },
        return: [
          {
            'File ID': null,
            'File URL': null,
          },
        ],
      },
      {
        templateId: 'drive.for_each_file_in_folder',
        displayName: 'For each file in folder',
        description: 'Iterates over a list of folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'subprocess',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          'Folder Path': {
            type: 'string',
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
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          'Folder Path': {
            type: 'string',
            value: '',
          },
        },
        return: [
          {
            'File ID': null,
            'File URL': null,
          },
        ],
      },
      {
        templateId: 'drive.get_file_folder',
        displayName: 'Get a file/folder',
        description: 'Get a file/folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          Path: {
            type: 'string',
            value: '',
          },
        },
        return: {
          type: null,
          id: null,
          url: null,
        },
      },
      {
        templateId: 'drive.delete_file_folder',
        displayName: 'Delete file/folder',
        description: 'Delete a file/folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          Path: {
            type: 'string',
            value: '',
          },
        },
        return: {
          message: 'Delete Successfully!',
        },
      },
      {
        templateId: 'drive.move_file_folder',
        displayName: 'Move file/folder',
        description: 'Move a file/folder to another folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          'Source Path': {
            type: 'string',
            value: '',
          },
          'Destination Path': {
            type: 'string',
            value: '',
          },
          'Overwrite if file/folder exists': {
            type: 'boolean',
            value: false,
          },
        },
        return: {
          message:
            'Move file/folder from ${Source Path} to ${Destination Path} successfully!',
        },
      },
      {
        templateId: 'drive.share_file_folder',
        displayName: 'Share a file/folder',
        description: 'Share a file/folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        service: 'Google Drive',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          shareWith: {
            type: 'all' || 'group',
            value: 'all',
          },
          shareEmail:
            [
              {
                type: 'email',
                value: null,
              },
            ] || null, // could be empty array is share for all, list array is share with group, null is revoke sharing with anyone
          permission: {
            type: 'view', // view, comment, edit, all
            value: null,
          },
          Path: {
            type: 'string',
            value: '',
          },
        },
        return: {
          message: 'Share File/Folder Successfully!',
          url: null,
        },
      },
      {
        templateId: 'gmail.send_email',
        displayName: 'Send email',
        description: 'Send an email to other people using Gmail',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Share With': {
            to: [
              {
                type: 'email',
                value: null,
              },
            ],
            cc: [
              {
                type: 'email',
                value: null,
              },
            ],
            bcc: [
              {
                type: 'email',
                value: null,
              },
            ],
          },
          Subject: {
            type: 'string',
            value: null,
          },
          Body: {
            type: 'string',
            value: null,
          },
          Attachments: [
            {
              type: 'file',
              value: null,
            },
          ],
        },
        return: {
          message: 'Send email successfully!',
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
            type: 'connection.gmail',
            value: null,
          },
          'Email Path': {
            type: 'string',
            value: null,
          },
          Filters: {
            limit: {
              type: 'number',
              value: 100,
            },
            fromEmail: [
              {
                type: 'string',
                value: null,
              },
            ],
            isStar: {
              type: 'boolean',
              value: false, // read or unread
            },
            isRead: {
              type: 'boolean',
              value: false, // star/unstar
            },
            fromDay: {
              type: 'date',
              value: false,
            },
            toDay: {
              type: 'date',
              value: false,
            },
          },
        },
        return: null,
      },
      {
        templateId: 'gmail.filter_email_list',
        displayName: 'Filter Email List',
        description: 'Filter a list of emails by conditions',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Email Path': {
            type: 'string',
            value: null,
          },
          Filters: {
            limit: {
              type: 'number',
              value: 100,
            },
            fromEmail: [
              {
                type: 'string',
                value: null,
              },
            ],
            isStar: {
              type: 'boolean',
              value: false, // read or unread
            },
            isRead: {
              type: 'boolean',
              value: false, // star/unstar
            },
            fromDay: {
              type: 'date',
              value: false,
            },
            toDay: {
              type: 'date',
              value: false,
            },
          },
        },
        return: [
          {
            type: 'email',
            emailID: null,
          },
        ],
      },
      {
        templateId: 'gmail.get_email_by_id',
        displayName: 'Get Email By ID',
        description: 'Retrieves the email with the specified ID',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Email ID': {
            type: 'string',
            value: null,
          },
        },
        return: {
          id: null,
          url: null,
          'Share With': {
            to: [],
            cc: [],
            bcc: [],
          },
          Subject: '',
          Body: '',
          Attachments: [],
        },
      },
      {
        templateId: 'gmail.mark_email_star_unstar',
        displayName: 'Mark Email as Star/Unstar',
        description: 'Mark an email as Star/Unstar with the specified ID',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Email ID': {
            type: 'string',
            value: null,
          },
          'Mark Email as Star': {
            type: 'boolean',
            value: true,
          },
        },
        return: {
          message: 'Mark Email as Star/Unstar successfully!',
        },
      },
      {
        templateId: 'gmail.mark_email_read_unread',
        displayName: 'Mark Email as Read/Unread',
        description: 'Mark an email as Read/Unread with the specified ID',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Email ID': {
            type: 'string',
            value: null,
          },
          'Mark Email as Read': {
            type: 'boolean',
            value: true,
          },
        },
        return: {
          message: 'Mark Email as Read/Unread successfully!',
        },
      },
      {
        templateId: 'gmail.reply_email',
        displayName: 'Reply Email',
        description: 'Reply an email with the specified ID to other people',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Email ID': {
            type: 'string',
            value: null,
          },
          'Share With': {
            to: [
              {
                type: 'email',
                value: null,
              },
            ],
            cc: [
              {
                type: 'email',
                value: null,
              },
            ],
            bcc: [
              {
                type: 'email',
                value: null,
              },
            ],
          },
          Body: {
            type: 'string',
            value: null,
          },
          Attachments: [
            {
              type: 'file',
              value: null,
            },
          ],
        },
        return: {
          message: 'Reply Email successfully!',
        },
      },
      {
        templateId: 'gmail.forward_email',
        displayName: 'Forward Email',
        description: 'Forward an email with the specified ID to other people',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Email ID': {
            type: 'string',
            value: null,
          },
          'Share With': {
            to: [
              {
                type: 'email',
                value: null,
              },
            ],
            cc: [
              {
                type: 'email',
                value: null,
              },
            ],
            bcc: [
              {
                type: 'email',
                value: null,
              },
            ],
          },
          Body: {
            type: 'string',
            value: null,
          },
          Attachments: [
            {
              type: 'file',
              value: null,
            },
          ],
        },
        return: {
          message: 'Forward Email successfully!',
        },
      },
      {
        templateId: 'gmail.forward_email',
        displayName: 'Forward Email',
        description: 'Forward an email with the specified ID to other people',
        iconCode: 'FaEnvelope',
        service: 'Gmail',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.gmail',
            value: null,
          },
          'Email ID': {
            type: 'string',
            value: null,
          },
          'Share With': {
            to: [
              {
                type: 'email',
                value: null,
              },
            ],
            cc: [
              {
                type: 'email',
                value: null,
              },
            ],
            bcc: [
              {
                type: 'email',
                value: null,
              },
            ],
          },
          Body: {
            type: 'string',
            value: null,
          },
          Attachments: [
            {
              type: 'file',
              value: null,
            },
          ],
        },
        return: {
          message: 'Forward Email successfully!',
        },
      },
      {
        templateId: 'sheet.create_spreadsheet',
        displayName: 'Create SpreadSheet',
        description: 'Create SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.drive',
            value: null,
          },
          'Drive Path': {
            type: 'string',
            value: null,
          },
          'Spread Sheet Name': {
            type: 'string',
            value: null,
          },
        },
        return: {
          message: 'Create a spread sheet successfully!',
          url: null,
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
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'sheet.get_sheet_list_in_spreadsheet',
        displayName: 'Get Sheet List',
        description: 'Get a list of sheet in given spreadsheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
        },
        return: [
          {
            'Sheet ID': null,
            'Sheet URL': null,
          },
        ],
      },
      {
        templateId: 'sheet.add_sheet',
        displayName: 'Add sheet',
        description: 'Add sheet to a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
          'Sheet Name': {
            type: 'string',
            value: '',
          },
        },
        return: {
          meesage: 'Add sheet successfully!',
        },
      },
      {
        templateId: 'sheet.delete_sheet',
        displayName: 'Delete sheet',
        description: 'Delete sheet from a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
          'Sheet Name': {
            type: 'string',
            value: '',
          },
        },
        return: {
          meesage: 'Delete sheet successfully!',
        },
      },
      {
        templateId: 'sheet.rename_sheet',
        displayName: 'Rename sheet',
        description: 'Rename sheet of a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
          'Old Sheet Name': {
            type: 'string',
            value: '',
          },
          'New Sheet Name': {
            type: 'string',
            value: '',
          },
        },
        return: {
          meesage: 'Rename sheet successfully!',
        },
      },
      {
        templateId: 'sheet.share_spreadsheet',
        displayName: 'Share a spreadsheet',
        description: 'Share a spreadsheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          shareWith: {
            type: 'all' || 'group',
            value: 'all',
          },
          shareEmail:
            [
              {
                type: 'email',
                value: null,
              },
            ] || null, // could be empty array is share for all, list array is share with group, null is revoke sharing with anyone
          permission: {
            type: 'view', // view, comment, edit, all
            value: null,
          },
          Path: {
            type: 'string',
            value: '',
          },
        },
        return: {
          message: 'Share SpreadSheet Successfully!',
          url: null,
        },
      },
      {
        templateId: 'sheet.write_data_to_sheet',
        displayName: 'Write Data To Sheet',
        description:
          'Write Data To Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
          'Sheet Name': {
            type: 'string',
            value: '',
          },
          Content: {
            type: 'string',
            value: '',
          },
          'Overwrite existed content': {
            type: 'boolean',
            value: true,
          },
          Filters: {
            // example from A5:C12, default start at A1 and write all data
            fromCell: {
              type: 'string',
              value: 'A1',
            },
            toCell: {
              type: 'string',
              value: null,
            },
          },
        },
        return: {
          meesage: 'Write data to sheet successfully!',
        },
      },
      {
        templateId: 'sheet.read_data_from_sheet',
        displayName: 'Read Data From Sheet',
        description:
          'Read Data From Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
          'Sheet Name': {
            type: 'string',
            value: '',
          },
          Content: {
            type: 'string',
            value: '',
          },
          Filters: {
            // example from A5:C12, default start at A1 and write all data
            fromCell: {
              type: 'string',
              value: 'A1',
            },
            toCell: {
              type: 'string',
              value: null,
            },
          },
        },
        return: {
          content: '',
        },
      },
      {
        templateId: 'sheet.delete_data_from_sheet',
        displayName: 'Delete Data From Sheet',
        description:
          'Delete Data From Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        service: 'Google Sheet',
        type: 'activity',
        arguments: {
          Connection: {
            type: 'connection.sheet',
            value: null,
          },
          'SpreadSheet Path': {
            type: 'string',
            value: '',
          },
          'Sheet Name': {
            type: 'string',
            value: '',
          },
          Content: {
            type: 'string',
            value: '',
          },
          Filters: {
            // example from A5:C12, default start at A1 and write all data
            fromCell: {
              type: 'string',
              value: 'A1',
            },
            toCell: {
              type: 'string',
              value: null,
            },
          },
        },
        return: {
          message: 'Delete data from sheet successfully!',
        },
      },
    ],
  },
  {
    _id: 'control',
    displayName: 'Control',
    description: 'Help you control the execution flow of your robot',
    iconCode: 'MdControlCamera',
    color: 'green',
    activityTemplates: [
      {
        templateId: 'if',
        displayName: 'If ... then ... else',
        description:
          'If a condition is met, then execute a set of activities, otherwise execute another set of activities',
        iconCode: 'AiOutlineBranches',
        service: 'If/Else',
        type: 'gateway',
        arguments: {
          Condition: {
            type: 'expression.logic',
            value: {
              left: {
                type: 'string',
                value: '',
              },
              right: {
                type: 'string',
                value: '',
              },
              operator: {
                type: 'operator.logic',
                value: null,
              },
            },
          },
        },
        return: null,
      },
      {
        templateId: 'for_each',
        displayName: 'For each ... in ...',
        description: 'Execute a set of activities for each item in a list',
        iconCode: 'ImLoop2',
        service: 'For Each',
        type: 'subprocess',
        arguments: {
          List: {
            type: 'expression.list',
            value: null,
          },
          Item: {
            type: 'string',
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
    color: 'blue',
    activityTemplates: [
      {
        templateId: 'use_browser',
        displayName: 'Use browser',
        description: 'Open a browser and use it to execute a set of activities',
        iconCode: 'GoBrowser',
        service: 'Browser',
        type: 'subprocess',
        arguments: {},
        return: null,
      },
      {
        templateId: 'go_to_url',
        displayName: 'Go to URL',
        description: 'Go to a given URL in the current browser tab',
        iconCode: 'GoBrowser',
        service: 'Browser',
        type: 'activity',
        arguments: {
          URL: {
            type: 'string',
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
        service: 'Browser',
        type: 'activity',
        arguments: {
          Element: {
            type: 'expression.element',
            value: null,
          },
        },
        return: null,
      },
      {
        templateId: 'type',
        displayName: 'Type',
        description:
          'Type a given text into a given element in the current browser tab',
        iconCode: 'FaKeyboard',
        service: 'Browser',
        type: 'activity',
        arguments: {
          Element: {
            type: 'expression.element',
            value: null,
          },
          Text: {
            type: 'string',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'wait',
        displayName: 'Wait',
        description: 'Wait for a given amount of time',
        iconCode: 'FaClock',
        service: 'Browser',
        type: 'activity',
        arguments: {
          Time: {
            type: 'expression.time',
            value: null,
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
        service: 'Browser',
        type: 'activity',
        arguments: {
          Element: {
            type: 'expression.element',
            value: null,
          },
        },
        return: {
          text: null,
        },
      },
    ],
  },
  {
    _id: 'document_automation',
    displayName: 'Document automation',
    color: 'yellow',
    description:
      'Help you automate tasks related to documents (traditional paper documents or digital documents like PDFs) with the help of AI',
    iconCode: 'FaFileAlt',
    activityTemplates: [],
  },
];
