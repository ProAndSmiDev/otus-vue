interface IProductsRate {
    rate: number
    count: number
}

interface IProductsItem {
    id: number
    title: string
    price: number
    description: string
    image: string
    rating: IProductsRate
}

export interface IProducts {
    item?: IProductsItem
    qty?: number
}
