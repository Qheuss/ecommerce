import {
  useCartStore,
  useTotalItems,
  useTotalPrice,
} from '@/stores/cart.store';

const Cart = () => {
  const cart = useCartStore((s) => s.cart);
  const totalItems = useTotalItems();
  const totalPrice = useTotalPrice();

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
      <div>
        <p>Total Items: {totalItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;
