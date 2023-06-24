import { CartContextProvider } from '@/components/CartContext';
import { SessionProvider } from 'next-auth/react';
import { Poppins } from 'next/font/google';
import { createGlobalStyle } from 'styled-components';

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400'
});

const GlobalStyles = createGlobalStyle`

  body {
    background-color: #eee;
    padding: 0;
    margin: 0;
  }

  hr {
    display: block;
    border: 0;
    border-top: 1px solid #ccc;
  }
`;

export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  return (
    <main className={poppins.className}>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </main>
  );
}
