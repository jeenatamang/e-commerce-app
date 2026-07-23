import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cartItems");
  if (storedCart) {
    return JSON.parse(storedCart);
  }
  return [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCartFromStorage(), 
    isOpen: false,
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      
      if (existing) {
        if (existing.quantity < existing.stockCount) {
          existing.quantity += 1;
        }
      } else {
        if (product.stockCount > 0) {
          state.items.push({ ...product, quantity: 1 });
        }
      }
      
      state.isOpen = true;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      
      if (item) {
        if (quantity <= item.stockCount) {
          item.quantity = quantity;
        } else {
          item.quantity = item.stockCount;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
    openCart(state) {
      state.isOpen = true;
    },
    closeCart(state) {
      state.isOpen = false;
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  openCart, 
  closeCart 
} = cartSlice.actions;

export default cartSlice.reducer;