import { useState } from 'react';
import styles from './BestSeller.module.scss';
import { useBooks } from '@/context/books-context';

const BestSeller = () => {
  const [stopScroll, setStopScroll] = useState(false);
  const { books } = useBooks();

  return (
    <div className='mt-16'>
      <h2 className='text-2xl font-bold text-center'>Best Sellers</h2>

      <div
        className='overflow-hidden w-full relative max-w-8xl mx-auto mt-10'
        onMouseEnter={() => setStopScroll(true)}
        onMouseLeave={() => setStopScroll(false)}
      >
        <div className='absolute left-0 top-0 h-full w-30 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent' />
        <div
          className={`flex w-fit ${styles.marqueeInner}`}
          style={{
            animationPlayState: stopScroll ? 'paused' : 'running',
            animationDuration: books.length * 2500 + 'ms',
          }}
        >
          <ul className='flex'>
            {[...books, ...books].map(
              (book, index) =>
                book.rating! >= 4 && (
                  <li
                    key={index}
                    className='w-56 mx-4 h-[20rem] relative group hover:scale-90 transition-all duration-300 cursor-pointer'
                  >
                    <img
                      src={book.cover}
                      alt='card'
                      className='w-full h-full object-cover'
                    />
                    <div className='flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-md left-0 w-full h-full bg-black/20'>
                      <p className='text-white text-lg font-semibold text-center'>
                        {book.title}
                      </p>
                    </div>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className='absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent' />
      </div>
    </div>
  );
};

export default BestSeller;
