// src/components/ImagePreview.tsx
import React from 'react';

interface ImagePreviewProps {
  images: string[];
  onImagesChange?: (images: string[]) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onImagesChange }) => {
  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    if (onImagesChange) {
      onImagesChange(updatedImages);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img src={image} alt={`Uploaded image ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
          <button
            onClick={() => handleRemoveImage(index)}
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
