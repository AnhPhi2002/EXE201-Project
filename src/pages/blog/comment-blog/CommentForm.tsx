// src/components/CommentForm.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FiSend, FiImage } from 'react-icons/fi'; // Thêm FiImage
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { toast } from 'react-toastify';
import EmojiPickerButton from './EmojiPickerButton';
import ImagePreview from './ImagePreview';

interface CommentFormProps {
  onSubmit: (content: string, images: string[]) => void;
  initialContent?: string;
  initialImages?: string[];
  onImagesChange?: (images: string[]) => void;
}

const CLOUD_NAME = 'dbezyvjzm';
const UPLOAD_PRESET = 'learnup';

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  initialContent = '',
  initialImages = [],
  onImagesChange,
}) => {
  const [content, setContent] = useState<string>(initialContent);
  const [images, setImages] = useState<string[]>(initialImages);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const maxCharacters = 500;

  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Thêm ref cho input file

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Image Upload Error: ', error);
      toast.error('Failed to upload image');
      throw error;
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile();
        if (file) {
          try {
            const imageUrl = await uploadImageToCloudinary(file);
            setImages((prev) => [...prev, imageUrl]);
            toast.success('Image uploaded successfully!');
          } catch (error) {
            console.error('Error uploading image: ', error);
            toast.error('Failed to upload image.');
          }
        }
      }
    }
  };

  const handleImageBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      for (const file of fileArray) {
        try {
          const imageUrl = await uploadImageToCloudinary(file);
          setImages((prev) => [...prev, imageUrl]);
          toast.success('Image uploaded successfully!');
        } catch (error) {
          console.error('Error uploading image: ', error);
          toast.error('Failed to upload image.');
        }
      }

      e.target.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(content, images);
    setContent('');
    setImages([]);
  };

  const handleEmojiSelect = (emoji: any) => {
    const emojiNative = emoji.native || '';
    setContent((prev) => prev + emojiNative);
    setShowEmojiPicker(false);
  };

  const handleImageChange = (newImages: string[]) => {
    setImages(newImages);
    if (onImagesChange) {
      onImagesChange(newImages);
    }
  };

  // Ẩn Picker khi nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onPaste={handlePaste}
          placeholder="Write a comment..."
          className="w-full p-4 pr-32 border border-gray-300 rounded-[2rem] focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
          rows={4}
          maxLength={maxCharacters}
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
          <EmojiPickerButton
            showEmojiPicker={showEmojiPicker}
            setShowEmojiPicker={setShowEmojiPicker}
            handleEmojiSelect={handleEmojiSelect}
            buttonRef={buttonRef}
          />
          <button
            type="button"
            onClick={handleImageBrowse}
            className="text-gray-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition duration-200 p-2"
            aria-label="Add Image"
          >
            <FiImage className="w-5 h-5" />
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        {showEmojiPicker && (
          <div className="absolute z-10 right-4 bottom-full mb-2" ref={pickerRef}>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="light" />
          </div>
        )}
      </div>
      <ImagePreview images={images} onImagesChange={handleImageChange} />
      <div className="flex justify-between items-center">
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-black rounded-[1.5rem] hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
        >
          <FiSend className="w-5 h-5 text-white" />
          <span className='text-white'>Post Comment</span>
        </button>
        <span className="text-sm text-gray-500">
          {content.length}/{maxCharacters}
        </span>
      </div>
    </form>
  );
};

export default CommentForm;
