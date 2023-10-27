import { useState } from 'react';

interface IState {
  status: 'ready' | 'loading' | 'error';
  value: any;
  error: any;
}
type IAscyncFunction<T> = (...args: any[]) => Promise<T>;

type IUseAsyncResponse<T> = {
  [x: string]: any;
  execute: IAscyncFunction<T>;
  value: T | undefined;
  status: 'ready' | 'loading' | 'error';
  error: any;
};

export const useAsync = <U,>(
  asyncFunction: IAscyncFunction<U>
): IUseAsyncResponse<U> => {
  const [state, setState] = useState<IState>({
    status: 'ready',
    value: null,
    error: null,
  });

  const onSuccess = (response: any) => {
    setState((prevState) => ({
      ...prevState,
      status: 'ready',
      value: response,
    }));
    return Promise.resolve(response);
  };

  const onError = (error: any) => {
    setState((prevState) => ({
      ...prevState,
      status: 'error',
      error: error,
    }));
    return Promise.reject(error);
  };

  const execute = async (...args: any[]) => {
    setState((prevState) => ({
      ...prevState,
      status: 'loading',
    }));

    return await asyncFunction(...args)
      .then((response: any) => {
        return onSuccess(response);
      })
      .catch((error: any) => {
        return onError(error);
      });
  };

  return { execute, ...state };
};
