import { createSlice } from "@reduxjs/toolkit";
const initialProducts = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    category: "Electronics",
    price: 129.99,
    rating: 4.5,
    description:
      "Premium sound quality with active noise cancellation and 30-hour battery life.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    inStock: true,
    stockCount: 20,
  },
  {
    id: 2,
    name: "Turkey TFF Competition Ball",
    category: "Accessories",
    price: 53,
    rating: 4.8,
    description: "White / Dark Blue / Iron Metallic",
    image:
      "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=400&h=400&fit=crop",
    inStock: true,
    stockCount: 24,
  },
  {
    id: 3,
    name: "Running Sneakers",
    category: "Footwear",
    price: 89.99,
    rating: 4.3,
    description:
      "Lightweight and breathable sneakers with advanced cushioning technology.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    inStock: true,
    stockCount: 15,
  },
  {
    id: 4,
    name: "Leather Backpack",
    category: "Bags",
    price: 179.99,
    rating: 4.6,
    description:
      "Handcrafted genuine leather backpack with laptop compartment.",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    inStock: true,
    stockCount: 12,
  },
  {
    id: 5,
    name: "Aura Cork Yoga Mat",
    category: "Lifestyle",
    price: 49.99,
    rating: 4.7,
    description: "Non-slip eco-friendly yoga mat with alignment lines.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTP3iEQ3x7GF-MLT77kTjipJtbbd2I6xIpNUYm1HICEu6K063luiuxQJOE&s=10",
    inStock: true,
    stockCount: 30,
  },
  {
    id: 6,
    name: "Sunglasses Classic",
    category: "Accessories",
    price: 119.99,
    rating: 4.4,
    description: "UV400 polarized lenses with lightweight frame.",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    inStock: false,
    stockCount: 0,
  },
];

const loadProductsFromStorage = () => {
  try {
    const data = localStorage.getItem("products");
    if (!data || data === "undefined") return initialProducts;
    return JSON.parse(data);
  } catch (err) {
    console.error("Products parse error:", err);
    return initialProducts;
  }
};

const loadWishlist = () => {
  try {
    const data = localStorage.getItem("wishlist");
    if (!data || data === "undefined") return [];
    return JSON.parse(data);
  } catch (err) {
    console.error("Wishlist parse error:", err);
    return [];
  }
};

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: loadProductsFromStorage(),
    selectedCategory: "All",
    sortBy: "default",
    searchQuery: "",
    wishlist: loadWishlist(),
  },
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },

    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },

    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    addProduct(state, action) {
      state.items.push(action.payload);
      localStorage.setItem("products", JSON.stringify(state.items));
    },

    deleteProduct(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("products", JSON.stringify(state.items));
    },

    updateProduct(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem("products", JSON.stringify(state.items));
      }
    },

    toggleWishlist(state, action) {
      const id = action.payload;

      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((wid) => wid !== id);
      } else {
        state.wishlist.push(id);
      }

      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },
});

export const {
  setCategory,
  setSortBy,
  setSearchQuery,
  addProduct,
  deleteProduct,
  updateProduct,
  toggleWishlist,
} = productSlice.actions;

export default productSlice.reducer;