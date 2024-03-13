import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PublicRoute from '../Routes/PublicRoutes';

interface Props {
  children?: React.ReactNode;
}

function HeaderLayout({ children }: Props) {
  return (
    <PublicRoute>
      <Header />
      {children}
      <Footer />
    </PublicRoute>
  );
}

export default HeaderLayout;
