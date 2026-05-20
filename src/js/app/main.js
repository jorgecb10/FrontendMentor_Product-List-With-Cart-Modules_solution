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

import { loadCart } from '../features/cart/storage/cartStorage'

export function initApp() {
    productsState.items = getProducts()

    const savedCart = loadCart()
    cartState.setItems(savedCart)
    
    renderProducts(productsState.items)
    renderCart(cartState.getItems())
    setupProductsEvents()
    setupCartEvents()
    setupModalEvents()
}