"use client";

import React, { Fragment, useEffect, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { MdDelete } from "react-icons/md";
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}

const ShoppingBag = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const discount = 4.0;

  const token = Cookies.get("token"); // Adjust as necessary

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (!token) {
          console.error("No token found");
          setLoading(false);
          return;
        }

        // Decode the token
        const decoded: any = jwtDecode(token);
        const userId = decoded.id; // Adjust this based on your token structure

        // Fetch cart items for the user
        const response = await fetch(`/api/cart?userId=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data: CartItem[] = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  // const updateQuantity = (id: number, newQuantity: number) => {
  //   setItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
  //     )
  //   );
  // };

  const updateCartQuantity = async (id: number, newQuantity: number) => {
    try {
      const response = await fetch(`/api/cart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, quantity: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart item");
      }

      const updatedItem = await response.json();

      // Update state dengan item yang sudah di-update
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === updatedItem.id
            ? { ...item, quantity: updatedItem.quantity }
            : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal - discount;

  if (loading) {
    return (
      <Fragment>
        <Navbar />
        <div className="py-4 px-10 bg-gray-100 min-h-screen text-center">
          <h1 className="text-2xl font-bold mb-2">Loading...</h1>
        </div>
        <Footer />
      </Fragment>
    );
  }

  if (items.length === 0) {
    return (
      <Fragment>
        <Navbar />
        <div className="py-4 px-10 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-2">Shopping Bag</h1>
          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">
              Looks like you havent added any items to your cart yet.
            </p>
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }

  const checkoutItems = items.map((item) => ({
    product: {
      name: item.product.name,
      image: item.product.image,
      price: item.product.price,
    },
    quantity: item.quantity,
  }));

  const handleCheckout = async () => {
    try {
      console.log("Items before checkout:", checkoutItems);

      const response = await fetch("/api/checkoutsession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: checkoutItems }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to initiate checkout session:", error);
        return;
      }

      const data = await response.json();
      window.location.href = data.url;


      if (!token) {
        console.error("No token found");
        return;
      }

      // Decode user ID from token
      const decoded: { id: number } = jwtDecode(token);
      const userId = decoded.id;

      // Delete all cart items after checkout
      await fetch("/api/cart/deleteall", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        const error = await response.text();
        console.error("Failed to delete cart item:", error);
        return;
      }

      // Refresh halaman
      window.location.reload();
    } catch (error) {
      console.error("Error during deletion:", error);
    }
  };

  return (
    <Fragment>
      <Navbar />
      <div className="py-10 px-5 py:px-28 bg-gray-100">
        <h1 className="text-2xl font-bold mb-2">Shopping Bag</h1>
        <p className="mb-4">
          <span className="text-slate-900 font-bold">{items.length} items</span>{" "}
          in your bag.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 bg-white p-4 rounded-3xl shadow">
            <table className="md:table-fixed w-full">
              <thead>
                <tr>
                  <th className="text-center pb-2">Product</th>
                  <th className="text-center pb-2">Price</th>
                  <th className="text-center pb-2">Quantity</th>
                  <th className="text-center pb-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4">
                      <div className="flex justify-center items-center">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={80}
                          height={80}
                          priority
                          className="object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold">{item.product.name}</h3>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="text-center">
                      <div className="flex items-center justify-center">
                        <Button
                          onClick={() => {
                            const newQuantity = item.quantity - 1;
                            if (newQuantity >= 1) {
                              updateCartQuantity(item.id, newQuantity);
                            }
                          }}
                          className="border px-2  rounded-lg">
                          <TiMinus/>
                        </Button>
                        <span className="mx-2">{item.quantity}</span>
                        <Button
                          onClick={() =>
                            updateCartQuantity(item.id, item.quantity + 1)
                          }
                          className="border px-2 rounded-lg">
                          <FaPlus/>
                        </Button>
                      </div>
                    </td>

                    <td className="text-center font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td>
                      <Button onClick={() => handleDelete(item.id)}>
                        <MdDelete />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:w-1/3">
            <div className="sticky top-4">
              <div className="bg-yellow-100 p-4 rounded-2xl shadow-xl">
                <h2 className="font-bold mb-2">Cart Total</h2>
                <div className="flex justify-between mb-2">
                  <span>Cart Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Discount</span>
                  <span>${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <span>Cart Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black font-bold p-2 rounded-3xl mt-4 hover:bg-yellow-50 transition duration-200">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default ShoppingBag;
