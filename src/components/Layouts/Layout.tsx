import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface Props {
  children?: ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
