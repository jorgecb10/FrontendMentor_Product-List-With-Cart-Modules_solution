import { getProducts } from '../features/products/services/getProducts.js'
import { productsState } from '../features/products/state/productsState.js'
import { renderProducts } from '../features/products/ui/renderProducts.js'
import { setupProductsEvents } from '../features/products/ui/productsEvents.js'

import { renderCart } from '../features/cart/ui/renderCart.js'
import { setupCartEvents } from '../features/cart/ui/cartEvents.js'
import { cartState } from '../features/cart/state/cartState.js'

import { setupModalEvents } from '../features/modal/ui/modalEvents.js'

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