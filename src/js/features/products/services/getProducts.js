export async function getProducts() {
    const response = await fetch('/data/data.json')
    return await response.json()
}