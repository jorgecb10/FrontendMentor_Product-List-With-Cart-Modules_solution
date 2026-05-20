export function calculateCartTotal(cartItems, products) {

    return cartItems.reduce((total, item) => {

        const product = products.find(
            product => product.id === item.productId
        );

        if(!product) return total;

        return total + (product.price * item.quantity);

    }, 0);
}