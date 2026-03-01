import Image from "next/image"
import Link from "next/link"
import { ProductService, Product } from "@/lib/ProductService"
import AddToCartButton from "@/components/AddToCartButton"

interface Props {
  products: Product[]
}

export default function ProductsPage({ products }: Props) {
  return (
    <div className="max-w-6xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold mb-10 text-black">
        Products
      </h1>

      <div className="grid md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 p-5 rounded-2xl
                       shadow-sm hover:shadow-lg hover:-translate-y-1
                       transition-all duration-300 group"
          >
            {/* Product Image */}
            <Link href={`/products/${product.id}`} className="block">
              <div className="bg-gray-50 rounded-xl h-48 flex items-center justify-center overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain h-40 transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Title */}
              <h2 className="mt-4 font-semibold text-gray-800 line-clamp-2">
                {product.title}
              </h2>
            </Link>

            {/* Price */}
            <p className="text-lg font-bold text-gray-900 mt-2">
              ₹ {product.price.toLocaleString()}
            </p>

            {/* Add To Cart Button */}
            <div className="mt-4">
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ===========================
   Server Side Data Fetching
=========================== */
export async function getServerSideProps() {
  const products = await ProductService.getAll()

  return {
    props: {
      products,
    },
  }
}