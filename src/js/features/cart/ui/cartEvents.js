import { removeItem } from '../logic/cartActions.js';
import { renderCart } from './renderCart.js';
import { renderProducts } from '../../products/ui/renderProducts.js';
import { productsState } from '../../products/state/productsState.js';
import { renderModal } from '../../modal/ui/renderModal.js';

export function setupCartEvents() {
    document.addEventListener('click', e => {
        const removeButton = e.target.closest('.remove-item-btn');

        if(removeButton) {
            const productId = Number(removeButton.dataset.id)

            removeItem(productId)
            renderCart()
            renderProducts(productsState.items)
            return
        }

        const buttonConfirm = e.target.closest('.btn-confirm-order')

        if(buttonConfirm) {
            renderModal()
        }
    })
}