'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGlobalContext } from '@/lib/GlobalProvider';
import { useToast } from '@/components/ToastProvider';

export default function CartClient() {
  const {
    cart,
    removeFromCart,
    updateCartItemQuantity,
    getCartTotal,
    getCartItemCount,
    clearCart,
    currentUser
  } = useGlobalContext();
  const { showToast } = useToast();

  const handleQuantityChange = (bookId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(bookId);
      showToast('Item removed from cart', 'info');
    } else {
      updateCartItemQuantity(bookId, newQuantity);
    }
  };

  const handleRemoveItem = (bookId: number, title: string) => {
    removeFromCart(bookId);
    showToast(`"${title}" removed from cart`, 'info');
  };

  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared', 'info');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some books to get started!</p>
            <Link
              href="/"
              className="btn-primary text-white px-8 py-3 rounded-lg text-lg font-semibold inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {getCartItemCount()} {getCartItemCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <button
                    onClick={handleClearCart}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.book.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="relative h-16 w-12 flex-shrink-0">
                        <Image
                          src={item.book.thumbnailUrl || "/images/placeholder-book.jpg"}
                          alt={item.book.title}
                          fill
                          className="object-cover rounded"
                          sizes="48px"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {item.book.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          by {item.book.authors.join(', ')}
                        </p>
                        <p className="text-sm font-medium text-green-600">
                          ${item.book.price}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>

                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          ${(item.book.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(item.book.id, item.book.title)}
                          className="text-red-600 hover:text-red-800 text-sm mt-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getCartItemCount()} items)</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {currentUser ? (
                <button className="w-full btn-primary text-white py-3 rounded-lg text-lg font-semibold mb-3">
                  Proceed to Checkout
                </button>
              ) : (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-2">Please sign in to checkout</p>
                  <Link
                    href="/"
                    className="w-full btn-primary text-white py-3 rounded-lg text-lg font-semibold inline-block text-center"
                  >
                    Sign In to Checkout
                  </Link>
                </div>
              )}

              <Link
                href="/"
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors inline-block text-center"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
