interface ProductsQty {
    available: number
    inCart: number
}

interface ProductsRate {
    rate: number
    count: number
}

export interface Products {
    id: number
    title: string
    price: number
    description: string
    image: string
    rating: ProductsRate
    qty: ProductsQty
}
