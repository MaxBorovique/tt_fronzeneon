import { BASE_URL } from './../../../vars'
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
    return await fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        return data.products
      })
  }

  filterProductsByNames(products: Product[], data: string): Product[] {
    if(!data.length) return products;
    return products.filter((product) =>
      product.title.toLowerCase().trim().includes(data.toLowerCase().trim()),
    )
  }
}
