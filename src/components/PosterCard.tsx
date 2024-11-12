import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

interface PosterCardProps {
  imageUrl: string;
  title: string;
  likes: number;
  price: number;
  onLike: (e: React.MouseEvent) => void;
  onBuy: (e: React.MouseEvent) => void;
  isLiked: boolean;
  tags: string[];
}

export default function PosterCard({
  imageUrl,
  title,
  likes,
  price,
  onLike,
  onBuy,
  isLiked,
  tags
}: PosterCardProps) {
  return (
    <div className="relative group overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="aspect-[1/1.414] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-lg font-semibold text-indigo-600 mb-4">${price}</p>
        
        <div className="flex justify-between items-center">
          <button
            onClick={onLike}
            className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
              isLiked
                ? 'bg-pink-100 text-pink-600'
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Heart
              size={20}
              className={isLiked ? 'fill-current' : ''}
            />
            <span>{likes}</span>
          </button>
          
          <button
            onClick={onBuy}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCart size={20} />
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}