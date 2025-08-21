import { useEffect, useState } from 'react';
import { type Book } from '@/data/books';
import { BooksContext } from './books-context';

export const BooksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:4000/books');
      const data: Book[] = await res.json();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, loading, refetch: fetchBooks }}>
      {children}
    </BooksContext.Provider>
  );
};
