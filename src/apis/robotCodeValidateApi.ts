import apiBase from "./config";

const dryrun = (code: any) => {
    return apiBase
      .post(`${process.env.NEXT_PUBLIC_ROBOT_VALIDATE_API_URL}/robot/dryrun`, code)
      .then((res: any) => {
        return res.data;
      });
  };

const handleCheckDryrunError = (response: any) => {
  if(response.robotDetail.stats.failed) {
    return true
  }
  return false
}

export {
    dryrun,
    handleCheckDryrunError
}