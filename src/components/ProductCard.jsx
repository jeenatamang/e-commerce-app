import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/products/productSlice";

const Stars = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${
            star <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.678c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.products.wishlist);
  const isWishlisted = wishlist.includes(product.id);
  const isLowStock = product.inStock && product.stockCount <= 10;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image area */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/400x400/e7e5e4/a8a29e?text=${encodeURIComponent(product.name)}`;
          }}
        />

        <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {product.category}
        </span>

        {isLowStock && (
          <span className="absolute top-3 right-10 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
            Only {product.stockCount} left
          </span>
        )}

        <button
          onClick={() => dispatch(toggleWishlist(product.id))}
          className="absolute top-3 right-3 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-sm hover:bg-gray-100 transition"
        >
          <svg
            className={`w-3.5 h-3.5 ${isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400 fill-none"}`}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <Stars rating={product.rating} />

        <h3 className="font-bold text-gray-900 mt-1 mb-1 text-sm">{product.name}</h3>
        <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-gray-900 font-bold text-base">${product.price}</span>
          <button
            onClick={() => dispatch(addToCart(product))}
            disabled={!product.inStock}
            className="bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:bg-stone-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            <span className="text-base leading-none">+</span> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
