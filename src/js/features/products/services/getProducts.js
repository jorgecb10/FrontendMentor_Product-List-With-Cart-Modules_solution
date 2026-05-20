export async function getProducts() {
    const response = await fetch('/data/products.json')
    return await response.json()
}