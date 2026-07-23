import { useDispatch, useSelector } from "react-redux";
import { closeCart, removeFromCart, updateQuantity, clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const dispatch = useDispatch();
  const { items, isOpen } = useSelector((state) => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black z-40 transition-opacity"
          onClick={() => dispatch(closeCart())}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Your Cart</h2>
            <p className="text-sm text-stone-400">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
          </div>
          <button
            onClick={() => dispatch(closeCart())}
            className="text-stone-400 hover:text-stone-700 text-xl leading-none transition"
          >
            ✕
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-6">
            <div className="w-16 h-16 bg-stone-100 rounded-2xl flex items-center justify-center">
              <svg className="w-7 h-7 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
            </div>
            <p className="text-stone-500 text-sm">Your cart is empty</p>
            <button
              onClick={() => dispatch(closeCart())}
              className="text-sm font-semibold text-stone-900 underline underline-offset-2 hover:text-stone-600 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-stone-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-stone-900 truncate">{item.name}</p>
                    <p className="text-sm text-stone-400 mt-0.5">${item.price.toFixed(2)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          item.quantity === 1
                            ? dispatch(removeFromCart(item.id))
                            : dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                        }
                        className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-sm font-bold transition"
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold text-stone-800 w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                        }
                        className="w-6 h-6 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 text-sm font-bold transition"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <p className="text-sm font-bold text-stone-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-stone-300 hover:text-red-400 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-stone-100 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-stone-500 text-sm">Subtotal</span>
                <span className="font-bold text-stone-900">${total.toFixed(2)}</span>
              </div>
              <Link
                to="/cart"
                onClick={() => dispatch(closeCart())}
                className="w-full bg-stone-900 text-white text-sm font-semibold py-3 rounded-xl text-center hover:bg-stone-700 transition"
              >
                Checkout
              </Link>
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs text-stone-400 hover:text-red-400 transition text-center"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
