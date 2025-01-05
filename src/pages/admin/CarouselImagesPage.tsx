import React, { useState } from 'react';
import { Trash2, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import { useCarouselImages, type CarouselImage } from '../../hooks/useCarouselImages';
import { useImageUpload } from '../../hooks/useImageUpload';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export function CarouselImagesPage() {
  const { images, loading, addImage, updateImage, deleteImage } = useCarouselImages();
  const { uploadImage, uploading } = useImageUpload();
  const [newImage, setNewImage] = useState({
    title: '',
    alt: '',
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      if (url) {
        await addImage({
          title: newImage.title || file.name,
          alt: newImage.alt || file.name,
          url,
          order: images.length
        });
        setNewImage({ title: '', alt: '' });
      }
    } catch (error) {
      alert('Erreur lors de l\'upload de l\'image');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?')) {
      try {
        await deleteImage(id);
      } catch (error) {
        alert('Erreur lors de la suppression de l\'image');
      }
    }
  };

  const handleReorder = async (image: CarouselImage, direction: 'up' | 'down') => {
    const currentIndex = images.findIndex(img => img.id === image.id);
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    if (newIndex < 0 || newIndex >= images.length) return;
    
    try {
      await updateImage(image.id, { order: newIndex });
      await updateImage(images[newIndex].id, { order: currentIndex });
    } catch (error) {
      alert('Erreur lors du réordonnancement');
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Gestion du carrousel d'images</h1>

      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Ajouter une nouvelle image</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Titre
            </label>
            <input
              type="text"
              value={newImage.title}
              onChange={(e) => setNewImage(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texte alternatif
            </label>
            <input
              type="text"
              value={newImage.alt}
              onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {images.map((image, index) => (
          <Card key={image.id} className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={image.url}
                alt={image.alt}
                className="w-32 h-20 object-cover rounded"
              />
              <div className="flex-grow">
                <h3 className="font-medium">{image.title}</h3>
                <p className="text-sm text-gray-500">{image.alt}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleReorder(image, 'up')}
                  disabled={index === 0}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleReorder(image, 'down')}
                  disabled={index === images.length - 1}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDelete(image.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}