import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, ArrowLeft } from 'lucide-react';
import { usePosters } from '../context/PosterContext';
import Breadcrumbs from './Breadcrumbs';

export default function PosterPage() {
  const { id } = useParams();
  const { posters, handleLike } = usePosters();
  const [showCopied, setShowCopied] = useState(false);
  
  const poster = posters.find(p => p.id === Number(id));
  
  if (!poster) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Poster not found</h2>
          <Link to="/" className="text-indigo-600 hover:text-indigo-500">
            Return to gallery
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <Breadcrumbs />
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Gallery
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="relative aspect-[1/1.414]">
              <img
                src={poster.imageUrl}
                alt={poster.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {poster.title}
              </h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {poster.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold text-indigo-600">
                  ${poster.price}
                </span>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(poster.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      poster.isLiked
                        ? 'bg-pink-100 text-pink-600'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Heart
                      size={20}
                      className={poster.isLiked ? 'fill-current' : ''}
                    />
                    <span>{poster.likes}</span>
                  </button>

                  <div className="relative">
                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                      <Share2 size={20} />
                      Share
                    </button>
                    {showCopied && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-md">
                        Link copied!
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-600">
                  This stunning art piece captures the essence of modern design with its bold composition and striking visual elements. Perfect for adding a contemporary touch to any space, this poster combines aesthetic appeal with artistic excellence.
                </p>
                <ul className="mt-4 space-y-2 text-gray-600">
                  <li>• Premium quality print</li>
                  <li>• Museum-grade paper</li>
                  <li>• Vibrant, fade-resistant colors</li>
                  <li>• Available in multiple sizes</li>
                </ul>
              </div>

              <a
                href={poster.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Purchase Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}