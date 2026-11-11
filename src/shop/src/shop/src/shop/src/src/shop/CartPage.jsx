
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "./shop.css";

const money = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    count,
  } = useCart();

  const [checkoutMessage, setCheckoutMessage] =
    useState("");

  return (
    <main className="wm-cart-page">
      <p className="wm-eyebrow">THE WYRMERE MOON</p>
      <h1>Your Moonlit Bag</h1>

      {items.length === 0 ? (
        <section className="wm-empty">
          <span>☾</span>
          <h2>Your bag is waiting for a little magic.</h2>
          <p>You haven't added anything yet.</p>
          <Link className="wm-checkout" to="/shop">
            Explore the Shop
          </Link>
        </section>
      ) : (
        <>
          <p className="wm-cart-note">
            {count} {count === 1 ? "item" : "items"} in your bag
          </p>

          <section className="wm-cart-list">
            {items.map((item) => (
              <article className="wm-cart-row" key={item.id}>
                <div>
                  <h2>{item.name}</h2>
                  <p>{item.category}</p>
                  <strong>{money(item.price)} each</strong>
                </div>

                <label>
                  Qty
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={item.quantity}
                    onChange={(event) => {
                      const quantity = Number(event.target.value);
                      updateQuantity(
                        item.id,
                        Math.max(1, Math.min(99, quantity || 1))
                      );
                    }}
                  />
                </label>

                <strong>
                  {money(item.price * item.quantity)}
                </strong>

                <button
                  className="wm-remove"
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </section>

          <section className="wm-cart-total">
            <span>Subtotal</span>
            <strong>{money(subtotal)}</strong>
          </section>

          <p className="wm-cart-note">
            Shipping and any applicable taxes are calculated at checkout.
          </p>

          <button
            className="wm-checkout"
            type="button"
            onClick={() =>
              setCheckoutMessage(
                "Checkout is being prepared. Secure payment processing must be connected before customers can place orders."
              )
            }
          >
            Continue to Checkout
          </button>

          {checkoutMessage && (
            <p className="wm-checkout-notice" role="status">
              {checkoutMessage}
            </p>
          )}

          <p>
            <Link className="wm-primary-link" to="/shop">
              Continue Shopping
            </Link>
          </p>
        </>
      )}
    </main>
  );
}

