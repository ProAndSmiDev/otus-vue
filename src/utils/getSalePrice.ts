export default (price: number | string, sale: number): string => {
    const productPrice = typeof price === 'number' ? price : Number(price);

    return Number(productPrice * Number(1 - sale / 100)).toFixed(2);
}
