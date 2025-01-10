import React from "react";
import { useCart } from "../context/CartContext";

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Your Cart
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Remove</th>
            </tr>
          </thead>
          {cart.length === 0 ? (
            <tbody></tbody>
          ) : (
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 object-cover mr-4"
                    />
                    {item.title}
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-20 h-10 text-center rounded-lg text-black bg-slate-50"
                    />
                  </td>
                  <td className="px-4 py-2">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="bg-[var(--bgcolorpage)] text-white px-3 py-1 rounded-lg hover:bg-[var(--activeColor)]"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
        {cart.length === 0 ? (
            <p className="text-center text-xl text-gray-600 py-11">
              Your cart is empty.
            </p>
          ) : (
        <div className="flex justify-between items-center px-40 py-10">
          <h2 className="text-2xl font-bold pr-20">Total:</h2>
          <p className="text-2xl font-bold text-[var(--activeColor)]">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
          )}
      </div>
    </div>
  );
};

export default Cart;
