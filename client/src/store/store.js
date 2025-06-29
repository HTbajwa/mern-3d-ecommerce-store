import {configureStore} from '@reduxjs/toolkit'
import { cartApi } from './api/cartapi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { productApi } from './api/productapi'
import { wishlistApi } from './api/wishlistapi'
import cart from './state/cart'
import wishlist from './state/wishlist'
import token from './state/token'
import { categoryApi } from './api/categoryapi'
import { userApi } from './api/userapi'
import { bannerApi } from './api/bannerapi'
import { addressApi } from './api/addressapi'
import { orderApi } from './api/orderapi'
import { contactApi } from './api/contactapi'
export const store=configureStore({
    reducer:{
        token:token,
        cart:cart,
        wishlist:wishlist,
        [categoryApi.reducerPath]: categoryApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [wishlistApi.reducerPath]: wishlistApi.reducer,
        [bannerApi.reducerPath]: bannerApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [contactApi.reducerPath]: contactApi.reducer,
    },

    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(categoryApi.middleware).concat(userApi.middleware).concat(productApi.middleware).concat(cartApi.middleware).concat(wishlistApi.middleware).concat(bannerApi.middleware).concat(addressApi.middleware).concat(orderApi.middleware).concat(contactApi.middleware),
    
})

setupListeners(store.dispatch)