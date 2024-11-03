'use client'

import React, { Fragment, useEffect, useState } from "react"
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"
import Image from "next/image"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"

interface CartItem {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    image: string
  }
}

export default function Component() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const discount = 4.0

  const token = Cookies.get("token")

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!token) {
          console.error("No token found")
          setLoading(false)
          return
        }

        const decoded: any = jwtDecode(token)
        const userId = decoded.id

        const response = await fetch(`/api/cart?userId=${userId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch cart items")
        }

        const data: CartItem[] = await response.json()
        setItems(data)
      } catch (error) {
        console.error("Error fetching cart items:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [token])

  const updateCartQuantity = async (id: number, newQuantity: number) => {
    try {
      const response = await fetch(`/api/cart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, quantity: newQuantity }),
      })

      if (!response.ok) {
        throw new Error("Failed to update cart item")
      }

      const updatedItem = await response.json()

      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? { ...item, quantity: updatedItem.quantity }
            : item
        )
      )
    } catch (error) {
      console.error("Error updating cart item:", error)
    }
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const total = subtotal - discount

  const handleCheckout = async () => {
    try {
      const checkoutItems = items.map((item) => ({
        product: {
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
        },
        quantity: item.quantity,
      }))

      const response = await fetch("/api/checkoutsession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: checkoutItems }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error("Failed to initiate checkout session:", error)
        return
      }

      const data = await response.json()
      window.location.href = data.url

      if (!token) {
        console.error("No token found")
        return
      }

      const decoded: { id: number } = jwtDecode(token)
      const userId = decoded.id

      await fetch("/api/cart/deleteall", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })
    } catch (error) {
      console.error("Error during checkout:", error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error("Failed to delete cart item:", error)
        return
      }

      setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    } catch (error) {
      console.error("Error during deletion:", error)
    }
  }

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-pulse" />
            <h1 className="text-2xl font-bold text-gray-700">Loading your cart...</h1>
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  }

  if (items.length === 0) {
    return (
      <Fragment>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-3xl shadow-lg text-center max-w-md w-full">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven&rsquo;t added any items to your cart yet.
            </p>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Start Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </Fragment>
    )
  }

  return (
    <Fragment>
      <Navbar />
      <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Shopping Bag</h1>
          <p className="mb-8 text-gray-600">
            <span className="font-semibold text-gray-900">{items.length} items</span> in your bag
          </p>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              {/* Mobile and Tablet View */}
              <div className="lg:hidden space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          className="object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                          <p className="text-sm text-gray-600">${item.product.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            onClick={() => {
                              const newQuantity = item.quantity - 1
                              if (newQuantity >= 1) {
                                updateCartQuantity(item.id, newQuantity)
                              }
                            }}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium text-gray-800">{item.quantity}</span>
                          <Button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold text-gray-800">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block bg-white p-6 rounded-3xl shadow-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left pb-4 font-semibold text-gray-600">Product</th>
                      <th className="text-center pb-4 font-semibold text-gray-600">Price</th>
                      <th className="text-center pb-4 font-semibold text-gray-600">Quantity</th>
                      <th className="text-right pb-4 font-semibold text-gray-600">Total</th>
                      <th className="pb-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b last:border-b-0">
                        <td className="py-6">
                          <div className="flex items-center">
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={80}
                              height={80}
                              className="object-cover rounded-lg"
                            />
                            <div className="ml-4">
                              <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-gray-600">
                          ${item.product.price.toFixed(2)}
                        </td>
                        <td className="text-center">
                          <div className="flex items-center justify-center">
                            <Button
                              onClick={() => {
                                const newQuantity = item.quantity - 1
                                if (newQuantity >= 1) {
                                  updateCartQuantity(item.id, newQuantity)
                                }
                              }}
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="mx-3 font-medium text-gray-800">{item.quantity}</span>
                            <Button
                              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="text-right font-semibold text-gray-800">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="text-right">
                          <Button
                            onClick={() => handleDelete(item.id)}
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="sticky top-4">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">Order Summary</h2>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-4 mb-6">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <Button
                      onClick={handleCheckout}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 rounded-full transition duration-200"
                    >
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}