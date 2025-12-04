import type { CartItem, Product } from "../types";

//lispageden sepete ekleme 
export function addToCart(prevCart: CartItem[], product: Product): CartItem[] { //previous cart (cart item tipinde) ve product (product tipinde) giriyor
                                                                                 //yeni CartItem çıkıyor
  const exists = prevCart.some(item => item.product.id === product.id);

  if (exists) {
    return prevCart; //ürün existse bir şey yapma
  }

  return [...prevCart, { product, quantity: 1 }]; //değilse ekle quantity bir olacak şekilde
}

//quantity arttır 
export function increaseQuantity(prevCart: CartItem[], productId: string): CartItem[] {
  return prevCart.map((item) => {
    if (item.product.id === productId) { //eşleşme varsa quantity + 1
      return { ...item, quantity: item.quantity + 1 };
    }
    return item; //yoksa bir şey yapma 
  });
}

//quantity azalt
export function decreaseQuantity(prevCart: CartItem[], productId: string): CartItem[] {
  return prevCart
    .map((item) => {
      if (item.product.id === productId) {
        return { ...item, quantity: item.quantity - 1 }; //item'in kopyasını oluştur ve quantity değiştir böylece state'e dokunmamış oluruz
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
}