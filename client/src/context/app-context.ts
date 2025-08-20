import { createContext, useContext } from 'react';

export interface AppContextType {
  user: boolean;
  setUser: (user: boolean) => void;
  isSeller: boolean;
  setIsSeller: (isSeller: boolean) => void;
  showUserLogin: boolean;
  setShowUserLogin: (showUserLogin: boolean) => void;
  navigate: (path: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
