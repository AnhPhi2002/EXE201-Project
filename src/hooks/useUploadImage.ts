import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    cloudinary: any;
  }
}

export function useUploadImage() {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const cloudinaryRef = useRef<any>(null);
  const windowRef = useRef<Window | null>(null);
  const cloudName = 'dlfzkbtie';
  const presetKey = import.meta.env.VITE_PRESET_KEY;
  function handleFileInputClick() {
    windowRef?.current?.open();
  }
  useEffect(() => {
    cloudinaryRef.current = window?.cloudinary;
    windowRef.current = cloudinaryRef.current?.createUploadWidget(
      {
        cloudName,
        uploadPreset: presetKey
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          setAvatarUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  return { handleFileInputClick, avatarUrl, setAvatarUrl };
}
