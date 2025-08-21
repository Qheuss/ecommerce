import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AppContextProvider } from './context/AppContextProvider.tsx';
import { CartContextProvider } from './context/CartContextProvider.tsx';
import { BooksContextProvider } from './context/BooksContextProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <BooksContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </BooksContextProvider>
      </CartContextProvider>
    </BrowserRouter>
  </StrictMode>
);
