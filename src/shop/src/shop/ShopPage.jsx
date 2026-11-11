
import React, { useMemo, useState } from "react";
import { products } from "./products";
import { useCart } from "./CartContext";
import "./shop.css";

const money = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function ShopPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const { addToCart, count } = useCart();

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const visibleProducts = useMemo(() => {
    let result = products.filter(
      (product) => product.available !== false
    );

    if (category !== "All") {
      result = result.filter(
        (product) => product.category === category
      );
    }

    const term = search.trim().toLowerCase();

    if (term) {
      result = result.filter((product) =>
        `${product.name} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(term)
      );
    }

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "featured") {
      result.sort(
        (a, b) =>
          Number(b.featured) - Number(a.featured)
      );
    }

    return result;
  }, [category, search, sort]);

  return (
    <main className="wm-shop">
      <section className="wm-shop-hero">
        <div className="wm-shop-orbit">☾</div>

        <p className="wm-eyebrow">
          THE WYRMERE MOON
        </p>

        <h1>The Moonlit Shop</h1>

        <p>
          Discover readings, ritual treasures and
          little pieces of magic.
        </p>

        <a className="wm-text-link" href="/cart">
          View Your Bag ({count})
        </a>
      </section>

      <section className="wm-shop-controls">
        <div className="wm-category-list">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`wm-chip ${
                category === item ? "is-active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="wm-shop-tools">
          <input
            type="search"
            aria-label="Search products"
            placeholder="Search the shop..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          <select
            aria-label="Sort products"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </section>

      <section className="wm-product-grid">
        {visibleProducts.map((product) => (
          <article
            className="wm-product-card"
            key={product.id}
          >
            <a
              className="wm-product-image"
              href={`/shop/${product.slug}`}
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
              )}

              <span className="wm-image-fallback">
                ☾
              </span>

              {product.featured && (
                <span className="wm-featured">
                  Featured
                </span>
              )}
            </a>

            <div className="wm-product-info">
              <p className="wm-product-category">
                {product.category}
              </p>

              <h2>
                <a href={`/shop/${product.slug}`}>
                  {product.name}
                </a>
              </h2>

              <p className="wm-product-description">
                {product.description}
              </p>

              <div className="wm-product-buy">
                <strong>{money(product.price)}</strong>

                <button
                  type="button"
                  onClick={() => addToCart(product)}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {visibleProducts.length === 0 && (
        <div className="wm-empty">
          <span>☾</span>
          <h2>No treasures found</h2>
          <p>
            Try another search or choose a different category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </main>
  );
}

