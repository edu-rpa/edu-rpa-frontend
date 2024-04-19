//@ts-ignore
import { saveAs } from 'file-saver';

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const year = date.getFullYear();
  const formattedDate = day + '-' + month + '-' + year;
  return formattedDate;
};

const exportFile = (content: string, fileName: string) => {
  var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, fileName);
};

const stringifyCyclicObject = (content: any) => {
  const seen: any = [];
  return JSON.stringify(content, function (key, val) {
    if (val != null && typeof val == 'object') {
      if (seen.indexOf(val) >= 0) {
        return;
      }
      seen.push(val);
    }
    return val;
  });
};

const toastError = (toast: any, message: string) => {
  toast({
    title: 'Error',
    description: message,
    status: 'error',
    duration: 3000,
    isClosable: true,
  });
};

const toastSuccess = (toast: any, message: string) => {
  toast({
    title: 'Success',
    description: message,
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
};

const toastInfo = (toast: any, message: string) => {
  toast({
    title: 'Info',
    description: message,
    status: 'info',
    duration: 5000,
    isClosable: true,
    position: 'top-right',
    containerStyle: {
      marginTop: '100px',
    },
  });
};

export { 
  formatDate, 
  exportFile, 
  stringifyCyclicObject, 
  toastError, 
  toastSuccess,
  toastInfo
};
