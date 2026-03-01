// lib/ProductService.ts

import { ServiceBase } from "./ServiceBase"

export interface Product {
  id: number
  title: string
  price: number
  description: string
  image: string
  category: string
}

export class ProductService extends ServiceBase {
  static async getAll(): Promise<Product[]> {
    return this.request<Product[]>("/products")
  }

  static async getById(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`)
  }
}