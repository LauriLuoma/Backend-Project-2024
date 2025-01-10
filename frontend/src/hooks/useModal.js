import { useState } from 'react';

const useModal = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  const [editWord, setEditWord] = useState(null);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

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

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  }

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  }

  return {
    isEditModalOpen,
    isAddWordModalOpen,
    isErrorModalOpen,
    editWord,
    setEditWord,
    openEditModal,
    closeEditModal,
    openAddWordModal,
    closeAddWordModal,
    openErrorModal,
    closeErrorModal,
  };
};

export default useModal;