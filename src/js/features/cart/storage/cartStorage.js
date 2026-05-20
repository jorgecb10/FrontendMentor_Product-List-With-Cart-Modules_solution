const CART_STORAGE_KEY = 'cart';

export function saveCart(items) {

    localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(items)
    );
}

export function loadCart() {

    try {

        const storedCart = localStorage.getItem(
            CART_STORAGE_KEY
        );

        if(!storedCart) {

            return [];
        }

        return JSON.parse(storedCart);

    } catch(error) {

        console.error(
            'Error loading cart from localStorage',
            error
        );

        return [];
    }
}
