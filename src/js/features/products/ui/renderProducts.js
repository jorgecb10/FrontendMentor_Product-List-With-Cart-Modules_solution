import { cartState } from "../../cart/state/cartState"

const productsContainer = document.querySelector('.products-list')

function createProductCard(product) {
    const article = document.createElement('article')
    article.classList.add('product-card', 'mb-6', 'last-of-type:mb-0', 'sm:mb-0')

    const cardItem = cartState.getItems().find(
        item => item.productId === product.id
    )

    const quantity = cardItem?.quantity || 0

    article.innerHTML = `
        <div class="relative">
            <picture>
                <source
                    media="(min-width: 1024px)"
                    srcset="${product.image.desktop}"
                >

                <source
                    media="(min-width: 768px)"
                    srcset="${product.image.tablet}"
                >

                <img
                    src="${product.image.mobile}"
                    alt="${product.name}"
                    class="product-image rounded-xl ${quantity > 0 ? 'border-2 border-red' : ''}"
                >
            </picture>

            ${createButtonControl(product.id, quantity)}
        </div>

        <div class="mt-8">
            <span class="text-rose-400">${product.category}</span>
            <h2 class="text-rose-500 font-bold">${product.name}</h2>
            <p class="text-red font-semibold">$${product.price.toFixed(2)}</p>
        </div>
    `

    return article
}

function createButtonControl(productId, quantity) {
    if(quantity > 0) {
        return `
            <div class="quantity-controls flex items-center
             gap-10 rounded-4xl py-2 px-3 absolute right-1/2 translate-x-1/2 -bottom-5 bg-red">
                <button class="decrease-btn cursor-pointer border border-white rounded-full h-5 w-5 flex items-center justify-center hover:bg-white transition-colors" data-id="${productId}">
                    <img src="./images/icon-decrement-quantity.svg" alt="icon-decrement" class="icon-minus">
                </button>

                <span class="text-white">${quantity}</span>

                <button class="increase-btn cursor-pointer border border-white rounded-full h-5 w-5 flex items-center justify-center hover:bg-white transition-colors" data-id="${productId}">
                    <img src="./images/icon-increment-quantity.svg" alt="icon-increment" class="icon-plus">
                </button>
            </div>
        `
    }

    return `
        <button class="btn-add flex gap-0.5 bg-white border border-rose-300 rounded-4xl py-2 px-6 absolute right-1/2 translate-x-1/2 -bottom-5 text-rose-900 cursor-pointer sm:w-40 sm:text-center hover:text-red transition-colors" data-id="${productId}">
            <img src="/images/icon-add-to-cart.svg">
            Add to Cart
        </button>
    `
}

function borderIMG(product, quantity) {
    const img = product.closest('picture')
    if(!img) return
    
    if(quantity > 0) {
        img.classList.add('border-2', 'border-red')
    } else {
        img.classList.remove('border-2', 'border-red')
    }
}

export function renderProducts(products) {
    productsContainer.innerHTML = ''

    products.forEach(product => {
        const cardProduct = createProductCard(product)
        productsContainer.appendChild(cardProduct)
    })
}