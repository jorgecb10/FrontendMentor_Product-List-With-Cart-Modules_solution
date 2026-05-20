import {
    getProducts,
    productsState,
    renderProducts,
    setupProductsEvents
} from '../features/products'

import { 
    renderCart,
    setupCartEvents,
    cartState
} from '../features/cart'

import { setupModalEvents } from '../features/modal'

export function initApp() {
    productsState.items = getProducts()
    
    renderProducts(productsState.items)
    renderCart(cartState.getItems())
    setupProductsEvents()
    setupCartEvents()
    setupModalEvents()
}