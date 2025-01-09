import { useState } from 'react';

const useModal = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [editWord, setEditWord] = useState(null);

  const openEditModal = (word) => {
    setEditWord(word);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditWord(null);
  };

  const openAddWordModal = () => {
    setIsAddWordModalOpen(true);
  };

  const closeAddWordModal = () => {
    setIsAddWordModalOpen(false);
  };

  return {
    isEditModalOpen,
    isAddWordModalOpen,
    editWord,
    setEditWord,
    openEditModal,
    closeEditModal,
    openAddWordModal,
    closeAddWordModal,
  };
};

export default useModal;