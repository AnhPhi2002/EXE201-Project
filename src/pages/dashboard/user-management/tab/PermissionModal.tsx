import React, { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter, ModalCloseButton } from '@/components/ui/Modal';
import { Button } from '@/components/ui/button';

interface PermissionModalProps {
  userId: string;
  initialPermissions: string[];
  onClose: () => void;
  onSave: (updatedPermissions: string[]) => void;
}

const permissionsOptions = [
  { label: 'Manage Departments', value: 'manage_departments' },
  { label: 'Manage Resources', value: 'manage_resources' },
  { label: 'Manage Semesters', value: 'manage_semesters' },
  { label: 'Manage Subject', value: 'manage_subjects' },
  { label: 'Manage Meetings', value: 'manage_meetings' },
  { label: 'Manage Posts', value: 'manage_posts' },
];

const PermissionModal: React.FC<PermissionModalProps> = ({ initialPermissions, onClose, onSave }) => {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPermissions(initialPermissions);
  }, [initialPermissions]);

  const handlePermissionChange = (permission: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission]
    );
  };

  const handleSavePermissions = () => {
    onSave(selectedPermissions);
    onClose();
  };

  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Set Permissions</ModalTitle>
          <ModalCloseButton onClick={onClose} />
        </ModalHeader>
        <div className="p-4">
          {permissionsOptions.map((permission) => (
            <div key={permission.value}>
              <input
                type="checkbox"
                checked={selectedPermissions.includes(permission.value)}
                onChange={() => handlePermissionChange(permission.value)}
              />
              {permission.label}
            </div>
          ))}
        </div>
        <ModalFooter>
          <Button onClick={handleSavePermissions}>Save</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PermissionModal;
