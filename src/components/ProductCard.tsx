import type { Product } from "../types";
import { Link } from "react-router-dom";

type ProductCardProps = {  //card bir product alacak tipi de product olacak props objesinin tipi productcardprops
    product: Product;  //product = componenta gelen tek veri ve Product olmalı
    onAddToCart: (product: Product) => void;
};

function ProductCard ({ product , onAddToCart} : ProductCardProps) { 
    return (
       <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-card__image"
        />

      <div className="product-card__body">
        <Link to={`/products/${product.id}`}>
  <h3 className="product-card__name">{product.name}</h3>
</Link>
        <p className="product-card__brand">
          {product.brand} • {product.model}
        </p>
        <p className="product-card__price">{product.price} ₺</p>
        <button className="product-card__button" // click halinde props olarak aldığımız onaddtocartı çağırıyoruz productu kullanarak o da handle add to cartı çağırıyor sayfadaki 
            onClick={() => onAddToCart(product)}> 
            Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
