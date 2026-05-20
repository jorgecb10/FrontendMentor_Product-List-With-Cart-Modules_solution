import { productsState } from "../state/productsState.js"
import { renderProducts } from "./renderProducts.js"
import { 
    addToCart, 
    cartState, 
    renderCart,
    increaseQuantity, 
    decreaseQuantity
} from "../../cart"

export function setupProductsEvents() {
    document.addEventListener('click', e => {
        const button = e.target.closest('.btn-add')
    
        if(button) {
            const productId = Number(button.dataset.id)
            addToCart(productId)
            renderProducts(productsState.items)
            renderCart(cartState.getItems())
            return
        }

        const increaseButton = e.target.closest('.increase-btn')
        
        if(increaseButton) {
            const productId = Number(increaseButton.dataset.id)
            increaseQuantity(productId)
            renderProducts(productsState.items)
            renderCart(cartState.getItems())
            return
        }

        const decreaseButton = e.target.closest('.decrease-btn')
        
        if(decreaseButton) {
            const productId = Number(decreaseButton.dataset.id)
            decreaseQuantity(productId)
            renderProducts(productsState.items)
            renderCart(cartState.getItems())
        }
    })
}