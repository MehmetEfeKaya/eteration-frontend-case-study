import { describe, it, expect } from "vitest";
import { addToCart, increaseQuantity, decreaseQuantity } from "../utils/cartUtils";
import type { CartItem, Product } from "../types";

const mockProductTesla: Product = {
  id: "1",
  name: "Tesla Model S",
  brand: "Tesla",
  model: "Model S",
  price: 1000,
  image: "",
  createdAt: "",
  description: "Electric sedan",
};

const mockProductAudi: Product = {
  id: "2",
  name: "Audi A4",
  brand: "Audi",
  model: "A4",
  price: 500,
  image: "",
  createdAt: "",
  description: "Luxury sedan",
};


describe("addToCart", () => {
  it("sepette hiç ürün yokken yeni ürün eklendiğinde quantity 1 ile eklenmeli", () => {
    const prevCart: CartItem[] = []; // başlangıçta boş sepet

    const result = addToCart(prevCart, mockProductTesla); //add to carta sepeti ve mock ürünü veriyoruz

    expect(result.length).toBe(1); //length ve quantity 1 olmalı
    expect(result[0].product.name).toBe("Tesla Model S"); //isim bu olmalı 
    expect(result[0].quantity).toBe(1);
  });
});

describe("addToCart", () => {
  it("sepette o ürün varken o ürünü ekleye basınca değişiklik olmaması quantity 1 kalacak", () => {
           const prevCart: CartItem[] = [
      {
        product: mockProductTesla,
        quantity: 1,
      },
    ];  // başlangıçta sepette ürün var

    const result = addToCart(prevCart, mockProductTesla); //add to carta sepeti ve mock ürünü veriyoruz

    expect(result.length).toBe(1); //length ve quantity 1 olmalı
    expect(result[0].product.name).toBe("Tesla Model S"); //isim bu olmalı 
    expect(result[0].quantity).toBe(1);
  });
});

describe("Quantity Increase at Cart", () => {
  it("sepetteki ürünün miktarı 1 artmalı", () => {
       const prevCart: CartItem[] = [
      {
        product: mockProductTesla,
        quantity: 1,
      },
    ];  // başlangıçta sepette ürün var

    const result = increaseQuantity(prevCart,mockProductTesla.id); //add to carta sepeti ve mock ürünün id'yi veriyoruz

    expect(result.length).toBe(1); //length 1 ve quantity 2 olmalı
    expect(result[0].product.name).toBe("Tesla Model S"); //isim bu olmalı 
    expect(result[0].quantity).toBe(2);
  });
});

describe("Quantity Increase at Cart", () => {
  it("sepetteki olmayan ürünün miktarı 1 arttırmaya çalışınca değişiklik olmamalı", () => {
       const prevCart: CartItem[] = [
      {
        product: mockProductAudi,
        quantity: 1,
      },
    ];  // başlangıçta sepette ürün var

    const result = increaseQuantity(prevCart,mockProductTesla.id); //sepette olmayan ürünün quantity arrtırmaya çalışıyoruz

    expect(result.length).toBe(1); //length 1 kalmalı
    expect(result[0].product.name).toBe("Audi A4");
  });
});

describe("Quantity Decrease at Cart", () => {
  it("sepetteki ürünün quantity 1 azalmalı", () => {
       const prevCart: CartItem[] = [
      {
        product: mockProductAudi,
        quantity: 2,
      },
    ];  // başlangıçta sepette ürün var

    const result = decreaseQuantity(prevCart,mockProductAudi.id); 

    expect(result.length).toBe(1); 
    expect(result[0].product.name).toBe("Audi A4");
    expect(result[0].quantity).toBe(1); //yeni quantity sıfır olmalı
  });
});

describe("Quantity Decrease at Cart", () => {
  it("sepetteki ürünün quantity 1 azalmalı ve sıfır olup silinmeli", () => {
       const prevCart: CartItem[] = [
      {
        product: mockProductAudi,
        quantity: 1,
      },
    ];  // başlangıçta sepette ürün var

    const result = decreaseQuantity(prevCart,mockProductAudi.id); //sepette 1 olan ürünü sıfır yapıp siliyoruz

    expect(result.length).toBe(0); //sepet boş olmalı
  });
});