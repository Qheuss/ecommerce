import {
  useCartStore,
  useTotalItems,
  useTotalPrice,
} from '@/stores/cart.store';

const Cart = () => {
  const cart = useCartStore((s) => s.cart);
  const totalItems = useTotalItems();
  const totalPrice = useTotalPrice();
  const removeFromCart = useCartStore((s) => s.removeFromCart);

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Your Cart</h1>
        <button
          className='text-red-500 hover:text-shadow-xs cursor-pointer transition-all duration-200'
          onClick={() => useCartStore.getState().clearCart()}
        >
          Clear Cart
        </button>
      </div>
      <ul className='mt-4 flex flex-col gap-4 border-b'>
        {cart.map((item) => (
          <li
            key={item.book.id}
            className='mb-4 flex items-center justify-between gap-4 bg-accent1/50 p-4 rounded-lg'
          >
            <div className='flex-1'>
              <h3 className='text-md font-semibold'>{item.book.title}</h3>
              <div className='flex items-center gap-2 mt-2'>
                <span>Quantity: {item.quantity}</span>
                <button
                  className='bg-primary/80 text-white py-0.2 w-6 rounded hover:bg-primary cursor-pointer'
                  onClick={() =>
                    useCartStore
                      .getState()
                      .updateQuantity(item.book.id, item.quantity + 1)
                  }
                >
                  +
                </button>
                <button
                  className='bg-primary/80 text-white py-0.2 w-6 rounded hover:bg-primary cursor-pointer'
                  onClick={() =>
                    useCartStore
                      .getState()
                      .updateQuantity(item.book.id, item.quantity - 1)
                  }
                >
                  -
                </button>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <span>{item.book.price}€</span>
              <button
                className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer'
                onClick={() => removeFromCart(item.book.id)}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className='mt-4 gap-2 float-end text-right'>
        <p>Books: {totalItems}</p>
        <p>Price: {totalPrice.toFixed(2)}€</p>
        <button className='mt-4 w-fit bg-primary-dull text-white py-2 px-3 rounded hover:bg-primary-dull/80 cursor-pointer float-end'>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
