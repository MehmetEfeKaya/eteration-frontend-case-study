export type Product = {
  id: string;
  createdAt: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  model: string;
  description : string;
};

export type CartItem = {
  product: Product;   
  quantity: number;  
};
