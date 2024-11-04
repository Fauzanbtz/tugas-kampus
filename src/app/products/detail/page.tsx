'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { Truck, ShieldCheck, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/common/Navbar"
import Footer from "@/components/common/Footer"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  features: string[];
}

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const productId = new URLSearchParams(window.location.search).get("id")

    const fetchProduct = async (): Promise<void> => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        if (response.ok) {
          const data: Product = await response.json()
          setProduct({
            ...data,
            features: [
              "High-quality materials",
              "Durable construction",
              "Easy to clean",
              "Versatile design",
              "Eco-friendly manufacturing"
            ]
          })
        } else {
          throw new Error("Failed to load product details")
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast({
          title: "Error fetching product",
          description: "Failed to load product details.",
          variant: "destructive",
        })
        router.push("/products")
      } finally {
        setLoading(false)
      }
    }

    void fetchProduct()
  }, [router, toast])

  const handleAddToCart = async () => {
    const token = Cookies.get("token")

    try {
      if (!token) {
        router.push("/login")
        throw new Error("Token not found, please ensure you're logged in.")
      }

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product?.id, quantity }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to add product to cart")
      }

      const data = await response.json()
      console.log(data)
      toast({
        title: "Success!",
        description: "Item has been added to your cart.",
      })
    } catch (error) {
      console.error("Error adding product to cart:", error)
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="h-[500px] w-full md:w-1/2 rounded-xl" />
            <div className="w-full md:w-1/2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!product) {
    return (
      <div>
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center">
          <p className="text-2xl font-semibold">Product not found</p>
          <Button
            variant="link"
            className="mt-4"
            onClick={() => router.push("/products")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => router.push("/products")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
        </Button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              priority
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="font-serif font-bold text-3xl text-primary">
              {product.name}
            </h1>
            <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
            <div className="flex items-center space-x-2">
              <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
              <span className="text-sm text-gray-500">
                {product.stock} items left
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Input
                type="number"
                min={1}
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                className="w-20"
              />
              <Button onClick={handleAddToCart} disabled={product.stock === 0}>
                Add to Cart
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-500" />
                <span>Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-blue-500" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
            <Tabs defaultValue="description" className="mt-8">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value="features" className="mt-4">
                <ul className="list-disc list-inside space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}