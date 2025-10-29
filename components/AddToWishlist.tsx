'use client';

import { useState, useEffect } from 'react';

// Key for localStorage
const WISHLIST_STORAGE_KEY = 'nextjs_wishlist';

export default function AddToWishlist({ 
  productId, 
  productName 
}: { 
  productId: string; 
  productName: string; 
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState('');

  // 1. Check localStorage on mount
  useEffect(() => {
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        const wishlistArray: string[] = JSON.parse(storedWishlist);
        if (wishlistArray.includes(productId)) {
          setIsAdded(true);
        }
      }
    } catch (e) {
      console.error('Failed to read wishlist from localStorage:', e);
    }
  }, [productId]);

  // 2. Handle adding/removing from wishlist
  const handleToggleWishlist = () => {
    let wishlistArray: string[] = [];
    try {
      const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (storedWishlist) {
        wishlistArray = JSON.parse(storedWishlist);
      }
    } catch (e) {
      console.error('Corrupt localStorage data. Resetting wishlist.', e);
      // Fallback: If data is corrupt, start with an empty array
      wishlistArray = []; 
    }

    if (isAdded) {
      // Remove item
      wishlistArray = wishlistArray.filter(id => id !== productId);
      setMessage(`${productName} removed from wishlist.`);
      setIsAdded(false);
    } else {
      // Add item
      wishlistArray.push(productId);
      setMessage(`${productName} added to wishlist!`);
      setIsAdded(true);
    }

    // Save the updated array back to localStorage
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistArray));

    // Clear the message after a short period
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <button
        onClick={handleToggleWishlist}
        className={`w-full px-4 py-2 rounded transition-colors font-semibold ${
          isAdded 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {isAdded ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>

      {/* Optional: Show a small confirmation message */}
      {message && (
        <p className={`text-center mt-2 text-sm ${isAdded ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
