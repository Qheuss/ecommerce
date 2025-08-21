import type { Book } from '@/data/books';
import { createContext, useContext } from 'react';

interface BooksContextType {
  books: Book[];
  loading: boolean;
  refetch: () => void;
}

export const BooksContext = createContext<BooksContextType | undefined>(
  undefined
);

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context)
    throw new Error('useBooks must be used within BooksContextProvider');
  return context;
};
