import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        state.totalItems++;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1 });
        }
    },
    removeItem: (state, action) => {
        state.items = state.items.filter(item => item.name !== action.payload);
        state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        }
    },
  },
});

export const selectorCartTotal = (state) => state.cart.totalItems;

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
