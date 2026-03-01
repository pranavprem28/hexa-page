"use client"

import Image from "next/image"
import { useCart } from "@/context/CartContext"

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-black">
          Your cart is empty 🛒
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

        {/* LEFT - CART ITEMS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-8 text-black">
            Shopping Cart
          </h1>

          <div className="space-y-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border-b pb-6"
              >
                {/* Image */}
                <div className="relative w-24 h-24 bg-gray-100 rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-3"
                  />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg text-black">
                    {item.title}
                  </h2>

                  <p className="text-black font-medium mt-1">
                    ₹ {item.price.toFixed(2)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-4">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 text-black"
                    >
                      -
                    </button>

                    <span className="font-semibold text-black">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 text-black"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <p className="font-bold text-black text-lg">
                    ₹ {(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 text-sm mt-2 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow-sm p-8 h-fit">
          <h2 className="text-xl font-bold mb-6 text-black">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4 text-black">
            <span>Subtotal</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-4 text-black">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="border-t pt-4 flex justify-between font-bold text-lg text-black">
            <span>Total</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  )
}