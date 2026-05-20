import { renderCart } from "../../cart"
import { clearCart } from "../../cart/logic/cartActions"
import { productsState, renderProducts } from "../../products"

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