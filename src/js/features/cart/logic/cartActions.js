import { cartState } from "../state/cartState.js"

function findCartItem(productId) {
    return cartState
        .getItems()
        .find(item => item.productId === productId)
}

export function addToCart(productId) {
    const items = [...cartState.getItems()]

    const existingItem = findCartItem(productId)

    if(existingItem) {
        existingItem.quantity++
    } else {
        items.push({
            productId,
            quantity: 1
        })
    }

    cartState.setItems(items)
}

export function increaseQuantity(productId) {
    const items = [...cartState.getItems()]

    const item = items.find(
        item => item.productId === productId
    )

    if(!item) return

    item.quantity++
    cartState.setItems(items)
}

export function decreaseQuantity(productId) {
    let items = [...cartState.getItems()]

    const item = items.find(
        item => item.productId === productId
    )

    if(!item) return 

    item.quantity--
    items = items.filter(item => item.quantity > 0)
    cartState.setItems(items)
}

export function removeItem(productId) {
    const items = cartState
        .getItems()
        .filter(item => item.productId !== productId)

    cartState.setItems(items)
}

export function clearCart() {
    cartState.setItems([])
}