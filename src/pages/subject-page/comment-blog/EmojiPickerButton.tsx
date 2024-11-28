// src/components/EmojiPickerButton.tsx
import React, { forwardRef } from 'react';
import { FiSmile } from 'react-icons/fi';

interface EmojiPickerButtonProps {
  showEmojiPicker: boolean;
  setShowEmojiPicker: (show: boolean) => void;
  handleEmojiSelect: (emoji: any) => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
}

const EmojiPickerButton = forwardRef<HTMLButtonElement, EmojiPickerButtonProps>(
  ({ showEmojiPicker, setShowEmojiPicker, buttonRef }, ref) => {  // Giải cấu trúc cả props và ref
    return (
      <button
        type="button"
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="text-gray-600 hover:text-yellow-500 rounded-full hover:bg-yellow-50 transition duration-200 p-2"
        ref={buttonRef || ref}  // Nếu buttonRef không được truyền, dùng ref
      >
        <FiSmile className="w-5 h-5" />
      </button>
    );
  }
);

export default EmojiPickerButton;
