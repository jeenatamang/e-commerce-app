import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../features/cart/cartSlice";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaBagShopping } from "react-icons/fa6";

const Navbar = () => {
  const dispatch = useDispatch();
  const totalItems = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          <Link to="/" className="flex items-center gap-2">
            <div className="bg-stone-900 w-8 h-8 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <span className="font-bold text-xl text-stone-900">Shop.</span>
          </Link>

          <div className="flex-1 max-w-sm relative">
            <IoIosSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              placeholder="Search products..."
              className="text-sm w-full pl-10 pr-3 py-2 bg-stone-100 border rounded-xl border-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
          <nav className="flex items-center gap-1">
            <Link to="/" className="px-3 py-2 text-sm text-stone-500 rounded-lg hover:text-stone-900 hover:bg-stone-200">
              Shop
            </Link>
            <Link to="/wishlist" className="px-3 py-2 text-sm text-stone-500 rounded-lg hover:text-stone-900 hover:bg-stone-200">
              Wishlist
            </Link>
            <Link to="/admin" className="px-3 py-2 text-sm text-stone-500 rounded-lg hover:text-stone-900 hover:bg-stone-200">
              Admin
            </Link>
            <button
              onClick={() => dispatch(openCart())}
              className="relative bg-stone-900 rounded-lg w-8 h-8 flex items-center justify-center ml-1"
            >
              <FaBagShopping className="text-white text-sm" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
