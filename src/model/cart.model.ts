import type { Product } from "./product.model";

export interface CartItem{
    product: Product,
    quantity:number,
}
export default class Cart{
    constructor(
       public list: CartItem[] = [],
       public total:number = 0,
       public price: number = 0,
       
    ){}

    addItem(product: Product) {
    const existItem = this.list.find(item=> item.product.name === product.name);

        if (existItem) {
         existItem.quantity ++;
        }else {
      this.list.push({ product, quantity: 1 });
    }

    this.total ++;
    this.price += product.price;
  }

    decItem(id: number) {
   const item = this.list.find(i => i.product.id === id);
    if (!item) return;

    item.quantity--;

    this.total--;
    this.price -= item.product.price;

    if (item.quantity <= 0) {
      this.excludeItem(item.product.name);
    }
  }

     excludeItem(productId: number) {
    const index = this.list.findIndex( item => item.product.id == productId);
    
    if (index !== -1) {

      const item = this.list[index];

      this.total -= item.quantity;
      this.price -= item.product.price * item.quantity;

      this.list.splice(index, 1);
    }
  }

}
