import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface SupportModalProps {
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-red-50">
          Emergency Support
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hỗ trợ kỹ thuật</AlertDialogTitle>
          <AlertDialogDescription>Liên hệ đội ngũ hỗ trợ kỹ thuật của chúng tôi để được giúp đỡ ngay lập tức.</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mb-3">
          <p className="mb-2">Email: learnup@gmail.com</p>
          <p className="mb-2">Điện thoại: +1 (555) 123-4567</p>
          <p>
            {' '}
            Fanpage:{' '}
            <a href="https://www.facebook.com/learnup297" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              LearnUp
            </a>
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Đóng</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Xác nhận</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
