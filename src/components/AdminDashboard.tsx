import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosters } from '../context/PosterContext';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2, Settings, Tag } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import ChangePasswordForm from './ChangePasswordForm';
import TagEditor from './TagEditor';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { posters, addPoster, deletePoster, updatePosterTags } = usePosters();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [editingTags, setEditingTags] = useState<number | null>(null);
  const [newPoster, setNewPoster] = useState({
    title: '',
    price: '',
    buyLink: '',
    image: null as File | null,
    previewUrl: '',
    tags: [] as string[],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPoster({
        ...newPoster,
        image: file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPoster.image) return;

    addPoster({
      imageUrl: newPoster.previewUrl,
      title: newPoster.title,
      price: parseFloat(newPoster.price),
      buyLink: newPoster.buyLink,
      tags: newPoster.tags,
    });
    
    setNewPoster({
      title: '',
      price: '',
      buyLink: '',
      image: null,
      previewUrl: '',
      tags: [],
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this poster?')) {
      deletePoster(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  <Settings size={20} className="mr-2" />
                  Settings
                </button>
                <span className="text-gray-600">Welcome, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
            <Breadcrumbs />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Posters */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Current Posters</h2>
              <div className="space-y-4">
                {posters.map((poster) => (
                  <div
                    key={poster.id}
                    className="flex flex-col space-y-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={poster.imageUrl}
                          alt={poster.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{poster.title}</h3>
                          <p className="text-sm text-gray-500">${poster.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingTags(editingTags === poster.id ? null : poster.id)}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Tag size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(poster.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                    
                    {editingTags === poster.id && (
                      <div className="mt-4">
                        <TagEditor
                          tags={poster.tags}
                          onChange={(newTags) => updatePosterTags(poster.id, newTags)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {showSettings ? (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                <ChangePasswordForm />
              </div>
            ) : (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-6">Add New Poster</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newPoster.title}
                      onChange={(e) => setNewPoster({ ...newPoster, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price ($)
                    </label>
                    <input
                      type="number"
                      id="price"
                      required
                      min="0"
                      step="0.01"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newPoster.price}
                      onChange={(e) => setNewPoster({ ...newPoster, price: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="buyLink" className="block text-sm font-medium text-gray-700">
                      Buy Link
                    </label>
                    <input
                      type="url"
                      id="buyLink"
                      required
                      placeholder="https://example.com/buy-poster"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      value={newPoster.buyLink}
                      onChange={(e) => setNewPoster({ ...newPoster, buyLink: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tags
                    </label>
                    <TagEditor
                      tags={newPoster.tags}
                      onChange={(tags) => setNewPoster({ ...newPoster, tags })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Poster Image
                    </label>
                    <div 
                      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <div className="space-y-1 text-center">
                        {newPoster.previewUrl ? (
                          <img
                            src={newPoster.previewUrl}
                            alt="Preview"
                            className="mx-auto h-32 w-auto object-contain"
                          />
                        ) : (
                          <Upload
                            className="mx-auto h-12 w-12 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <input
                            ref={fileInputRef}
                            type="file"
                            className="hidden"
                            accept="image/jpeg,image/png"
                            onChange={handleImageChange}
                          />
                          <p className="pl-1">Upload a file or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add Poster
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}