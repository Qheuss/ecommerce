import { useState } from 'react';
import { type Book } from '@/data/books';

interface GoogleBookVolumeInfo {
  title: string;
  authors?: string[];
  description?: string;
  imageLinks?: {
    thumbnail?: string;
    smallThumbnail?: string;
  };
  averageRating?: number;
  categories?: string[];
}

interface GoogleBookItem {
  id: string;
  volumeInfo: GoogleBookVolumeInfo;
}

interface GoogleBooksResponse {
  items?: GoogleBookItem[];
}

const AdminBookSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}&langRestrict=en&maxResults=40`
      );
      const data: GoogleBooksResponse = await res.json();

      const books: Book[] =
        data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors?.[0] ?? 'Unknown Author',
          description:
            item.volumeInfo.description ?? 'No description available.',
          cover:
            item.volumeInfo.imageLinks?.thumbnail ??
            'https://via.placeholder.com/150x200.png?text=No+Cover',
          rating: item.volumeInfo.averageRating,
          category: item.volumeInfo.categories?.[0] ?? 'Other',
        })) ?? [];

      setResults(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book: Book) => {
    await fetch('http://localhost:4000/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    });
    alert(`${book.title} added to your library`);
  };

  return (
    <div className='p-4 border rounded'>
      <h2 className='text-xl font-bold mb-2'>Admin Book Search</h2>

      <div className='flex gap-2 mb-4'>
        <input
          type='text'
          placeholder='Search for a book...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className='border p-2 flex-1'
        />
        <button
          onClick={searchBooks}
          className='bg-blue-600 text-white px-4 py-2 rounded'
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <ul className='space-y-4'>
        {results.map((book) => (
          <li key={book.id} className='border p-2 rounded flex gap-4'>
            <img
              src={book.cover}
              alt={book.title}
              className='w-20 h-28 object-cover'
            />
            <div className='flex-1'>
              <h3 className='font-semibold'>{book.title}</h3>
              <p className='text-sm text-gray-600'>{book.author}</p>
              <p className='text-xs mt-1'>{book.description}</p>
              {book.rating !== undefined && (
                <p className='text-yellow-600 text-sm mt-1'>
                  ⭐ {book.rating.toFixed(1)} / 5
                </p>
              )}
              <p className='text-xs mt-1 italic'>Category: {book.category}</p>
              <button
                onClick={() => addBook(book)}
                className='mt-2 bg-green-600 text-white px-3 py-1 rounded'
              >
                Add to Library
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBookSearch;
