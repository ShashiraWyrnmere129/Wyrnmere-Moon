
import React from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "./products";
import { useCart } from "./CartContext";
import "./shop.css";

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return (
      <main className="wm-detail-page">
        <p className="wm-eyebrow">THE WYRMERE MOON</p>
        <h1>Treasure Not Found</h1>
        <p>It seems this little treasure has wandered away.</p>
        <Link className="wm-primary-link" to="/shop">
          Return to the Moonlit Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="wm-detail-page">
      <p className="wm-eyebrow">THE WYRMERE MOON</p>

      <Link className="wm-primary-link" to="/shop">
        ← Back to the Shop
      </Link>

      <section className="wm-detail-layout">
        <div className="wm-detail-image">
          <span className="wm-image-fallback">☾</span>
          {product.image && (
            <img src={product.image} alt={product.name} />
          )}
        </div>

        <div className="wm-detail-copy">
          <p className="wm-eyebrow">{product.category}</p>
          <h1>{product.name}</h1>

          <strong className="wm-detail-price">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.price)}
          </strong>

          <p>{product.description}</p>

          <button
            className="wm-checkout"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Bag
          </button>
        </div>
      </section>
    </main>
  );
}

