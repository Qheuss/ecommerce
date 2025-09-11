import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/stores/cart.store';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const user = null;
  const logout = () => {
    console.log('User logged out');
  };

  const navigate = useNavigate();

  const cart = useCartStore((s) => s.cart);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  if (showUserLogin) {
    return (
      <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-lg shadow-lg w-80 relative'>
          <button
            className='absolute top-2 right-2 text-gray-600 hover:text-gray-800'
            onClick={() => setShowUserLogin(false)}
          >
            &times;
          </button>
          <h2 className='text-2xl mb-4'>Login</h2>
          <form className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='Email'
              className='border border-gray-300 p-2 rounded'
            />
            <input
              type='password'
              placeholder='Password'
              className='border border-gray-300 p-2 rounded'
            />
            <button
              type='submit'
              className='bg-primary text-white py-2 rounded hover:bg-primary-dull transition'
              onClick={() => {
                setShowUserLogin(false);
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <nav className='flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 shadow-md bg-white relative transition-all'>
      <NavLink to='/' onClick={() => setOpen(false)}>
        <img src='./logo.svg' alt='logo' height={86} width={86} />
      </NavLink>

      {/* Desktop Menu */}
      <div className='hidden sm:flex items-center gap-8'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/books'>All Books</NavLink>

        <div className='hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full'>
          <input
            className='py-1.5 w-full bg-transparent outline-none placeholder-gray-500'
            type='text'
            placeholder='Search books'
          />
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.836 10.615 15 14.695'
              stroke='#7A7B7D'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              clipRule='evenodd'
              d='M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783'
              stroke='#7A7B7D'
              strokeWidth='1.2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        <div
          className='relative cursor-pointer'
          onClick={() => {
            navigate('/cart');
          }}
        >
          <svg
            width='20'
            height='20'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0'
              stroke='#6B4632'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          <button className='absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full'>
            {cartItemCount}
          </button>
        </div>
        {user ? (
          <div className='relative group'>
            <img src='./profile_icon.svg' alt='profile_icon' className='w-10' />
            <ul className='absolute hidden group-hover:flex flex-col items-center bg-white shadow-md rounded-lg text-sm text-gray-700 top-10 right-0 w-30 p-2'>
              <li
                className='p-1.5 hover:text-primary cursor-pointer'
                onClick={() => navigate('/orders')}
              >
                My Orders
              </li>
              <li
                className='p-1.5 hover:text-red-500 cursor-pointer'
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        ) : (
          <button
            onClick={() => setShowUserLogin(true)}
            className='cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full'
          >
            Login
          </button>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label='Menu'
        className='sm:hidden'
      >
        {/* Menu Icon SVG */}
        <svg
          width='21'
          height='15'
          viewBox='0 0 21 15'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='21' height='1.5' rx='.75' fill='#426287' />
          <rect x='8' y='6' width='13' height='1.5' rx='.75' fill='#426287' />
          <rect x='6' y='13' width='15' height='1.5' rx='.75' fill='#426287' />
        </svg>
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? 'flex' : 'hidden'
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <NavLink to='/' className='block'>
          Home
        </NavLink>
        <NavLink to='/books' className='block'>
          All Books
        </NavLink>
        {user && (
          <NavLink to='/orders' className='block'>
            My Orders
          </NavLink>
        )}

        {user ? (
          <button
            onClick={logout}
            className='cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm'
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className='cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm'
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
