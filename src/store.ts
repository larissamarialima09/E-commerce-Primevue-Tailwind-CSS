import { reactive } from 'vue'
import { Product } from '@/model/product.model'
import Cart from '@/model/cart.model'
import type { Category } from '@/model/category.model'

interface StoreStats {
  totalSales: number
  activeClients: number
  monthlyGrowth: number
}

interface Store {
  cart: Cart
  products: Product[]
  stats: StoreStats
}

const gamerCategory: Category = { id: 1, name: 'Gamer' }

export const store = reactive<Store>({
  cart: new Cart(),
  products: [
    new Product(
      1,
      'Teclado gamer',
      'Teclado mecânico com iluminação RGB',
      200,
      gamerCategory,
      'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTuK64YTZ06Tn3uUcUzI3JqHuTXlDK-K1RKeRLtvnQpWyI40QMBx_pQoBP1fhwlNtkmRF1m2SqQLV_r_E6dAD8MYwmzST1uZ-dnObo4kFByk97bIpvlcXkc07-Yl3sFL0jzvTwuQSxRtUI&usqp=CAc.jpg',
    ),
    new Product(
      2,
      'Mouse gamer',
      'Mouse gamer RGB com alta precisão',
      150,
      gamerCategory,
      'https://cdn.awsli.com.br/2500x2500/1318/1318167/produto/373743013/m991-rgb-1-7a89vvqfqv.jpg',
    ),
  ],
  stats: {
    totalSales: 0,
    activeClients: 0,
    monthlyGrowth: 0,
  },
})
