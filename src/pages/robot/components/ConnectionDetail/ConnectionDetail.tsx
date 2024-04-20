import connectionApi from '@/apis/connectionApi';
import ConnectionTable from '@/components/Connection/ConnectionTable';
import { useToast } from '@chakra-ui/react';
import { Connection } from 'bpmn-js/lib/model/Types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';

interface ConnectionProps {
  robotID: string;
}

export default function ConnectionDetail(props: ConnectionProps) {
  const router = useRouter();
  const toast = useToast();
  const [connectionData, setConnectionData] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = router.query.error;
  const successMessage = router.query.message;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await connectionApi.getAllConnectionsByRobotKey(
          props.robotID
        );
        const res = data.map((i) => _.omit(i, ['connectionKey']) as Connection);
        setConnectionData(res);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: `Error: ${errorMessage}`,
        status: 'error',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [errorMessage]);

  useEffect(() => {
    if (successMessage) {
      toast({
        title: `Success: ${successMessage}`,
        status: 'success',
        position: 'top-right',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [successMessage]);

  const tableProps = {
    header: ['Service', 'Connection name', 'Created at', 'Status', 'Action'],
    data: connectionData,
  };

  return (
    <div>
      {tableProps.data.length > 0 && (
        <div className="w-90 m-auto">
          <ConnectionTable {...tableProps} isLoading={isLoading} />
        </div>
      )}
    </div>
  );
}
