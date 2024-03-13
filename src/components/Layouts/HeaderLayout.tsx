import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PrivateRoute from '../Routes/PrivateRoutes';

interface Props {
  children?: React.ReactNode;
}

function HeaderLayout({ children }: Props) {
  return (
    <PrivateRoute>
      <Header />
      {children}
      <Footer />
    </PrivateRoute>
  );
}

export default HeaderLayout;
