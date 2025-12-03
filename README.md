# Eteration Frontend Case Study

Projeyi Visual Code Studio üzerinde geliştirdim. Kodun büyük kısmı tamamlandıktan sonra GitHub’a yükledim. Projede HTML, CSS, TypeScript ve React kullanıldı.

## Kullanılan Teknolojiler

- React (Vite)
- TypeScript
- React Router DOM
- CSS
- Fetch API
- LocalStorage

## Adım Adım Neler Yaptım

### 1) Tip Tanımları
Projeye başladıktan sonra `types.ts` dosyasını oluşturdum. API yapısına uygun bir `Product` tipi yazdım. Sepet işlemleri için `CartItem` tipi (product + quantity) tanımladım.

### 2) ProductListPage
Sayfa açıldığında:
- API’den ürünlerin çekilmesi için `useEffect` kullandım.
- Gelen veri `products` state’ine kaydedildi.
Bu sayfa; arama, filtreleme, sıralama, pagination ve sepet özelliklerini içeriyor.

### 3) ProductCard
Her ürün için ayrı bir kart bileşeni oluşturdum. Kart içerisinde görsel, ürün bilgileri ve “Add to Cart” butonu yer alıyor. Bu bileşen props üzerinden aldığı ürünü UI’da gösteriyor.

### 4) Grid Yapısı
`product-grid` ile üç sütunlu bir yapı oluşturdum.  
`products.map()` ile her ürün için ProductCard bileşeni oluşturularak grid içine yerleştirildi.

### 5) Pagination
12 ürünlük sayfalama kurdum.
- `currentPage` state’ini 1’den başlattım.
- `totalPages = ceil(products.length / 12)` olarak hesaplandı.
- `paginatedProducts`, slice ile `(startIndex, endIndex)` şeklinde elde edildi.
- Previous / Next butonları ile sayfa güncelleniyor.

### 6) Search
Arama kutusu eklendi.
- Arama boşsa → tüm ürünler
- Arama doluysa → eşleşen ürünler  
`filteredProducts` arama üzerinden filtreleniyor.  
Pagination artık `filteredProducts` üzerinden çalışıyor.

### 7) Brand Filtreleme
Bir `selectedBrand` state’i ekledim.  
`filteredProducts` artık hem arama hem brand filtresiyle belirleniyor.  
“All brands” seçildiyse state boş kalıyor ve tüm ürünler gösteriliyor.  
Radio butonlar HTML + CSS ile eklendi.

### 8) Layout Yapısı
Sol tarafta filtreler, ortada ürün listesi, sağda da sepet olacak şekilde bir layout oluşturdum.  
`page-layout` üzerinde flex kullanıldı.

### 9) Price Sorting
Bir `sortOption` state’i ekledim.  
`sortedProducts`, önce filter’lanmış ürünler üzerinde çalışıyor.  
- “price-asc”
- “price-desc”
Seçili değilse API’nin gelişi sırasını koruyor.

### 10) Cart
- `CartItem` tipi oluşturuldu.
- `cartItems` state’i eklendi.
- Ürün sepete eklenince quantity = 1 olarak ekleniyor.
- Ürün zaten sepetteyse tekrar eklenmiyor; + ve - ile miktar değişiyor.
- Quantity 0 olursa ürün listeden çıkarılıyor.
- Total fiyat `reduce` ile hesaplandı.
- Sepet ListPage ve DetailPage’de aynı yapıda gösteriliyor.

### 11) LocalStorage ile Cart Saklama
İki adet useEffect kullandım:
1) Sayfa ilk açıldığında localStorage’daki sepeti alan useEffect  
2) `cartItems` her değiştiğinde güncel sepeti localStorage’a yazan useEffect  
JSON.stringify / JSON.parse kullanıldı.

### 12) ProductDetailPage
- React Router kuruldu.
- `/products/:id` rotası oluşturuldu.
- `useParams` ile URL’den id alındı.
- `product` state’i Product | null olacak şekilde tanımlandı.
- ID değiştikçe çalışan useEffect içinde API’den o ürün fetch edildi.
- UI tarafında ürün resmi, adı, fiyatı, Add to Cart butonu ve açıklama gösterildi.
- Sepet paneli bu sayfaya da taşındı.
- Add to Cart butonunda `product &&` ile null kontrolü yapıldı.
- Back butonu ile “/” sayfasına dönüş eklendi.
- Ürün adının ProductListPage'de Link ile detail sayfasına yönlendirilmesi sağlandı.

## Pipeline

API → Products  
Products → (search & brand filter) → Filtered Products  
Filtered Products → (sortOption) → Sorted Products  
Sorted Products → (slice) → Paginated Products  
Paginated Products → (grid + map) → UI

## Özellikler

- Sayfalama (Pagination)
- Arama
- Brand Filtreleme
- Fiyat Sıralama
- Ürün Detay Sayfası
- Sepete Ürün Ekleme
- Miktar Arttırma / Azaltma
- Miktar 0 olunca ürünün silinmesi
- LocalStorage ile sepeti saklama
- Responsive tasarım

## Screenshots

### Product List Page
<img width="2547" height="1631" alt="image" src="https://github.com/user-attachments/assets/b4c49f08-6a42-4995-b204-37ec659d4cdd" />


### Product Detail Page
<img width="2535" height="1325" alt="image" src="https://github.com/user-attachments/assets/75bdd37e-3c9b-40a0-b08e-a3ce5d46d2ec" />

