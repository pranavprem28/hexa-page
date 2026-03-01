"use client"

import { useCart } from "@/context/CartContext"

interface Product {
  id: number
  title: string
  price: number
  image: string
}

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-gray-900 text-white py-2 rounded-lg 
                 hover:bg-gray-700 transition"
    >
      Add to Cart
    </button>
  )
}