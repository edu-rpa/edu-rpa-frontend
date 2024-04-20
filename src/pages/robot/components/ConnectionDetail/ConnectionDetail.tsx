import { Connection } from 'bpmn-js/lib/model/Types';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function ConnectionDetail() {
  const router = useRouter();
  const [connectionData, setConnectionData] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tableProps = {
    header: ['Service', 'Connection name', 'Created at', 'Status', 'Action'],
    data: connectionData,
  };
  const errorMessage = router.query.error;
  const successMessage = router.query.message;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       let data = await connectionApi.queryConnections();
  //       data = data.map((i) => _.omit(i, ['connectionKey']) as Connection);
  //       setConnectionData(data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  return <div>ConnectionDetail</div>;
}
