export const generateProcessID = () => {
  return (
    'Process_' +
    Array.from({ length: 7 }, () =>
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.charAt(
        Math.floor(Math.random() * 62)
      )
    ).join('')
  );
};

export const getProcessFromLocalStorage = (processID: string) => {
  return JSON.parse(localStorage.getItem('processList') as string).find(
    (process: any) => process.processID === processID
  );
};

export const getActivityInProcess = (processID: string, activtyID: string) => {
  return JSON.parse(localStorage.getItem('processList') as string)
    .find((process: any) => process.processID === processID)
    .activites.find((activty: any) => activty.activityID === activtyID);
};
