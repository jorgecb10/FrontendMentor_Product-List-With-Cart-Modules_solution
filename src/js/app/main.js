import {
    getProducts,
    productsState,
    renderProducts,
    setupProductsEvents
} from '../features/products/index.js'

import { 
    renderCart,
    setupCartEvents,
    cartState
} from '../features/cart/index.js'

import { setupModalEvents } from '../features/modal/index.js'

import { loadCart } from '../features/cart/storage/cartStorage.js'

export async function initApp() {
    const products = await getProducts()
    productsState.items = products

    const savedCart = loadCart()
    cartState.setItems(savedCart)
    
    renderProducts(productsState.items)
    renderCart(cartState.getItems())
    setupProductsEvents()
    setupCartEvents()
    setupModalEvents()
}