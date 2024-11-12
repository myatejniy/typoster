import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Poster, PosterContextType } from '../types';

const PosterContext = createContext<PosterContextType | undefined>(undefined);

const initialPosters: Poster[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
    title: 'Abstract Waves',
    likes: 45,
    isLiked: false,
    price: 29.99,
    buyLink: 'https://example.com/buy/abstract-waves',
    tags: ['Abstract', 'Modern', 'Blue']
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    title: 'Geometric Dreams',
    likes: 38,
    isLiked: false,
    price: 34.99,
    buyLink: 'https://example.com/buy/geometric-dreams',
    tags: ['Geometric', 'Minimal', 'Black & White']
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1',
    title: 'Color Explosion',
    likes: 62,
    isLiked: false,
    price: 24.99,
    buyLink: 'https://example.com/buy/color-explosion',
    tags: ['Colorful', 'Abstract', 'Modern']
  },
];

export function PosterProvider({ children }: { children: ReactNode }) {
  const [posters, setPosters] = useState<Poster[]>(initialPosters);

  const addPoster = (poster: Omit<Poster, 'id' | 'likes' | 'isLiked'>) => {
    const newPoster: Poster = {
      ...poster,
      id: Math.max(...posters.map(p => p.id)) + 1,
      likes: 0,
      isLiked: false,
    };
    setPosters([...posters, newPoster]);
  };

  const deletePoster = (id: number) => {
    setPosters(posters.filter(poster => poster.id !== id));
  };

  const handleLike = (id: number) => {
    setPosters(posters.map(poster => {
      if (poster.id === id) {
        return {
          ...poster,
          likes: poster.isLiked ? poster.likes - 1 : poster.likes + 1,
          isLiked: !poster.isLiked,
        };
      }
      return poster;
    }));
  };

  const updatePosterTags = (id: number, tags: string[]) => {
    setPosters(posters.map(poster => {
      if (poster.id === id) {
        return {
          ...poster,
          tags,
        };
      }
      return poster;
    }));
  };

  return (
    <PosterContext.Provider value={{ posters, addPoster, deletePoster, handleLike, updatePosterTags }}>
      {children}
    </PosterContext.Provider>
  );
}

export function usePosters() {
  const context = useContext(PosterContext);
  if (context === undefined) {
    throw new Error('usePosters must be used within a PosterProvider');
  }
  return context;
}