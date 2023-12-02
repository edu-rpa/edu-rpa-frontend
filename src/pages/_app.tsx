import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import '@/styles/global.css';
import theme from '@/utils/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { useRouter } from 'next/router';
import HeaderLayout from '@/components/Layouts/HeaderLayout';
import SidebarLayout from '@/components/Layouts/SidebarLayout';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: React.ReactElement) => React.ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const useGetLayout = () => {
    const router = useRouter();
    const path = router.pathname;
    const sidebarRoutes = [
      '/home',
      '/studio',
      '/robot',
      '/profile',
      '/service',
      '/storage',
    ];
    if (path.startsWith('/auth')) {
      return HeaderLayout;
    } else if (sidebarRoutes.includes(path)) {
      return SidebarLayout;
    } else {
      return DefaultLayout;
    }
  };

  const Layout = useGetLayout();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
