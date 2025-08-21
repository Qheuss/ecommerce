import { useState } from 'react';
import { Link } from 'react-router-dom';
import { slugify } from '@/data/books';
import Categories from '@/components/Categories';
import { FaCartShopping, FaPlus } from 'react-icons/fa6';
import { useCart } from '@/context/cart-context';
import { useBooks } from '@/context/books-context';

const BooksPage = () => {
  const { books } = useBooks();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(books.map((book) => book.category)));

  const filteredBooks = selectedCategory
    ? books.filter((book) => book.category === selectedCategory)
    : books;

  return (
    <div className='flex p-4 gap-6'>
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className='flex-1'>
        <h1 className='text-4xl font-bold mb-10 text-center'>
          {selectedCategory ? selectedCategory : 'All'} Books
        </h1>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6'>
          {filteredBooks.map((book) => (
            <li key={book.id} className='relative'>
              <Link to={`/books/${book.id}/${slugify(book.title)}`}>
                <div className='group w-full h-80 [perspective:1000px] cursor-pointer'>
                  <div className='relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
                    <div className='absolute w-full h-full [backface-visibility:hidden] rounded-lg overflow-hidden border shadow'>
                      <img
                        src={book.cover}
                        alt={book.title}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    <div className='absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg border shadow p-4 flex items-center justify-center bg-accent1 text-center'>
                      <p className='text-sm text-text'>
                        {book.description.length > 100
                          ? book.description.slice(0, 100) + '...'
                          : book.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(book);
                }}
                className='cursor-pointer absolute bottom-22 right-4 bg-accent2 w-12 flex justify-center items-center h-12 rounded-full hover:rotate-8 hover:scale-105 transition-rotate duration-150 active:scale-120 shadow-2xl'
              >
                <div className='relative mt-2 text-xl text-primary'>
                  <FaCartShopping className='mr-1' />
                  <FaPlus className='text-text absolute text-sm bottom-3.5 left-4' />
                </div>
              </button>
              <div className='flex justify-between items-center min-h-[76px] px-1'>
                <Link
                  to={`/books/${book.id}/${slugify(book.title)}`}
                  className='mt-2 text-center w-full'
                >
                  <h2 className='text-md font-semibold'>
                    {book.title.length > 50
                      ? book.title.slice(0, 50) + '...'
                      : book.title}
                  </h2>
                  <p className='text-sm text-gray-600'>{book.author}</p>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BooksPage;
