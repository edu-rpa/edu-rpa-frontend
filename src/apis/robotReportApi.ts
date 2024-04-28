import apiBase from './config';

const getRobotLogDetail = async (
  streamID: string,
  processID: string,
  version: number
) => {
  return await apiBase
    .get(
      `${process.env.NEXT_PUBLIC_DEV_API}/robot-report/run-detail/${streamID}/${processID}/${version}`
    )
    .then((res: any) => {
      return res.data;
    });
};

const robotReportApi = {
  getRobotLogDetail,
};

export default robotReportApi;
