"use client";

import React, { Fragment, useState } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";

const ShoppingBag = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Masker",
      price: 20.5,
      quantity: 2,
      color: "Blue",
      size: "42",
      image: "https://corkcicle.com/cdn/shop/files/2020CSB-04_900x.png?v=1725800633",
    },
    {
      id: 2,
      name: "Masker",
      price: 30.5,
      quantity: 1,
      color: "Red",
      size: "42",
      image: "https://corkcicle.com/cdn/shop/files/2020CSB-04_900x.png?v=1725800633",
    } /* 
    {
      id: 3,
      name: "Masker",
      price: 30.5,
      quantity: 1,
      color: "Red",
      size: "42",
      image: "../images/products/Product_img.png",
    },
    {
      id: 4,
      name: "Masker",
      price: 30.5,
      quantity: 1,
      color: "Red",
      size: "42",
      image: "../images/products/Product_img.png",
    },
    {
      id: 5,
      name: "Masker",
      price: 30.5,
      quantity: 1,
      color: "Red",
      size: "42",
      image: "../images/products/Product_img.png",
    },
    {
      id: 6,
      name: "Masker",
      price: 30.5,
      quantity: 1,
      color: "Red",
      size: "42",
      image: "../images/products/Product_img.png",
    },
    {
      id: 7,
      name: "Masker",
      price: 30.5,
      quantity: 1,
      color: "Red",
      size: "42",
      image: "../images/products/Product_img.png",
    }, */,
  ]);

  const discount = 4.0;

  const updateQuantity = (id: number, newQuantity: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
    {
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      );
    }
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal - discount;

  if (items.length === 0) {
    return (
      <Fragment>
        <Navbar />
        <div className="py-4 px-10 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-2">Shopping Bag</h1>
          <div className="bg-white p-8 rounded-3xl shadow text-center">
            {/*          <img
              src="/empty-cart.svg"
              alt="Empty Cart"
              className="mx-auto mb-4 w-48"
            /> */}
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">
              Looks like you havent added any items to your cart yet.
            </p>
            {/*        <Link
              to="/products"
              className="bg-blue-500 text-red-600 px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300"
            >
              Start Shopping
            </Link> */}
          </div>
        </div>
        <Footer />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Navbar />
      <div className="py-10 px-28 bg-gray-100">
        <h1 className="text-2xl font-bold mb-2">Shopping Bag</h1>
        <p className="mb-4">
          <span className="text-slate-900 font-bold">{items.length} items</span>{" "}
          in your bag.
        </p>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3 bg-white p-4 rounded-3xl shadow">
            <table className="md:table-fixed w-full">
              <thead>
                <tr className="">
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
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold">{item.name}</h3>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">${item.price.toFixed(2)}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-center">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="border px-2 rounded-lg"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="border px-2 rounded-lg"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="text-center font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
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
                <button className="w-full bg-white text-black font-bold p-2 rounded-3xl mt-4 hover:bg-yellow-50 transition duration-200">
                  Apply
                </button>
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