import type { Product } from "../types";

type FilterAndSortParams = { // fonksiyon parametre objesi (props gibi)
  products: Product[];
  searchQuery: string;
  selectedBrand: string;
  sortOption: string;
};

export function filterAndSortProducts({
  products,
  searchQuery,
  selectedBrand,
  sortOption,
}: FilterAndSortParams): Product[] {

  const searchFiltered = products.filter((product) => {
    if (!searchQuery.trim()) return true;
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()); //listpagedeki aynı search mantığı (eski)
  });


  const brandFiltered = searchFiltered.filter((product) => { //listpagedeki aynı brand filter mantığı 
    if (!selectedBrand) return true;
    return product.brand === selectedBrand;
  });

 const sorted = [...brandFiltered].sort((a, b) => { //bu bir sort fonksiyonu yukardakiler filterdı
    if (!sortOption) return 0;

    if (sortOption === "price-asc") {
      return a.price - b.price;
    }

    if (sortOption === "price-desc") {
      return b.price - a.price;
    }

    return 0; 
  });

  return sorted;
}

