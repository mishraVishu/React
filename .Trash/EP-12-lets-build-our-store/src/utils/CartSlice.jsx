import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        imageId: '',
        title: '',
        location: ''
    },
    reducers: {
        addItem: (state, action) => {
            // Redux uses immer BTS
            state.items.push(action.payload);
        },
        removeItem: (state, action) => {
            const id = action.payload;
            state.items = state.items.filter(item => item?.card?.info?.id !== id)
        },
        clearCart: (state) => {
            // RTK says either mutate the state or return a new state
            // state.items.length = 0;
            return {items:[]};
        },
        getImage: (state, action) => {
            const { cloudinaryImageId, name, areaName } = action.payload;
            state.imageId = cloudinaryImageId;
            state.title = name;
            state.location = areaName;
        }
    }
});

const cartReducer = CartSlice.reducer;

export const { addItem, removeItem, clearCart, getImage } = CartSlice.actions;

export default cartReducer;