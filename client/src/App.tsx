import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Book from './pages/Book';
import Books from './pages/Books';
import Layout from './components/Layout';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/books/:id/:slug' element={<Book />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
