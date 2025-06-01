export default (price: number | string, sale: number): number => {
    const productPrice = typeof price === 'number' ? price : Number(price);

    return Number(Math.round((productPrice * Number(1 - sale / 100)) * 100) / 100);
}
