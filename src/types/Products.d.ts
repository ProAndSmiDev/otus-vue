interface IProductsRate {
    rate: number
    count: number
}

export interface IProducts {
    id: number
    title: string
    price: number
    description: string
    image: string
    rating: IProductsRate
    qty: number
}
