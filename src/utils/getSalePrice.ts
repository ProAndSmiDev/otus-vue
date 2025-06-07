import {useCartStore} from "@store/cart";

export default (price: number | string): number => {
    const {discountPercentage} = useCartStore()

    const productPrice = typeof price === 'number' ? price : parseFloat(price)
    const salePrice = productPrice - (productPrice * discountPercentage / 100)

    return parseFloat(salePrice.toFixed(2));
}
