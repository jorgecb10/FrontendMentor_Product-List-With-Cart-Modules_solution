import { cartState } from '../state/cartState.js';
import { productsState } from '../../products/state/productsState.js';
import { calculateCartTotal } from '../calculations/cartCalculations.js';
const cartContainer = document.querySelector('.list-cart')
const confirmContainer = document.querySelector('.order-confirm')
const totalProducts = document.querySelector('.total-products')

function createCartItem(cartItem) {
    const product = productsState.items.find(
        product => product.id === cartItem.productId
    )

    if(!product) return null

    const itemTotal = product.price * cartItem.quantity

    const productContainer = document.createElement('div')

    productContainer.classList.add('flex', 'items-center', 'justify-between', 'py-3', 'border-b', 'border-rose-300', 'first-of-type:pt-0')

    productContainer.innerHTML = `
        <div>
            <h3 class="font-semibold text-rose-900">
                ${product.name}
            </h3>

            <div class="flex items-center gap-4">
                <span class="text-red font-bold">
                    ${cartItem.quantity}x
                </span>

                <div class="flex gap-2">
                    <p class="text-rose-400">
                        @$${product.price.toFixed(2)}
                    </p>

                    <p class="text-rose-500 font-semibold">
                        $${itemTotal.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>

        <button class="remove-item-btn border border-rose-500 rounded-full cursor-pointer p-1 hover:border-rose-900 transition-colors" data-id="${product.id}">
            <img src="./images/icon-remove-item.svg" alt="icon-remove-item" class="icon-delete">
        </button>
    `;

    return productContainer
}

function createCartTotal(total) {
    const div = document.createElement('div')

    div.classList.add('cart-total', 'flex', 'justify-between', 'items-center', 'mt-6'
    )

    div.innerHTML = `
        <span>Order Total</span>

        <strong>
            $${total.toFixed(2)}
        </strong>
    `

    return div
}

function createEmptyCart() {
    const div = document.createElement('div')

    div.classList.add('empty-cart')

    div.innerHTML = `
        <img
            src="./images/illustration-empty-cart.svg"
            alt="illustration-empty-cart"
            class="mx-auto"
        >
    `

    return div
}

export function renderCart() {
    const cartItems = cartState.getItems()
    totalProducts.textContent = `(${
        cartItems
            .map(
                p => p.quantity
            )
            .reduce(
                (acc, value) => acc = acc + value, 0
            )
        })`

    cartContainer.innerHTML = ''

    if(cartItems.length === 0) {
        cartContainer.appendChild(createEmptyCart())
        confirmContainer.innerHTML = `
            <p class="text-rose-500 font-semibold text-center mt-7">Your added items will appear here</p>
        `
        return
    }

    const fragment = document.createDocumentFragment()

    cartItems.forEach(cartItem => {
        const cartElement = createCartItem(cartItem)
        if(cartElement) {

            fragment.appendChild(cartElement)
        }
    })

    cartContainer.appendChild(fragment)

    const total = calculateCartTotal(
        cartItems,
        productsState.items
    )

    const totalElement = createCartTotal(total)

    cartContainer.appendChild(totalElement)
    confirmContainer.innerHTML = btnConfirm()
}

function btnConfirm() {
    return `
        <div class="mt-7 flex items-center justify-center gap-1 bg-rose-100 rounded-md py-3">
            <img src="./images/icon-carbon-neutral.svg">
            <p>This is a <span class="font-semibold">carbon-neutral</span> delivery</p>
        </div>

        <button class="btn-confirm-order mt-4 bg-red text-white w-full py-3 rounded-4xl cursor-pointer hover:bg-[#a02f0d] transition-colors">Confirm Order</button>
    `
}