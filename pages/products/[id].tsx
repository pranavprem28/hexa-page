import Image from "next/image"
import { ProductService, Product } from "@/lib/ProductService"

interface Props {
  product: Product
}

export default function ProductDetail({ product }: Props) {
  return (
    <div className="max-w-5xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12">
      <div className="relative h-96 bg-gray-50 rounded-xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-8"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-4 text-black">{product.title}</h1>
        <p className="text-gray-800 mb-6">{product.description}</p>
        <p className="text-2xl font-semibold text-black">₹ {product.price}</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const { id } = context.params
  const product = await ProductService.getById(id)

  return {
    props: {
      product,
    },
  }
}