import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { webinfoApi } from "./api/webinfoapi"
import { userApi } from './api/userapi'
import { cartApi } from './api/cartapi'
import { categoryApi } from './api/categoryapi'
import { bannerApi } from './api/bannerapi'
import { orderApi } from './api/orderapi'
import { productApi } from './api/productapi'
import { attributeApi } from './api/attributeapi'
import { variantApi } from './api/variantapi'

export const store=configureStore({
    reducer:{
        [userApi.reducerPath]: userApi.reducer,
 [webinfoApi.reducerPath]:webinfoApi.reducer,
 [cartApi.reducerPath]:cartApi.reducer,
 [categoryApi.reducerPath]:categoryApi.reducer,
 [bannerApi.reducerPath]: bannerApi.reducer,
 [orderApi.reducerPath]: orderApi.reducer,
 [productApi.reducerPath]: productApi.reducer,
 [attributeApi.reducerPath]: attributeApi.reducer,
 [variantApi.reducerPath]: variantApi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(webinfoApi.middleware).concat(userApi.middleware).concat(cartApi.middleware).concat(categoryApi.middleware).concat(bannerApi.middleware).concat(orderApi.middleware).concat(productApi.middleware).concat(attributeApi.middleware).concat(variantApi.middleware)
})

setupListeners(store.dispatch)