import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
        <Link to="/services/phones-accessories" className="text-accent hover:underline">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item._id} className="flex items-center gap-4 bg-white/5 p-4 rounded-lg">
              <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1">
                <Link to={`/product/${item._id}`} className="text-white font-semibold hover:text-accent">
                  {item.name}
                </Link>
                <p className="text-accent">₦{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-1 bg-white/10 rounded disabled:opacity-50"
                >
                  <Minus size={16} />
                </button>
                <span className="text-white w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  className="p-1 bg-white/10 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex justify-between text-white text-xl font-bold">
            <span>Total:</span>
            <span>₦{total.toLocaleString()}</span>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={clearCart}
              className="px-6 py-3 border border-red-500 text-red-500 rounded-full hover:bg-red-500/10"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert('Checkout simulated – integrate payment gateway')}
              className="px-6 py-3 bg-accent text-white rounded-full hover:bg-red-700 flex-1"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;