import { useBooksStore } from '@/stores/books.store';
import { useParams } from 'react-router-dom';

const BookPage = () => {
  const books = useBooksStore((s) => s.books);
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === id);

  if (!book) {
    return <p className='p-4'>Book not found</p>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-2'>{book.title}</h1>
      <h2 className='text-lg text-gray-600 mb-4'>by {book.author}</h2>
      <p>{book.description}</p>
    </div>
  );
};

export default BookPage;
