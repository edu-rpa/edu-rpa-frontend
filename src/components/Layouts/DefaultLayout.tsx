import React from 'react';
import PrivateRoute from '../Routes/PrivateRoutes';

interface Props {
  children?: React.ReactNode;
}

export default function DefaultLayout({ children }: Props) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
