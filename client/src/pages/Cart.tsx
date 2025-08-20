import { useCart } from '@/context/cart-context';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.book.id}>
            {item.book.title} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
