import { clearCart } from "../../cart/logic/cartActions.js"
import { renderCart } from "../../cart/ui/renderCart.js"
import { productsState } from "../../products/state/productsState.js"
import { renderProducts } from '../../products/ui/renderProducts.js' 

const modal = document.querySelector('.order-modal')

export function setupModalEvents() {
    document.addEventListener('click', e => {
        const newOrderButton = e.target.closest('.start-new-order-btn')

        if(newOrderButton) {
            clearCart()
            renderCart()
            renderProducts(productsState.items)
            modal.close()
            return
        }
    })

    modal.addEventListener('click', e => {
        const modalContent = modal.firstElementChild

        const clickedOutside = !modalContent.contains(e.target)

        if(clickedOutside) {
            modal.close()
        }
    })
}