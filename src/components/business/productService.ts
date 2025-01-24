import { ref } from 'vue'
import { BASE_URL, LIMIT } from '../../../vars'
import type { Product } from '@/types/product'


export class ProductService {
  private products = ref<Product[]>([])

  async fetchProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${LIMIT}`)
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      const fetchedProducts = data.products || []

      this.products.value = fetchedProducts

      return fetchedProducts
    } catch (error) {
      console.error(error)
      return []
    }
  }

  filterProductsByNames(products: Product[], data: string): Product[] {
    return products.filter((product) =>
      product.title.toLowerCase().includes(data.toLowerCase().trim()),
    )
  }
}
