import { describe, it, expect } from "vitest";
import { filterAndSortProducts } from "../utils/filterAndSortProducts";
import type { Product } from "../types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Tesla Model S",
    brand: "Tesla",
    model: "Model S",
    price: 1000,
    image: "",
    createdAt: "",
     description: "Electric sedan"
  },
  {
    id: "2",
    name: "Audi A4",
    brand: "Audi",
    model: "A4",
    price: 500,
    image: "",
    createdAt: "",
     description: "Luxury sedan"
    },
    {
    id: "3",
    name: "Audi A4-2",
    brand: "Audi",
    model: "A4",
    price: 750,
    image: "",
    createdAt: "",
     description: "Luxury sedan"
  },
    {
    id: "4",
    name: "Audi A3",
    brand: "Audi",
    model: "A4",
    price: 900,
    image: "",
    createdAt: "",
     description: "Luxury sedan"
  }
];

describe("filterAndSortProducts - Search Filter", () => { //test grubu
  it("searchQuery verildiğinde yalnızca eşleşen ürünleri döndürmeli", () => { //testin kendisi 
    const result = filterAndSortProducts({
      products: mockProducts,
      searchQuery: "tesla",
      selectedBrand: "", //filter sort funcuna mock ürünlerimizi ve searchquery veriyoruz sort ve select boş
      sortOption: "",
    });

    expect(result.length).toBe(1); //dönen resultun 1 uzunlukta ve isminin bu olmasını bekliyoruz
    expect(result[0].name).toBe("Tesla Model S");
  });
});


describe("filterAndSortProducts - Brand Filter", () => { //test grubu
  it("selectedBrand verildiğinde yalnızca eşleşen ürünleri döndürmeli", () => { //testin kendisi 
    const result = filterAndSortProducts({
      products: mockProducts,
      searchQuery: "",
      selectedBrand: "Audi", //filter sort funcuna mock ürünlerimizi ve brand veriyoruz sort ve select boş
      sortOption: "",
    });

    expect(result.length).toBe(3); //dönen resultun 3 uzunlukta ve ilk ögenin isminin bu olmasını bekliyoruz
    expect(result[0].name).toBe("Audi A4");
  });
});

describe("filterAndSortProducts - Sort Ascending", () => { //test grubu
  it("sortOption verildiğinde ürünler fiyat düşükten yükseğe sırasıyla dönmeli", () => { //testin kendisi 
    const result = filterAndSortProducts({
      products: mockProducts,
      searchQuery: "",
      selectedBrand: "", //filter sort funcuna mock ürünlerimizi ve sort option asc veriyoruz brand ve select boş
      sortOption: "price-asc",
    });

    expect(result.length).toBe(4); //dönen resultun 4 uzunlukta ve ilk ögenin isminin bu olmasını bekliyoruz
    expect(result[0].name).toBe("Audi A4");
  });
});

describe("filterAndSortProducts - Sort Descending", () => { //test grubu
  it("sortOption verildiğinde ürünler fiyat yüksekten düşüğe sırasıyla dönmeli", () => { //testin kendisi 
    const result = filterAndSortProducts({
      products: mockProducts,
      searchQuery: "",
      selectedBrand: "", //filter sort funcuna mock ürünlerimizi ve sort option desc veriyoruz brand ve select boş
      sortOption: "price-desc",
    });

    expect(result.length).toBe(4); //dönen resultun 4 uzunlukta ve ilk ögenin isminin bu olmasını bekliyoruz
    expect(result[0].name).toBe("Tesla Model S");
  });
});

describe("filterAndSortProducts - All Options", () => { //test grubu
  it("ürünler önce searchten sonra filtreden geçip en son sort optiona göre sıralanmalı", () => { //testin kendisi 
    const result = filterAndSortProducts({
      products: mockProducts,
      searchQuery: "Audi A4",
      selectedBrand: "Audi", //filter sort funcuna mock ürünlerimizi ve hepsini veriyoruz
      sortOption: "price-desc",
    });

    expect(result.length).toBe(2); //dönen resultun 2 uzunlukta ve ilk ögenin isminin bu olmasını bekliyoruz
    expect(result[0].name).toBe("Audi A4-2");
  });
});

