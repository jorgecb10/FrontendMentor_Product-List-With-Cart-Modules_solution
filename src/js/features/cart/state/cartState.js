import { saveCart } from "../storage/cartStorage"

export const state = {
    items: []
}

export const cartState = {
    getItems() {
        return state.items
    },

    setItems(newItems) {
        state.items = newItems
        saveCart(state.items)
    } 
}