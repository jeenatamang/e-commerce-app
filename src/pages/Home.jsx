import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSortBy } from "../features/products/productSlice";
import ProductCard from "../components/ProductCard";

const CATEGORIES = ["All", "Electronics", "Accessories", "Footwear", "Bags", "Lifestyle"];

const Home = () => {
  const dispatch = useDispatch();
  const { items, selectedCategory, sortBy, searchQuery } = useSelector(
    (state) => state.products
  );

  const filtered = items.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;

    const term = (searchQuery || "").trim().toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative bg-stone-900 rounded-3xl overflow-hidden mb-10 p-8 sm:p-12">
        <div className="max-w-lg flex flex-col">
          <span className="inline-block w-fit bg-yellow-500 text-stone-900 text-xs font-bold px-3 py-1 mb-4 rounded-full">
            NEW ARRIVALS
          </span>
          <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight mb-3">
            Curated for the <br /> Discerning
          </h1>
          <p className="text-stone-300 text-md mb-6">
            Premium products selected for quality, design, and performance.
          </p>
          <a
            href="#products"
            className="bg-white text-black font-semibold px-7 py-3 rounded-xl w-fit hover:bg-yellow-500 transition"
          >
            Shop Now →
          </a>
        </div>
      </div>

      <div id="products" className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {CATEGORIES.map((call) => (
            <button
              key={call}
              onClick={() => dispatch(setCategory(call))}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                selectedCategory === call
                  ? "bg-stone-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {call}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="border border-gray-200 rounded-xl text-sm px-3 py-2 text-gray-600 bg-white focus:outline-none"
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <p className="text-sm text-gray-500 mb-6">
        <span className="font-semibold text-stone-900">{sorted.length}</span> products found
      </p>

      {sorted.length === 0 ? (
        <div className="text-center py-16 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
          <p className="text-stone-500 font-medium">
            No products found matching "{searchQuery}"
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;