import ControlIcon from '@/assets/images/packages/icons8-control-100.png';
import BrowserAutomationIcon from '@/assets/images/packages/icons8-browser-64.png';
import DocumentAutomationIcon from '@/assets/images/packages/icons8-document-100.png';
import GoogleDriveIcon from '@/assets/images/services/icons8-google-drive-96.png';
import GmailIcon from '@/assets/images/services/icons8-gmail-96.png';
import GoogleSheetIcon from '@/assets/images/services/icons8-google-sheets-96.png';
import GoogleClassroomIcon from '@/assets/images/services/icons8-google-classroom-96.png';
import GoogleFormIcon from '@/assets/images/services/icons8-google-forms-96.png';
import ConditionIcon from '@/assets/images/services/icons8-rule-64.png';
import LoopIcon from '@/assets/images/services/icons8-repeat-100.png';
import NavigationIcon from '@/assets/images/services/icons8-navigation-100-2.png';
import BrowserEventIcon from '@/assets/images/services/icons8-search-in-browser-100.png';
import TextExtractionIcon from '@/assets/images/services/icons8-image-100.png';
import VariableIcon from '@/assets/images/services/icons8-variable-96.png';
import FileStorageIcon from '@/assets/images/services/icons8-file-storage-96.png';

const getDistinctService = (data: any) => {
  const services = data
    .map((template: any) => template.service)
    .filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );
  return services;
};

const getActivityByService = (data: any, service: string) => {
  const activityLists = data.filter((item: any) => item.service === service);
  return activityLists;
};

const getArgumentsByActivity = (data: any, activityName: string) => {
  const activityArgs = data.filter(
    (item: any) => item.displayName === activityName
  );
  return activityArgs;
};

const getLibrary = (packageName: string) => {
  switch (packageName) {
    case 'Google Workspace':
      return 'RPA.Cloud.Google';
    case 'Browser automation':
      return 'RPA.Browser.Playwright';
    default:
      return null;
  }
};

const getPackageIcon = (displayName: string) => {
  switch (displayName) {
    case 'Google Drive':
      return GoogleDriveIcon;
    case 'Gmail':
      return GmailIcon;
    case 'Google Sheet':
      return GoogleSheetIcon;
    case 'Google Classroom':
      return GoogleClassroomIcon;
    case 'Google Form':
      return GoogleFormIcon;
    case 'Control':
      return ControlIcon;
    case 'Browser automation':
      return BrowserAutomationIcon;
    case 'Document automation':
      return DocumentAutomationIcon;
    case 'Data manipulation':
      return VariableIcon;
    case 'File storage':
      return FileStorageIcon;
    default:
      return null;
  }
};

const getServiceIcon = (serviceName: string) => {
  switch (serviceName) {
    case 'Google Drive':
      return GoogleDriveIcon;
    case 'Gmail':
      return GmailIcon;
    case 'Google Sheet':
      return GoogleSheetIcon;
    case 'Condition':
      return ConditionIcon;
    case 'Loop':
      return LoopIcon;
    case 'Navigation':
      return NavigationIcon;
    case 'Browser Event':
      return BrowserEventIcon;
    case 'OCR':
      return TextExtractionIcon;
    default:
      return null;
  }
};

export {
  getDistinctService,
  getActivityByService,
  getArgumentsByActivity,
  getLibrary,
  getPackageIcon,
  getServiceIcon,
};
