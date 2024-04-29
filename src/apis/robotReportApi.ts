import apiBase from './config';

const getRobotLogDetail = async (
  streamID: string,
  processID: string,
  version: number
) => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/robot-report/detail?streamID=${streamID}&processID=${processID}&version=${version}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const getReportOverall = async (
  processID: string,
  version: number,
  passed: number,
  date?: string
) => {
  let url = `${process.env.NEXT_PUBLIC_DEV_API}/robot-report/overall?processID=${processID}&version=${version}&passed=${passed}`;

  if (date) {
    url += `&date=${date}`;
  }

  return await apiBase.get(url).then((res: any) => {
    return res.data;
  });
};

const getReportAverageTime = async (
  processID: string,
  version: number,
  passed: number,
  date?: string
) => {
  let url = `${process.env.NEXT_PUBLIC_DEV_API}/robot-report/overall/average?processID=${processID}&version=${version}&passed=${passed}`;

  if (date) {
    url += `&date=${date}`;
  }

  return await apiBase.get(url).then((res: any) => {
    return res.data;
  });
};

const getReportGroupPassed = async (
  processID: string,
  version: number,
  date?: string
) => {
  let url = `${process.env.NEXT_PUBLIC_DEV_API}/robot-report/overall/group-passed?processID=${processID}&version=${version}`;

  if (date) {
    url += `&date=${date}`;
  }

  return await apiBase.get(url).then((res: any) => {
    return res.data;
  });
};

const getReportGroupError = async (
  processID: string,
  version: number,
  date?: string
) => {
  let url = `${process.env.NEXT_PUBLIC_DEV_API}/robot-report/overall/group-error?processID=${processID}&version=${version}`;

  if (date) {
    url += `&date=${date}`;
  }

  return await apiBase.get(url).then((res: any) => {
    return res.data;
  });
};

const getReportDetailFailures = async (
  processID: string,
  version: number,
  date?: string
) => {
  let url = `${process.env.NEXT_PUBLIC_DEV_API}/robot-report/overall/failures?processID=${processID}&version=${version}`;

  if (date) {
    url += `&date=${date}`;
  }
  return await apiBase.get(url).then((res: any) => {
    return res.data;
  });
};

const robotReportApi = {
  getRobotLogDetail,
  getReportOverall,
  getReportAverageTime,
  getReportGroupPassed,
  getReportGroupError,
  getReportDetailFailures,
};

export default robotReportApi;
