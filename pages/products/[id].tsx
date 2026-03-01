import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import AddToCartButton from "../../components/AddToCartButton"
import type { Product } from "./index"

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = router.query

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!id) return

    const load = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!res.ok) throw new Error(`API failed: ${res.status}`)
        const data = (await res.json()) as Product
        setProduct(data)
      } catch (e: any) {
        setError(e?.message || "Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [id])

  return (
    <div className="min-h-screen bg-black text-white">


      <main className="max-w-5xl mx-auto px-6 py-12">
        {loading && <p className="text-gray-400">Loading product...</p>}

        {!loading && error && (
          <div className="bg-red-950/40 border border-red-800 rounded-xl p-4">
            <p className="font-semibold">Could not load product</p>
            <p className="text-sm text-red-200 mt-1">{error}</p>
          </div>
        )}

        {!loading && product && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative h-96 bg-white rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-8"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <p className="text-gray-300 mb-6">{product.description}</p>
              <p className="text-2xl font-semibold mb-6">₹ {product.price}</p>

              <AddToCartButton product={product} />
            </div>
          </div>
        )}
      </main>

    </div>
  )
}