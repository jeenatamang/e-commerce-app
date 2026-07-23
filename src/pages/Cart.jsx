import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";

const SHIPPING_COST = 9.99;
const FREE_SHIPPING_THRESHOLD = 100;
const TAX_RATE = 0.08;

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + shipping + tax;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE30") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoError("Invalid promo code.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-stone-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-stone-900 mb-2">Your cart is empty</h1>
        <p className="text-stone-400 text-sm mb-8">Add some products to get started.</p>
        <Link to="/" className="inline-block bg-stone-900 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-stone-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> 
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Shopping Cart</h1>
          <p className="text-stone-400 text-sm mt-0.5">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
        </div>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-sm font-medium text-red-500 hover:text-red-600 transition"
        >
          Clear All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* //Cart items */}
        <div className="flex-1 flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm">
              {/* //Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover bg-stone-100 shrink-0"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/80x80/e7e5e4/a8a29e?text=${encodeURIComponent(item.name[0])}`;
                }}
              />

              {/* //Info  */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-900 text-sm">{item.name}</p>
                <p className="text-stone-400 text-xs mt-0.5">{item.category}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() =>
                      item.quantity === 1
                        ? dispatch(removeFromCart(item.id))
                        : dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
                    }
                    className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 font-bold text-sm hover:bg-stone-100 transition"
                  >
                    −
                  </button>
                  <span className="text-sm font-semibold text-stone-900 w-4 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                    className="w-7 h-7 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 font-bold text-sm hover:bg-stone-100 transition"
                  >
                    +
                  </button>
                </div>
              </div>


              <div className="flex flex-col items-end gap-2 shrink-0">
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-stone-300 hover:text-red-400 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="font-bold text-stone-900 text-base">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* //Order summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-stone-900">Order Summary</h2>

            {/* // Line items  */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (30%)</span>
                  <span>−${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="flex justify-between text-stone-500">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            {/* //Free shipping nudge */}
            {amountToFreeShipping > 0 && (
              <p className="text-xs text-stone-400 bg-stone-50 rounded-lg px-3 py-2 text-center">
                Add <span className="font-semibold text-stone-700">${amountToFreeShipping.toFixed(2)}</span> more for free shipping!
              </p>
            )}

            {/* //Total */}
            <div className="flex justify-between font-bold text-stone-900 text-base border-t border-stone-100 pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError("");
                }}
                placeholder="Promo code"
                className="flex-1 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <button
                onClick={handleApplyPromo}
                className="bg-stone-900 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-stone-700 transition"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs text-green-600 -mt-2"> Promo code applied - 30% off!</p>
            )}
            {promoError && (
              <p className="text-xs text-red-500 -mt-2">{promoError}</p>
            )}
            <button className="w-full bg-stone-900 text-white font-semibold py-3.5 rounded-xl hover:bg-stone-700 transition text-sm">
              Proceed to Checkout
            </button>

            <Link
              to="/"
              className="text-center text-sm text-stone-400 hover:text-stone-600 transition"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
