import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';
import PrivateRoute from '../Routes/PrivateRoutes';

interface Props {
  children?: React.ReactNode;
}

export default function SidebarLayout({ children }: Props) {
  return (
    <PrivateRoute>
      <Sidebar>{children}</Sidebar>
      <Footer />
    </PrivateRoute>
  );
}
