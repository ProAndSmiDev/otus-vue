interface ProductRate {
    rate: number
    count: number
}

export interface IProductsItem {
    id: number
    title: string
    price: number
    description: string
    image: string
    rating: ProductRate
}
