# Eteration Frontend Case Study

Projeyi Visual Code Studio üzerinde geliştirdim. Kodun büyük kısmı tamamlandıktan sonra GitHub’a yükledim. Projede HTML, CSS, TypeScript ve React kullanıldı.

## Kullanılan Teknolojiler

- React (Vite)
- TypeScript
- React Router DOM
- CSS
- Fetch API
- LocalStorage

## Adım adım neler yaptım

1. Öncelikle projeyi açıp gerekli kurulumları (npm install vb.) yaptım. Ardından types.ts dosyasını oluşturdum ve verilen API’ye uygun bir Product tipi tanımladım.

2. ProductListPage sayfasını oluşturdum.
   Bu sayfa, API adresini biliyor ve useEffect içinde sayfa yüklendiğinde API’den ürünleri çekiyor. Gelen ürünler, başlangıçta boş bir dizi olarak tanımladığım products state’ine kaydediliyor.

3. ProductCard bileşenini oluşturdum.
   Bu bileşen, ProductListPage’den gelen prop’u alıp içinden product bilgisini ayırıyor ve bu veriyi kullanarak tek bir ürün kartını çiziyor. product-card, product-card__image gibi sınıf isimleriyle gerekli bilgileri arayüze yansıttım.

4. ProductCard bileşenini liste sayfasına bağladım.
   product-grid ile bir grid yapısı kurdum ve altında map kullanarak oluşan ürün kartlarını ekrana bastım. Her bir ürün için bir ProductCard çağrılıyor ve oluşan kartlar grid içinde yerini alıyor.

5. Sayfalama (pagination) ekledim.
   Önce bir sayfada gösterilecek maksimum ürün sayısı için bir sabit tanımladım. Ardından başlangıç ve bitiş indekslerini hesapladım; sayfa numarasına göre bu indeksler değişiyor. currentPage isimli bir state ile aktif sayfayı tuttum ve toplam sayfa sayısını, ürün sayısını 12’ye bölüp tavanını alarak hesapladım.
   paginatedProducts dizisini slice(startIndex, endIndex) ile oluşturdum; her sayfada sadece o sayfaya ait 12 ürün gösteriliyor. Next ve Previous butonlarını disabled koşulları ve fonksiyonellikleriyle ekledim. Bu butonlara basıldığında setCurrentPage çağrılıyor, sayfa değişiyor ve buna göre paginatedProducts da güncelleniyor.

6. Arama (search) özelliği ekledim.
   Bir searchQuery state’i tanımladım ve bir metin kutusu ekledim.
   Daha sonra products.filter kullanarak filteredProducts dizisini ürettim. Artık önce filtreleme yapılıyor, sonra pagination uygulanıyor ki farklı sayfalardaki eşleşen ürünler aynı sayfada toplanabilsin. Arama boşsa filteredProducts direkt products dizisine eşit oluyor.

7. Marka (brand) filtresi ekledim.
   Önce bir selectedBrand state’i ekledim ve boş değerle başlattım. Sonra filteredProducts hesabını güncelledim; artık hem aramadan geçen hem de seçilen marka filtresine uyan ürünler bu diziyi oluşturuyor.
   “All brands” seçeneği seçili olduğunda state boş ("") oluyor ve bu durumda marka filtresi devre dışı kalıyor, yani tüm ürünler filtreyi geçiyor. Gerekli radio input’larını HTML ve CSS ile ekledim.

8. Genel layout yapısını oluşturdum.
   Filtreler ve sıralama için kullandığım radio butonlarını sol tarafa, ürün listesini orta alana, sepeti ise sağ tarafa yerleştirdim. Bunu yaparken aside ve main kullanarak sayfayı üç sütunlu bir yapıya dönüştürdüm ve CSS ile düzenledim.

9. Fiyata göre sıralama (sort) ekledim.
   sortOption isimli bir state ekledim ve başlangıçta boş bıraktım.
   Filtre ve aramadan geçen filteredProducts dizisini, sortOption değerine göre sıraladım. price-asc seçiliyken düşükten yükseğe, price-desc seçiliyken yüksekten düşüğe doğru sıralama yapılıyor. Pagination artık bu sıralanmış dizi (sortedProducts) üzerinden çalışıyor.

10. Sepet (cart) yapısını oluşturdum.
    types.ts dosyasına CartItem tipini ekledim; bu tip bir product ve bir quantity tutuyor.
    Başlangıçta boş bir cartItems state’i tanımladım. Sepette ürün varsa map ile dönerek <li> elemanları içinde ürün adını, fiyatını ve miktar bilgisini ekrana bastım.
    handleAddToCart fonksiyonunu yazdım. ProductCard içindeki “Add to Cart” butonuna tıklanınca bu fonksiyon çağrılıyor ve ilgili ürün cartItems dizisine ekleniyor (eğer daha önce eklenmediyse). Sepetteki her ürünün yanına + ve - butonları ekledim; bu butonlara basılınca arttırma ve azaltma fonksiyonları çağrılıyor ve quantity değerleri güncelleniyor. Son olarak sepet toplam tutarını hesaplayıp en alta yazdırdım.

11. Local Storage ile sepeti korudum.
    Sayfa ilk açıldığında localStorage’dan mevcut sepeti yükleyen bir useEffect yazdım. Burada "cart" anahtarıyla kaydedilmiş veriyi okuyup JSON.parse ile çözdüm ve cartItems state’ine aktardım.
    İkinci bir useEffect içinde, cartItems değiştiği her durumda güncel sepeti localStorage içine JSON.stringify ile string’e çevirerek kaydettim. Böylece sayfa yenilense bile sepet korunmuş oluyor.

12. Ürün detay sayfasını (Detail Page) ekledim.
    Önce React Router’ı projeye ekledim ve ana uygulama dosyasında (App) route yapısını kurdum. Ardından ProductDetailPage bileşenini oluşturdum.
    Bu sayfada useParams ile URL’den id parametresini alıyorum (/products/:id sonrası). Bir product state’i tanımladım ve bunu Product | null olacak şekilde ayarladım. Sadece URL’deki id değiştiğinde çalışan bir useEffect yazdım ve bu efekt içinde API’den ilgili ürünü fetch ederek product state’ini güncelledim.
    API’den çekilen ürünün detaylarını layout kullanarak arayüze verdim: sol tarafta ürün resmi ve geri dönüş butonu, ortada ürün adı, fiyatı, açıklaması ve “Add to Cart” butonu, en sağda ise sepet bölümü yer alıyor. Liste sayfasındaki sepet yapısını burada da kullandım.
    Bu sayfada product başlangıçta null olabileceği için “Add to Cart” butonunun onClick kısmında hem buton fonksiyonunu çağırdım hem de product değerinin null olmadığını ekstra kontrol ettim.
    Son olarak React Router’ın Link bileşenini kullanarak:
    - Liste sayfasındaki ürün adını tıklayınca /products/:id adresine gitmesini,
    - Detay sayfasındaki geri butonuna basınca tekrar ana sayfaya ("/") dönmesini sağladım.

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
### Product Detail Page
<img width="2598" height="1220" alt="image" src="https://github.com/user-attachments/assets/3d031a0b-ee0d-4b03-b7b2-a9772b3a33f0" />

### Product List Page
<img width="2591" height="1621" alt="image" src="https://github.com/user-attachments/assets/80a95921-7a40-4d9b-85e5-72f9c4980a26" />


