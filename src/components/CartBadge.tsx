import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartBadge: React.FC = () => {
  const { cart } = useCart();

  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-8 h-8 text-white" />
      {totalItems > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs 
          rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </div>
      )}
    </Link>
    
  );
};

export default CartBadge;