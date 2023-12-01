import React, { ReactNode } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { homeSelector } from '@/redux/selector';
import Navbar from '../Header/Navbar';

interface Props {
  children?: ReactNode;
}

function Layout({ children }: Props) {
  const { isLogin } = useSelector(homeSelector);
  return (
    <div>
      {!isLogin ? <Header /> : <Navbar />}
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
