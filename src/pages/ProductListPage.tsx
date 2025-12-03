import { useEffect , useState}  from "react";

import type { Product, CartItem } from "../types";

import ProductCard from "../components/ProductCard";



const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";
const ITEMS_PER_PAGE = 12; //sayfa başına 12 ürün
const BRANDS = [
"Lamborghini",
"Smart",
"Ferrari",
"Volkswagen",
"Mercedes Benz",
"Tesla",
"Fiat",
"Land Rover",
"Nissan",
"Maserati",
"Bugatti",
"Aston Martin",
"Rolls Royce",
"Audi",
"Cadillac",
"Kia",
"Hyundai",
"Mazda",
"Mini",
"Dodge",
"Polestar",
"BMW",
"Jeep",
"Ford",
];


function ProductListPage() {
    const [products,setProducts] = useState<Product[]>([]); //state Product arrayı tutacak başta boş
                                                    //products o anki değer setProducts ise update içim kullanılacak func

    const [currentPage, setCurrentPage] = useState(1); //1. sayfa state'inden başlayarak güncel sayfa tutan currentPage ve
                                                        //sayfa değiştirme funcu

    const [searchQuery, setSearchQuery] = useState(""); //search state'i başta boş

  const [selectedBrand, setSelectedBrand] = useState(""); //brand state'i başta seçilmiş yok 
    
  const [sortOption, setSortOption] = useState("") //sort state'i başta yok

  const[cartItems, setCartItems] = useState<CartItem[]>([]) //içi boş bir cartitem arrayı ile başlıyor cart items o statede içinde bulunan itemlar


const cartTotal = cartItems.reduce((sum, item) => {
  return sum + item.quantity * item.product.price; // sum başta 0 her item için quantity*price ekliyor ve total sum hesaplıyor
}, 0);

const handleAddToCart = (product: Product) => {
  setCartItems((prevCart) => { //statedeki cartitems'i prevcart ile set edicez prevcartı iflerle belirlyeceğiz 
    const exists = prevCart.some(
      (item) => item.product.id === product.id
    ); //exist mi değil mi check

    if (exists) {
      return prevCart; //ürün sepetteyse bişey yapma
    }
    return [...prevCart, { product, quantity: 1 }]; //ilk eklenişse quantity 1 yap ve listeye ekle
  });
};

const handleIncreaseQuantity = (productId: string) => {
  setCartItems((prevCart) => 
    prevCart.map((item) => //tüm Cartı dolaş ve param aldığımız productid ile eşleşen itemin quantitysini bir arttır
      item.product.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const handleDecreaseQuantity = (productId: string) => {
  setCartItems((prevCart) =>
    prevCart.map((item) => //tüm Cartı dolaş ve param aldığımız productid ile eşleşen itemin quantitysini bir azalt
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

    useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data: Product[]) => { //data jsondan gelen bir product dizisi 
        //datayı state'e konsun
        setProducts(data);
      });
  }, []);

  useEffect(() => { //açılınca localden cart'ı çekicem
  const storedCart = localStorage.getItem("cart");

  if (storedCart) { //eğer storedCart boş değilse Json ile parse et ve bir string yap sonra setCartItems ile bunu set et state için
    try {
      const parsedCart = JSON.parse(storedCart);
      setCartItems(parsedCart);
    } catch (error) {
      console.error("Error parsing cart", error);
    }
  }
}, []); //yalnızca bir kere çalışır açıldığında koşulsuz

useEffect(() => {  //her değişiklikte locale kaydet +,- basıldı ürün eklendi/silindi hepsinde o "cartı" string yapıp locale save et
    if (cartItems.length > 0) //eğer sepet boşsa kaydetme diğer useEffect etkilenmesin ilk çekerken sorun olmasın
  localStorage.setItem("cart", JSON.stringify(cartItems));
}, [cartItems]); //cart items = dependency array. bu useEffect yalnızca bu değiştiğinde çalışır 

const filteredProducts = products.filter((product) => {
  const matchesSearch = !searchQuery.trim()
    ? true //boş ise arama true dönüyoruz tüm ürünler gösterilecek
    : product.name.toLowerCase().includes(searchQuery.toLowerCase()); //boş değilse aramada uyuşanlar

  const matchesBrand =
    !selectedBrand || product.brand === selectedBrand; //selectedbrand boş ise true hepsini dönüyoruz
    //seçim yapılmışsa product brand ile selected brand uyuşuyorsa true

  return matchesSearch && matchesBrand; //her product için burda ikisi de true olanlar filtered productsa giriyor hem searchten hem brandden geçmeli
});

const sortedProducts = [...filteredProducts].sort((a, b) => { //[...] yapısı yeni bir array oluşturur sort yaparken orjinale zarar vermez
  if (sortOption === "price-asc") {
    // düşükten yükseğe
    return a.price - b.price; //a'nın fiyatı daha düşük olursa negatif olur a b'nin önüne geçer ascending
  }

  if (sortOption === "price-desc") {
    // yüksekten düşüğe
    return b.price - a.price; //b'nin fiyatı daha yüksekse pozitif olur b a'nın önüne geçer 
  }

  // sort seçilmemişse api'nin geliş sırasında kalacak
  return 0;
});

    

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE); // ceil (74/12) = 7 sayfa
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE; //1. sayfa için start 0, 2. sayfa için (2-1)*12 = 12
  const endIndex = startIndex + ITEMS_PER_PAGE; //1. sayfa için end 12 2. sayfa için 24  //0-12, 12-24, 24-36...
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex); //sayfa 1 için paginatedProducts = products.slice(0,12)


 
return ( //sol tarafta sidebar var brand,model ve sort kısmı ortada productlar
  <div className="page-layout"> 
    <aside className="sidebar"> 
      <h2>Filters</h2>

      <section className="filter-section">
      <h3>Sort By</h3>

      <label>
      <input //default bu seçili
      type = "radio"
      value = ""
      checked={sortOption===""} 
      onChange = {(event) => setSortOption(event.target.value)} 
      />
      Default 
      </label>

    <label>
      <input
      type = "radio"
      value = "price-asc"
      checked={sortOption==="price-asc"} //radioda tik atılan buysa setSortOption fonksiyonu ile state'i price asc'ye çevir 
      onChange = {(event) => setSortOption(event.target.value)}
      />
      Price Low to High
      </label>

       <label>
      <input
      type = "radio"
      value = "price-desc"
      checked={sortOption==="price-desc"}
      onChange = {(event) => setSortOption(event.target.value)}
      />
      Price High to Low
      </label>

      </section>

      <section className="filter-section">
        <h3>Brand</h3>

        <label>
          <input
            type="radio" //radio şeklinde brand selection
            value=""
            checked={selectedBrand === ""}
            onChange={(event) => setSelectedBrand(event.target.value)} //kullanıcı all brands seçerse selected brand "" olur
          />
          All brands
        </label>

        {BRANDS.map((brand) => ( //her brand name için radio oluşturuyoruz
          <label key={brand}>
            <input
              type="radio"
              value={brand}
              checked={selectedBrand === brand}
              onChange={(event) => setSelectedBrand(event.target.value)} //change halinde state değiştiren fonksiyonu value ile değiştiriyoruz
            />
            {brand}
          </label>
        ))}
      </section>
    </aside>

    <main className="main-content">
      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
      />

      <p>Found {filteredProducts.length} products</p>


      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="product-grid">
            {paginatedProducts.map((product) => (
              <ProductCard 
              key={product.id} 
              product={product}
              onAddToCart= {handleAddToCart} /> //fonskiyonu carda props olarak yolluyoruz ki butona basıldığında söylesin tek başına yapamaz itemlist state vs bizde ama button bilgisi de onda
            ))}
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            <span>
              Page {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </main>
<aside className="cart-panel">
      {/* Sepet burada olacak */}
      <h2>Cart</h2>

      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
        <ul>
          {cartItems.map((item) => (
            <li key={item.product.id}>
              <div>{item.product.name}</div>
              <div>
                {item.quantity} x {item.product.price} ₺
              </div>

        <div> 
        <button onClick={() => handleDecreaseQuantity(item.product.id)}> 
          - 
        </button>
        <span style={{ margin: "0 8px" }}>{item.quantity}</span> 
        <button onClick={() => handleIncreaseQuantity(item.product.id)}>
          +
        </button> 
      </div>
            </li> // - ye basılırsa decrease + ya basılırsa increase eldeki item'in product.id si param olacak şekilde funca gidiyo arada da quantity yazıyor 
          ))}
        </ul>
           <div style={{ marginTop: "12px", fontWeight: 600 }}>
        Total: {cartTotal} ₺
      </div>
       </>
      )}
    </aside>
  </div>
);
}


  export default ProductListPage;
