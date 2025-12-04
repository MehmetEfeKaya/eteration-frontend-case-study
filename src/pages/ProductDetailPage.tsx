import { useParams } from "react-router-dom"; //urlden param alabilmek için
import { useState, useEffect } from "react";
import type { Product, CartItem } from "../types";
import { Link } from "react-router-dom";
const API_URL = "https://5fc9346b2af77700165ae514.mockapi.io/products";

function ProductDetailPage() {
  
  const { id } = useParams<{ id: string }>(); //URLDEN products/id deki id parçasını alıyoruz
  const [product, setProduct] = useState<Product | null>(null); //null başlayan bir bir product state'i ya product olacak ya null ilerde gelen id ile setProducta koyacaz 
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );
    const handleAddToCart = (product: Product) => { //product alıyor prev cart hesaplıyor ve onu setCartItemse veriyor
    setCartItems((prevCart) => { 
      const exists = prevCart.some((item) => item.product.id === product.id); //ürün zaten stepette var mı?
      if (exists) {
        return prevCart; //varsa eski cardı döndür 
      }
      return [...prevCart, { product, quantity: 1 }]; //yoksa eski cartın üstüne productı quantity 1 olarak ekle 
    });
  };

  const handleIncreaseQuantity = (productId: string) => {
    setCartItems((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 } //item'in kopyasını oluştur ve quantity değiştir böylece state'e dokunmamış oluruz
          : item
      )
    );
  };

  const handleDecreaseQuantity = (productId: string) => {
    setCartItems((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 } //yeni o id. elemanı dön item olarak prevcartac
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) return;

    try {
      const parsed = JSON.parse(storedCart) as CartItem[];
      setCartItems(parsed);
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
    }
  }, []);

    useEffect(() => {
    if (cartItems.length === 0) return;
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

    useEffect(() => {
    if (!id) return; //id yoksa bir şey yapma
    fetch(`${API_URL}/${id}`)
    .then((response) => response.json()) //response'u json yap response'un tipi bir product olacak
    .then((data: Product) => {
      // API'den gelen tek ürünü state'e koy
      setProduct(data); //apiden gelen ürünü state'e koy
    })
    .catch((error) => {
      console.error("Ürün yüklenirken hata oluştu:", error);
    });
    
  }, [id]); //yalnızca id değişince çalışır 

return (
  <div className="detail-layout">

    {/*sol taraf ürün fotosu*/}
    <Link to="/" style={{ display: "inline-block", marginBottom: "16px" }}>
  ← Back to Products
</Link>
    <div className="detail-image">
      {product && (
        <img 
          src={product.image} 
          alt={product.name} 
        />
      )}
      
    </div>

    {/*orta taraf ürün bilgilerini içerecek price description isim...*/}
    <div className="detail-info">

      <h2>{product?.name}</h2>
      <p className="detail-price">{product?.price} ₺</p>

      <button className="detail-add-button" //tek fark bu listpageden burda null olabileceği product mı değil mi ona da bakıyoruz 
      onClick={() => product && handleAddToCart(product)}> 
      Add to Cart
      </button>

      <p className="detail-description">
        {product?.description}
      </p>
    </div>

    {/*sağ tarafa cart'ı içerecek*/}
    <aside className="cart-panel">
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
                  <button
                    onClick={() => handleDecreaseQuantity(item.product.id)}
                  >
                    -
                  </button>
                  <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.product.id)}
                  >
                    +
                  </button>
                </div>
              </li>
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

export default ProductDetailPage;