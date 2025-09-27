import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: JSON.parse(localStorage.getItem("userData")) || null,
  city: null,
  allShops: null,
  shop: null,
  shopsOfCity: null,
  itemsOfCity: null,
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalAmount: 0,
  myOrders: [],
  ownerPendingOrders: [],
  socket: null,
  deliveryBoys: [],
  searchItems: null,
  pendingOrdersCount: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => { 
      state.userData = action.payload;
      if (action.payload) {
        localStorage.setItem("userData", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("userData");
      }
    },
    setCity: (state, action) => { state.city = action.payload; },
    setAllShops: (state, action) => { state.allShops = action.payload; },
    setShop: (state, action) => { state.shop = action.payload; },
    setShopsOfCity: (state, action) => { state.shopsOfCity = action.payload; },
    setItemsOfCity: (state, action) => { state.itemsOfCity = action.payload; },
    
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find(i => i.id === item.id);
      
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      
      state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(i => i.id === id);
      
      if (item) {
        item.quantity = quantity;
        state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      state.totalAmount = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    setMyOrders: (state, action) => { state.myOrders = action.payload; },
    
    setOwnerPendingOrders: (state, action) => {
      if (Array.isArray(action.payload)) {
        state.ownerPendingOrders = action.payload;
      } else {
        state.ownerPendingOrders = [action.payload, ...state.ownerPendingOrders];
      }
    },
    
    setSocket: (state, action) => { state.socket = action.payload; },
    setDeliveryBoys: (state, action) => { state.deliveryBoys = action.payload; },
    setSearchItems: (state, action) => { state.searchItems = action.payload; },
    setPendingOrdersCount: (state, action) => { state.pendingOrdersCount = action.payload; },
    
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      localStorage.removeItem("cartItems");
    }
  },
});

export const {
  setUserData, setCity, setAllShops, setShop, setShopsOfCity,
  setItemsOfCity, addToCart, updateQuantity, removeFromCart, setMyOrders,
  setOwnerPendingOrders, setSocket, setDeliveryBoys, setSearchItems,
  setPendingOrdersCount, clearCart,
} = userSlice.actions;

export default userSlice.reducer;
