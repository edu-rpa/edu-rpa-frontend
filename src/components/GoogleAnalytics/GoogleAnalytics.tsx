import React from 'react';
import Script from 'next/script';

interface GAProps {
  gaID: string;
}

const GoogleAnalytics = (props: GAProps) => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${props.gaID}`}
      />

      <Script id="" strategy="lazyOnload">
        {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${props.gaID}', {
              page_path: window.location.pathname,
              });
          `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;
