import type { Book } from '@/data/books';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type BooksStoreType = {
  books: Book[];
  loading: boolean;
  fetchBooks: () => void;
  addBook: (book: Book) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
};

export const useBooksStore = create<BooksStoreType>()(
  persist(
    (set, get) => ({
      books: [],
      loading: true,

      fetchBooks: async () => {
        try {
          set({ loading: true });
          const res = await fetch('http://localhost:4000/books');
          const data: Book[] = await res.json();
          set({ books: data });
        } catch (error) {
          console.error('Failed to fetch books:', error);
        } finally {
          set({ loading: false });
        }
      },

      addBook: async (book) => {
        try {
          const state = get();
          const existingBook = state.books.find((b) => b.id === book.id);

          if (existingBook) {
            const updatedBook = {
              ...existingBook,
              stock: (existingBook.stock ?? 0) + 1,
            };
            await state.updateBook(updatedBook);
          } else {
            const newBook = { ...book, stock: 1 };

            await fetch('http://localhost:4000/books', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newBook),
            });

            await state.fetchBooks();
          }
        } catch (error) {
          console.error('Failed to add book:', error);
        }
      },

      updateBook: async (book) => {
        try {
          const res = await fetch(`http://localhost:4000/books/${book.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(book),
          });
          const updatedBook: Book = await res.json();
          set((state) => ({
            books: state.books.map((b) =>
              b.id === updatedBook.id ? updatedBook : b
            ),
          }));
        } catch (error) {
          console.error('Failed to update book:', error);
        }
      },

      deleteBook: async (id) => {
        try {
          await fetch(`http://localhost:4000/books/${id}`, {
            method: 'DELETE',
          });
          set((state) => ({
            books: state.books.filter((b) => b.id !== id),
          }));
        } catch (error) {
          console.error('Failed to delete book:', error);
        }
      },
    }),
    { name: 'books-storage' }
  )
);
