export async function getProducts() {
    const response = await fetch('public/data/data.json')
    return await response.json()
}