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

export {
  getDistinctService,
  getActivityByService,
  getArgumentsByActivity,
  getLibrary,
};
