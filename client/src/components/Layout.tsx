import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-1 container mx-auto px-6 py-4'>
        <Outlet />
      </main>
      <footer className='text-center py-4 bg-gray-100 mt-8'>
        <a
          href='https://www.linkedin.com/in/quentin-heusse/'
          className='text-sm text-gray-600'
        >
          © {new Date().getFullYear()} Quentin Heusse
        </a>
      </footer>
    </div>
  );
};

export default Layout;
