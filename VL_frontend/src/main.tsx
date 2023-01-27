import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import customTheme from './themes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
);
