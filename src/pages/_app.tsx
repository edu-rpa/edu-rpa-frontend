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
import { PubNubProvider } from 'pubnub-react';
import PubNub from 'pubnub';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (_page: React.ReactElement) => React.ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  const pubnub = new PubNub({
    subscribeKey: process.env.NEXT_PUBLIC_PUBNUB_SUBSCRIBE_KEY,
    userId: 'user',
  });
  const useGetLayout = () => {
    const router = useRouter();
    const path = router.pathname;
    const sidebarRoutes = [
      '/home',
      '/studio',
      '/robot',
      '/profile',
      '/integration-service',
      '/storage',
      '/document-template',
    ];
    if (path.startsWith('/auth') || path == '/') {
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
          <PubNubProvider client={pubnub}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </PubNubProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
