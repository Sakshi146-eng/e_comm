'use client';

import { useState, useEffect } from 'react';
import { Heart, HeartOff, Check, X } from 'lucide-react';

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
    <div className="space-y-3">
      <button
        onClick={handleToggleWishlist}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] ${
          isAdded 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600' 
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
        }`}
      >
        {isAdded ? (
          <>
            <HeartOff size={22} className="fill-current" />
            Remove from Wishlist
          </>
        ) : (
          <>
            <Heart size={22} />
            Add to Wishlist
          </>
        )}
      </button>

      {/* Optional: Show a small confirmation message */}
      {message && (
        <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all animate-in fade-in slide-in-from-top-2 duration-300 ${
          isAdded 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {isAdded ? (
            <Check size={18} className="flex-shrink-0" />
          ) : (
            <X size={18} className="flex-shrink-0" />
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}