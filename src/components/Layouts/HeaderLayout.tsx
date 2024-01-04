import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface Props {
  children?: React.ReactNode;
}

function HeaderLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default HeaderLayout;
