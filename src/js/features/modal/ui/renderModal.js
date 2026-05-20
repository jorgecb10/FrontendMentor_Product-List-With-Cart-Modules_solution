import { cartState, calculateCartTotal } from "../../cart/index.js";
import { productsState } from "../../products/index.js";

const modal = document.querySelector('.order-modal');

function createModalItem(cartItem) {

    const product = productsState.items.find(
        product => product.id === cartItem.productId
    );

    if(!product) return '';

    const itemTotal = product.price * cartItem.quantity;

    return `
        <div class="flex items-center justify-between py-4 first-of-type:pt-0 border-b border-b-rose-100">
            <div class="flex items-center gap-3">
                <img src="${product.image.thumbnail}" alt="${product.name}" class="w-12 h-12 rounded-md">

                <div>
                    <h3 class="font-semibold text-rose-900">
                        ${product.name}
                    </h3>

                    <div class="flex items-center gap-3">
                        <span class="text-red font-semibold">
                            ${cartItem.quantity}x
                        </span>

                        <span class="text-rose-400 font-medium">
                            @$${product.price.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <strong class="font-bold text-lg">
                $${itemTotal.toFixed(2)}
            </strong>
        </div>
    `
}

export function renderModal() {

    const cartItems = cartState.getItems();

    const modalItems = cartItems
        .map(cartItem => createModalItem(cartItem))
        .join('');

    const total = calculateCartTotal(
        cartItems,
        productsState.items
    );

    modal.innerHTML = `
        <div class="bg-white p-6 rounded-t-2xl max-w-137.5 sm:rounded-2xl">
            <img src="/images/icon-order-confirmed.svg" alt="order confirmed" class="w-12">

            <h2 class="text-5xl font-bold mt-6 text-rose-900">
                Order Confirmed
            </h2>

            <p class="text-rose-500 mt-2">
                We hope you enjoy your food!
            </p>

            <div class="mt-8 bg-rose-50 p-4 pb-0 rounded-t-md">
                ${modalItems}
            </div>

            <div class="flex items-center justify-between bg-rose-50 rounded-b-md p-4 pt-6">
                <span class="text-rose-500">Order Total</span>

                <strong class="text-2xl text-rose-900">$${total.toFixed(2)}</strong>

            </div>

            <button class="start-new-order-btn w-full bg-red text-white py-4 rounded-full mt-8 hover:bg-[#a02f0d] transition-colors cursor-pointer">
                Start New Order
            </button>

        </div>
    `;

    modal.showModal();
}
