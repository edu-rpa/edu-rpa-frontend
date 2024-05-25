export const LibrabryConfigurations = {
  "EduRPA.Document": {
    "lang": "vi",
    "performance": "fast" 
  }
}
export const ActivityPackages = [
  // Drive
  {
    _id: 'google_drive',
    displayName: 'Google Drive',
    description: 'Help you integrate your work with Google Drive',
    library: 'RPA.Cloud.Google',
    activityTemplates: [
      {
        templateId: 'google_drive.set_up_connection',
        displayName: 'Setup Drive Connection',
        description: 'Set up drive connection for following task',
        iconCode: 'FaEnvelope',
        type: 'activity',
        keyword: 'Init Drive',
        arguments: {
          Connection: {
            type: 'connection.Google Drive',
            keywordArg: 'token_file',
            provider: 'Google Drive',
            description: 'Your connection ID with Google Drive',
            value: null,
          },
        },
      },
      {
        templateId: 'drive.create_folder',
        displayName: 'Create folder',
        description: 'Create a Google Drive folder in a given directory',
        iconCode: 'FaGoogleDrive',
        type: 'activity',
        keyword: 'Create Drive Directory',
        arguments: {
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
          type: 'dictionary',
          description:
            'The created folder. This is a dictionary, contains: id (folder id), url (folder url)',
        },
      },
      {
        templateId: 'drive.dowload_files',
        displayName: 'Dowload Files',
        description: 'Dowload Files From Drive Folders',
        iconCode: 'FaGoogleDrive',
        type: 'activity',
        keyword: 'Download Drive Files',
        arguments: {
          'Folder name': {
            type: 'string',
            description: 'The name of the folder',
            keywordArg: 'source',
            value: '',
          },
          Query: {
            type: 'string',
            description: 'Define the file type to dowload',
            keywordArg: 'query',
            value: '',
          },
        },
        return: {
          displayName: 'Files',
          type: 'list',
          description: "List of dowloaded files 's name",
        },
      },
      {
        templateId: 'drive.upload_file',
        displayName: 'Upload file',
        description: "Upload a file from robot's file system to Google Drive",
        iconCode: 'FaGoogleDrive',
        type: 'activity',
        keyword: 'Upload Drive File',
        arguments: {
          'File name': {
            type: 'string',
            keywordArg: 'filename',
            value: '',
          },
          'Folder Path': {
            type: 'string',
            keywordArg: 'folder',
            value: '',
          },
          Overwrite: {
            type: 'boolean',
            keywordArg: 'overwrite',
            value: false,
          },
          'Make Folder': {
            type: 'boolean',
            keywordArg: 'make_dir',
            value: false,
          },
        },
        return: {
          displayName: 'File id',
          type: 'string',
          description: 'The uploaded file id',
        },
      },
      {
        templateId: 'drive.get_file_list_in_folder',
        displayName: 'Get file list in folder',
        description: 'Get a list of files in a given folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        type: 'activity',
        keyword: 'Search Drive Files',
        arguments: {
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
        type: 'activity',
        keyword: 'Get Drive File By Id',
        arguments: {
          ID: {
            type: 'string',
            description: 'The ID of folder or file',
            keywordArg: 'file_id',
            value: '',
          },
        },
        return: {
          displayName: 'File/Folder',
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
        type: 'activity',
        keyword: 'Delete Drive File',
        arguments: {
          ID: {
            type: 'string',
            description: 'The ID of folder or file',
            keywordArg: 'file_id',
            value: '',
          },
        },
        return: {
          displayName: 'Number of deleted',
          type: 'number',
          description: 'The number of deleted files/folders',
        },
      },
      {
        templateId: 'drive.move_file_folder',
        displayName: 'Move file/folder',
        description: 'Move a file/folder to another folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        type: 'activity',
        keyword: 'Move Drive File',
        arguments: {
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
          type: 'list',
          description: 'A list of files/folders id',
        },
      },
      {
        templateId: 'drive.share_file_folder',
        displayName: 'Share a file/folder',
        description: 'Share a file/folder in Google Drive',
        iconCode: 'FaGoogleDrive',
        type: 'activity',
        keyword: 'Add Drive Share',
        arguments: {
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
          type: 'dictionary',
          description:
            'The share response. This is a dictionary, contains: file_id, permission_id',
        },
      },
    ],
  },
  // Gmail
  {
    _id: 'gmail',
    displayName: 'Gmail',
    description: 'Help you integrate your work with Gmail',
    library: 'RPA.Cloud.Google',
    activityTemplates: [
      {
        templateId: 'gmail.set_up_connection',
        displayName: 'Setup Gmail Connection',
        description: 'Set up Gmail connection for following task',
        iconCode: 'FaEnvelope',
        type: 'activity',
        keyword: 'Init Gmail',
        arguments: {
          Connection: {
            type: 'connection.Gmail',
            keywordArg: 'token_file',
            provider: 'Gmail',
            description: 'Your connection ID with Gmail',
            value: null,
          },
        },
      },
      {
        templateId: 'gmail.send_email',
        displayName: 'Send email',
        description: 'Send an email to other people using Gmail',
        iconCode: 'FaEnvelope',
        type: 'activity',
        keyword: 'Send Message',
        arguments: {
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
          type: 'dictionary',
          description:
            'The sent message. This is a dictionary, contains: id (message id), threadId (message thread id)',
        },
      },
      {
        templateId: 'gmail.list_emails',
        displayName: 'Get list emails',
        description: 'List emails in a given folder in Gmail',
        iconCode: 'FaEnvelope',
        type: 'activity',
        keyword: 'List Messages',
        arguments: {
          'Email Folder Path': {
            type: 'string',
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
          type: 'list',
          description:
            'A list of emails. Each email is a dictionary, contains: id (email id), from (email from), to (email to), cc (email cc), bcc (email bcc), subject (email subject), body (email body), attachments (email attachments)',
        },
      },
    ],
  },
  //Sheets
  {
    _id: 'google_sheets',
    displayName: 'Google Sheet',
    description: 'Help you integrate your work with Google Sheets',
    library: 'RPA.Cloud.Google',
    activityTemplates: [
      {
        templateId: 'google_sheets.set_up_connection',
        displayName: 'Setup Google Sheet Connection',
        description: 'Set up Google Sheet connection for following task',
        iconCode: 'FaEnvelope',
        type: 'activity',
        keyword: 'Init Sheets',
        arguments: {
          Connection: {
            type: 'connection.Google Sheets',
            keywordArg: 'token_file_path',
            provider: 'Google Sheets',
            description: 'Your connection ID with Google Sheet',
            value: null,
          },
        },
      },
      {
        templateId: 'sheet.create_spreadsheet',
        displayName: 'Create SpreadSheet',
        description: 'Create SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        type: 'activity',
        keyword: 'Create Spreadsheet',
        arguments: {
          'SpreadSheet Name': {
            type: 'string',
            description: 'The spread sheet name',
            keywordArg: 'title',
            value: '',
          },
        },
        return: {
          displayName: 'SpreadSheet ID',
          type: 'string',
          description: 'The created spreadsheet id',
        },
      },
      {
        templateId: 'sheet.get_spreadsheet_by_id',
        displayName: 'Get SpreadSheet By Id',
        description: 'Get SpreadSheet By Id in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        type: 'activity',
        keyword: 'Get Spreadsheet Basic Information',
        arguments: {
          'SpreadSheet ID': {
            type: 'string',
            description: 'The ID of spread sheet',
            keywordArg: 'spreadsheet_id',
            value: '',
          },
        },
        return: {
          displayName: 'SpreadSheet',
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
        type: 'activity',
        keyword: 'Create Sheet',
        arguments: {
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
        return: {
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result as an dictionary',
        },
      },
      {
        templateId: 'sheet.delete_sheet',
        displayName: 'Delete sheet',
        description: 'Delete sheet from a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        type: 'activity',
        keyword: 'Delete Sheet',
        arguments: {
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
        return: {
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result as an dictionary',
        },
      },
      {
        templateId: 'sheet.rename_sheet',
        displayName: 'Rename sheet',
        description: 'Rename sheet of a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        type: 'activity',
        keyword: 'Rename Sheet',
        arguments: {
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
        return: {
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result as an dictionary',
        },
      },
      {
        templateId: 'sheet.write_data_to_sheet',
        displayName: 'Write Data To Sheet',
        description:
          'Write Data To Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        type: 'activity',
        keyword: 'Update Sheet Values',
        arguments: {
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
            type: 'string',
            description: 'The data written to the sheet',
            keywordArg: 'values',
            value: [],
          },
        },
        return: {
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result',
        },
      },
      {
        templateId: 'sheet.read_data_from_sheet',
        displayName: 'Read Data From Sheet',
        description:
          'Read Data From Sheet in a given SpreadSheet in Google Sheet',
        iconCode: 'FaFileSpreadsheet',
        type: 'activity',
        keyword: 'Get Sheet Values',
        arguments: {
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
        type: 'activity',
        keyword: 'Clear Sheet Values',
        arguments: {
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
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result',
        },
      },
    ],
  },
  // Classroom
  {
    _id: 'google_classroom',
    displayName: 'Google Classroom',
    description: 'Help you integrate your work with Google Classroom',
    library: 'EduRPA.Google',
    activityTemplates: [
      {
        templateId: 'google_classroom.set_up_connection',
        displayName: 'Setup Google Classroom Connection',
        description: 'Set up Google Classroom connection for following task',
        iconCode: 'FaEnvelope',
        type: 'activity',
        keyword: 'Set Up Classroom Connection',
        arguments: {
          Librabry: {
            type: 'string',
            value: 'EduRPA.Google',
            description: 'Librabry for setup OAuth token',
            hidden: true,
          },
          Connection: {
            type: 'connection.Google Classroom',
            description: 'Your connection ID with Google Classroom',
            keywordArg: 'token_file_path',
            provider: 'Google Classroom',
            value: null,
          },
        },
      },
      {
        templateId: 'create_course',
        displayName: 'Create Course',
        description: 'Create new course for teacher',
        type: 'activity',
        keyword: 'Create Course',
        arguments: {
          'Course Name': {
            type: 'string',
            keywordArg: 'name',
            description: 'Name of the created course',
            value: '',
          },
          'Teacher Email': {
            type: 'string',
            keywordArg: 'ownerId',
            description: 'Email of teacher you would to invite',
            value: '',
          },
        },
        return: {
          displayName: 'Course ID',
          type: 'string',
          description: 'The ID of the course',
        },
      },
      {
        templateId: 'list_classrooms',
        displayName: 'List Classrooms',
        description: 'List Classrooms',
        type: 'activity',
        keyword: 'List Classrooms',
        arguments: {},
        return: {
          displayName: 'List of Classrooms',
          type: 'list',
          description: 'List of dictionary of course object with {name, id}',
        },
      },
      {
        templateId: 'delete_course_by_id',
        displayName: 'Delete Classroom',
        description: 'Delete Classroom',
        type: 'activity',
        keyword: 'Delete Classroom',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
        },
        return: {
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result',
        },
      },
      {
        templateId: 'get_course_id_by_course_name',
        displayName: 'Get Course ID By Course Name',
        description: 'Get ID of the course by course name',
        type: 'activity',
        keyword: 'Get Course ID By Course Name',
        arguments: {
          'Course Name': {
            type: 'string',
            keywordArg: 'course_name',
            description: 'Name of the course',
            value: '',
          },
        },
        return: {
          displayName: 'Course ID',
          type: 'string',
          description: 'The ID of the course',
        },
      },
      {
        templateId: 'invite_student_course',
        displayName: 'Invite Students To Classroom',
        description: 'Invite Students To Classroom',
        type: 'activity',
        keyword: 'Invite Students To Classroom',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
          'List of student emails': {
            type: 'list',
            keywordArg: 'studentEmails',
            description: 'List of student emails',
            value: '',
          },
        },
        return: {
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result',
        },
      },
      {
        templateId: 'create_assignment',
        displayName: 'Create Assignment',
        description: 'Create Assignment in a course of Google Classroom',
        type: 'activity',
        keyword: 'Create Assignment',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
          'Assignment Title': {
            type: 'string',
            keywordArg: 'title',
            description: 'Title of the assignment',
            value: '',
          },
          'Assignment Description': {
            type: 'string',
            keywordArg: 'description',
            description: 'Description of the assignment',
            value: '',
          },
          'Assignment URL': {
            type: 'list',
            keywordArg: 'linkMaterials',
            description: 'URL of the assignment',
            value: '',
          },
          'Due Date': {
            type: 'string',
            keywordArg: 'dueDate',
            description: 'Due date of the assignment',
            value: '',
          },
          'Due Time': {
            type: 'string',
            keywordArg: 'dueTime',
            description: 'Due time of the assignment',
            value: '',
          },
        },
        return: {
          displayName: 'ID of Course Assignment',
          type: 'string',
          description: 'The ID of Course Assignment',
        },
      },
      {
        templateId: 'create_quiz_classroom',
        displayName: 'Create Quiz',
        description: 'Create Quiz in a course of Google Classroom',
        type: 'activity',
        keyword: 'Create Quiz',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
          'Quiz Title': {
            type: 'string',
            keywordArg: 'title',
            description: 'Title of the quiz',
            value: '',
          },
          'Quiz Description': {
            type: 'string',
            keywordArg: 'description',
            description: 'Description of the quiz',
            value: '',
          },
          'Quiz URL': {
            type: 'string',
            keywordArg: 'quizUrl',
            description: 'URL of the quiz',
            value: '',
          },
          'Max Points': {
            type: 'number',
            keywordArg: 'maxPoints',
            description: 'Maximum points of the quiz',
          },
          'Due Date (Optional)': {
            type: 'string',
            keywordArg: 'dueDate',
            description: 'Due date of the assignment',
            value: '',
          },
          'Due Time (Optional)': {
            type: 'string',
            keywordArg: 'dueTime',
            description: 'Due time of the assignment',
            value: '',
          },
        },
        return: {
          displayName: 'ID of Course Quiz',
          type: 'string',
          description: 'The ID of Course Quiz',
        },
      },
      {
        templateId: 'list_course_work',
        displayName: 'List Coursework',
        description: 'List Coursework',
        type: 'activity',
        keyword: 'List Coursework',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
        },
        return: {
          displayName: 'List of Coursework In Course',
          type: 'list',
          description: 'List of Coursework In Course',
        },
      },
      {
        templateId: 'get_coursework_id_by_title',
        displayName: 'Get Coursework ID By Title',
        description: 'Get Coursework ID By Title',
        type: 'activity',
        keyword: 'Get Coursework ID By Title',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
          'Course Title': {
            type: 'string',
            keywordArg: 'title',
            description: 'Title of the course',
            value: '',
          },
        },
        return: {
          displayName: 'Coursework ID of the course',
          type: 'string',
          description: 'Coursework ID of the course',
        },
      },
      {
        templateId: 'delete_coursework',
        displayName: 'Delete Coursework',
        description: 'Delete Coursework',
        type: 'activity',
        keyword: 'Delete Coursework',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
          'Coursework ID': {
            type: 'string',
            keywordArg: 'courseworkId',
            description: 'ID of the course work',
            value: '',
          },
        },
        return: {
          displayName: 'Result',
          type: 'dictionary',
          description: 'Operation result',
        },
      },
      {
        templateId: 'list_student_submissions',
        displayName: 'List Student Submissions',
        description: 'List Student Submissions',
        type: 'activity',
        keyword: 'List Student Submissions',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
          'Coursework ID': {
            type: 'string',
            keywordArg: 'courseworkId',
            description: 'ID of the coursework',
            value: '',
          },
        },
        return: {
          displayName: 'Student submissions',
          type: 'list',
          description: 'List of student submissions of the coursework',
        },
      },
      {
        templateId: 'get_submission_id_by_email',
        displayName: 'Get Submission ID By Email',
        description: 'Get Submission ID By Email',
        type: 'activity',
        keyword: 'Get Submission ID By Email',
        arguments: {
          'Course ID': {
            type: 'string',
            keywordArg: 'courseId',
            description: 'ID of the course',
            value: '',
          },
          'Coursework ID': {
            type: 'string',
            keywordArg: 'courseworkId',
            description: 'ID of the coursework',
            value: '',
          },
          'Student Email': {
            type: 'string',
            keywordArg: 'studentEmail',
            description: 'Email of the student',
            value: '',
          },
        },
        return: {
          displayName: 'ID of the submission',
          type: 'string',
          description: 'ID of the submission',
        },
      },
    ],
  },
  // Form
  {
    _id: 'google_form',
    displayName: 'Google Form',
    description: 'Help you integrate your work with Google Form',
    library: 'EduRPA.Google',
    activityTemplates: [
      {
        templateId: 'google_form.set_up_connection',
        displayName: 'Setup Google Form Connection',
        description: 'Set up Google Form connection for following task',
        iconCode: 'FaEnvelope',
        type: 'activity',
        keyword: 'Set Up Form Connection',
        arguments: {
          Librabry: {
            type: 'string',
            value: 'EduRPA.Google',
            description: 'Librabry for setup OAuth token',
            hidden: true,
          },
          Connection: {
            type: 'connection.Google Form',
            keywordArg: 'token_file_path',
            description: 'Your connection ID with Google Form',
            provider: 'Google Forms',
            value: null,
          },
        },
      },
      {
        templateId: 'create_quiz_form',
        displayName: 'Create Quiz Form',
        description: 'Create quiz in google form',
        type: 'activity',
        keyword: 'Create Form',
        arguments: {
          'Form Name': {
            type: 'string',
            keywordArg: 'title',
            description: 'Name of Google Form',
            value: '',
          },
        },
        return: {
          displayName: 'ID of created quiz form',
          type: 'string',
          description: 'The ID of created quiz form',
        },
      },
      {
        templateId: 'get_doc_id',
        displayName: 'Get Google Doc ID From URL',
        description: 'Get Google Doc ID from URL',
        type: 'activity',
        keyword: 'Get Google Doc ID',
        arguments: {
          URL: {
            type: 'string',
            keywordArg: 'url',
            description: 'URL of Google Doc',
            value: '',
          },
        },
        return: {
          displayName: 'ID of Google Doc',
          type: 'string',
          description: 'The ID of Google Doc',
        },
      },
      {
        templateId: 'transfer_quiz',
        displayName: 'Transfer Google Doc To Google',
        description: 'Transfer quiz from google doc to google form',
        type: 'activity',
        keyword: 'Add Questions And Answers From Google Doc To Form',
        arguments: {
          DocID: {
            type: 'string',
            keywordArg: 'doc_id',
            description: 'ID of Google Doc',
            value: '',
          },
          FormID: {
            type: 'string',
            keywordArg: 'form_id',
            description: 'ID of Google Form',
            value: '',
          },
        },
        return: {
          displayName: 'The link of Google Form',
          type: 'string',
          description: 'The link of Google Form',
        },
      },
    ],
  },
  {
    _id: 'control',
    displayName: 'Control',
    description: 'Help you control the execution flow of your robot',
    activityTemplates: [
      {
        templateId: 'if',
        displayName: 'If/Else',
        description:
          'If a condition is met, then execute a set of activities, otherwise execute another set of activities',
        iconCode: 'AiOutlineBranches',
        type: 'gateway',
        arguments: {
          Condition: {
            type: 'list.condition',
            description: 'List of condition',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'for_each',
        displayName: 'For each',
        description: 'Execute a set of activities for each item in a list',
        iconCode: 'ImLoop2',
        type: 'subprocess',
        arguments: {
          LoopType: {
            type: 'string',
            value: 'for_each',
            description: 'Type to parse loop',
            hidden: true,
          },
          Item: {
            type: 'string',
            description: 'Iterate Variable',
            value: '',
          },
          List: {
            type: 'list',
            description: 'Iterate Struture',
            value: '',
          },
        },
      },
      {
        templateId: 'for_range',
        displayName: 'For Value In Range',
        description: 'Execute a set of activities for each item in range',
        iconCode: 'ImLoop2',
        type: 'subprocess',
        arguments: {
          LoopType: {
            type: 'string',
            value: 'for_range',
            description: 'Type to parse loop',
            hidden: true,
          },
          Item: {
            type: 'string',
            description: 'Iterate Variable',
            value: '',
          },
          Start: {
            type: 'number',
            description: 'start value',
            value: '',
          },
          End: {
            type: 'number',
            description: 'start value',
            value: '',
          },
        },
      },
    ],
  },
  {
    _id: 'data_manipulation',
    displayName: 'Data manipulation',
    description: 'Help you manipulate data in your robot',
    library: "Collections",
    activityTemplates: [
      {
        templateId: 'set_variable',
        displayName: 'Set variable',
        description: 'Set the value of a variable',
        iconCode: 'FaEquals',
        type: 'activity',
        keyword: 'Set Variable',
        arguments: {
          Variable: {
            type: 'variable',
            description: 'The variable to set the value to',
            keywordArg: 'variable',
            value: '',
          },
          Value: {
            type: 'any',
            description: 'The value to set to the variable',
            keywordArg: 'value',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'add_to_list',
        displayName: 'Add to list',
        description: 'Add an item to a list',
        iconCode: 'FaListUl',
        type: 'activity',
        keyword: 'Append To List',
        arguments: {
          List: {
            type: 'list',
            description: 'The list',
            // keywordArg: 'list_',
            value: [],
          },
          Item: {
            type: 'any',
            description: 'The item to add to the list',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'remove_from_list',
        displayName: 'Remove from list',
        description: 'Remove an item from a list',
        iconCode: 'FaListUl',
        type: 'activity',
        keyword: 'Remove From List',
        arguments: {
          List: {
            type: 'list',
            description: 'The list',
            keywordArg: 'list',
            value: [],
          },
          Item: {
            type: 'any',
            description: 'The item to remove from the list',
            keywordArg: 'item',
            value: '',
          },
        },
        return: null,
      },
      {
        templateId: 'clear_list',
        displayName: 'Clear list',
        description: 'Clear all items in a list',
        iconCode: 'FaListUl',
        type: 'activity',
        keyword: 'Clear List',
        arguments: {
          List: {
            type: 'list',
            description: 'The list',
            keywordArg: 'list',
            value: [],
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
    library: 'RPA.Browser.Playwright',
    activityTemplates: [
      {
        templateId: 'go_to_url',
        displayName: 'Go to URL',
        description: 'Go to a given URL in the current browser tab',
        iconCode: 'GoBrowser',
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
    library: 'EduRPA.Document',
    activityTemplates: [
      {
        templateId: 'extract_data_from_document',
        displayName: 'Extract data from document',
        description: 'Extract data from a document using Document template',
        iconCode: 'FaFileAlt',
        type: 'activity',
        keyword: 'Extract Data From Document',
        arguments: {
          Document: {
            type: 'string',
            description: 'The document file name to extract data from',
            keywordArg: 'file_name',
            value: '',
          },
          'Document template': {
            type: 'DocumentTemplate',
            description: 'The document template',
            keywordArg: 'template',
            value: '',
          },
        },
        return: {
          displayName: 'Data',

          type: 'dictionary',
          description: 'The extracted data from the document',
        },
      },
      {
        templateId: 'generate_grade_report',
        displayName: 'Generate grade report',
        description: 'Generate a grade report from a list of extracted data',
        iconCode: 'FaFileAlt',
        type: 'activity',
        keyword: 'Create Grade Report File',
        arguments: {
          'Actual answers': {
            type: 'list',
            description: 'The list of extracted data',
            keywordArg: 'actual_answers',
            value: [],
          },
          'Correct answer': {
            type: 'dictionary',
            description: 'The correct answer',
            keywordArg: 'correct_answer',
            value: {},
          },
          'Names': {
            type: 'list',
            description: 'The list of student names',
            keywordArg: 'file_names',
            value: [],
          }
        },
        return: {
          displayName: 'Grade report file name',

          type: 'string',
          description: 'The generated grade report file name',
        },
      },
    ],
  },
  {
    _id: 'file_storage',
    displayName: 'File storage',
    description:
      "Help you store and retrieve files in the platform's file storage",
    library: 'EduRPA.Storage',
    activityTemplates: [
      {
        templateId: 'upload_file',
        displayName: 'Upload file',
        description: "Upload a file to the platform's file storage",
        iconCode: 'FaFileUpload',
        type: 'activity',
        keyword: 'Upload File',
        arguments: {
          File: {
            type: 'string',
            description: 'The file to upload',
            keywordArg: 'file',
            value: '',
          },
          'File name': {
            type: 'string',
            description: 'The name of the file',
            keywordArg: 'file_name',
            value: '',
          },
          'Folder path': {
            type: 'string',
            description: 'The path of the folder to store the file',
            keywordArg: 'folder_path',
            value: '',
          },
        },
        return: {
          displayName: 'File path',

          type: 'string',
          description: 'The uploaded file path',
        },
      },
      {
        templateId: 'download_file',
        displayName: 'Download file',
        description: "Download a file from the platform's file storage",
        iconCode: 'FaFileDownload',
        type: 'activity',
        keyword: 'Download File',
        arguments: {
          'File path': {
            type: 'string',
            description: 'The path of the file to download',
            keywordArg: 'file_path',
            value: '',
          },
          'File name': {
            type: 'string',
            description: 'The name of the file to download',
            keywordArg: 'file_name',
            value: '',
          },
        },
        return: {
          displayName: 'File name',
          type: 'string',
          description: 'The downloaded file name',
        },
      },
    ],
  },
];
