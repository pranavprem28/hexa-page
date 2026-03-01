import { useEffect, useState } from "react"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import ProductCard from "../../components/ProductCard"

export interface Product {
  id: number
  title: string
  price: number
  image: string
  category?: string
  description?: string
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        setError("")
        const res = await fetch("https://fakestoreapi.com/products")
        if (!res.ok) throw new Error(`API failed: ${res.status}`)
        const data = (await res.json()) as Product[]
        setProducts(data)
      } catch (e: any) {
        setError(e?.message || "Failed to load products")
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">


      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">Products</h1>

        {loading && <p className="text-gray-400">Loading products...</p>}

        {!loading && error && (
          <div className="bg-red-950/40 border border-red-800 rounded-xl p-4">
            <p className="font-semibold">Could not load products</p>
            <p className="text-sm text-red-200 mt-1">{error}</p>
            <p className="text-sm text-gray-400 mt-2">
              This happens when the API blocks Vercel server requests. Client-side fetch avoids that.
            </p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>


    </div>
  )
}