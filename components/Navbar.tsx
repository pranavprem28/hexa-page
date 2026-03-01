"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { Search, ShoppingCart, Menu, X } from "lucide-react"

export default function Navbar() {
  const { totalItems } = useCart()

  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-semibold tracking-tight text-gray-900"
        >
          Hexa
        </Link>

        {/* Desktop Search */}
        <div className="flex-1 max-w-md hidden md:flex">
          <div className="relative w-full">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-gray-100 border border-gray-300 rounded-full py-2 pl-9 pr-4 text-sm 
              text-gray-900 placeholder:text-gray-500 
              focus:outline-none focus:ring-2 focus:ring-gray-900 transition"
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">

          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          <Link href="/products" className="hover:text-black transition">
            Products
          </Link>

          <Link href="/about" className="hover:text-black transition">
            About
          </Link>

          <Link href="/contact" className="hover:text-black transition">
            Contact
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1 hover:text-black transition"
          >
            <ShoppingCart size={18} />

            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">

          {/* Mobile Search Icon */}
          <Search size={20} className="text-gray-700" />

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart size={20} className="text-gray-700" />
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-black text-white text-[10px] px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-4 text-sm font-medium text-gray-700">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </header>
  )
}