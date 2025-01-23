export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  brand: string
  thumbnail: string
}

export class ProductService {
  async fetchProducts(): Promise<Product[]> {
    return await fetch('https://dummyjson.com/products?limit=100')
      .then((res) => res.json())
      .then((data) => {
        return data.products
      })
  }
}
