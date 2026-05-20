const CART_STORAGE_KEY = 'cart'

export function saveCart(items) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export function loadCart() {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)

    if(!storedCart) return []

    return JSON.parse(storedCart)
}