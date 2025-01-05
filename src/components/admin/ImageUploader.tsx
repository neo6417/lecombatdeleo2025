import React, { useCallback, useState } from 'react';
import { Upload, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useImageUpload } from '../../hooks/useImageUpload';
import { Button } from '../ui/Button';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  currentImage?: string;
  previewSize?: 'sm' | 'md' | 'lg';
}

const previewSizes = {
  sm: 'h-32',
  md: 'h-48',
  lg: 'h-64'
};

export function ImageUploader({ onUploadComplete, currentImage, previewSize = 'md' }: ImageUploaderProps) {
  const { uploadImage, uploading, error } = useImageUpload();
  const [preview, setPreview] = useState(currentImage);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>(previewSize);

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (validateFile(file)) {
      const url = await uploadImage(file);
      if (url) {
        setPreview(url);
        onUploadComplete(url);
      }
    }
  }, [uploadImage, onUploadComplete]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      const url = await uploadImage(file);
      if (url) {
        setPreview(url);
        onUploadComplete(url);
      }
    }
  }, [uploadImage, onUploadComplete]);

  const validateFile = (file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert('Format de fichier non supporté. Utilisez JPG, PNG ou WebP.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('Fichier trop volumineux. Maximum 5MB.');
      return false;
    }
    return true;
  };

  const toggleSize = () => {
    const sizes: ('sm' | 'md' | 'lg')[] = ['sm', 'md', 'lg'];
    const currentIndex = sizes.indexOf(size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    setSize(sizes[nextIndex]);
  };

  return (
    <div className="w-full space-y-4">
      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Aperçu"
            className={`w-full ${previewSizes[size]} object-cover rounded-lg`}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={toggleSize}
              title="Changer la taille de prévisualisation"
            >
              {size === 'sm' ? <ZoomIn className="w-4 h-4" /> : <ZoomOut className="w-4 h-4" />}
            </Button>
            <label className="cursor-pointer">
              <Button variant="secondary" size="sm">
                <Upload className="w-4 h-4" />
              </Button>
              <input
                type="file"
                className="hidden"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className={`border-2 border-dashed rounded-lg p-8 text-center ${
            uploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          <input
            type="file"
            accept={ACCEPTED_TYPES.join(',')}
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">
              {uploading ? 'Envoi en cours...' : 'Glissez une image ou cliquez pour sélectionner'}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              JPG, PNG, WebP • 5MB max
            </span>
          </label>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-red-600 text-sm flex items-center">
          <X className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}