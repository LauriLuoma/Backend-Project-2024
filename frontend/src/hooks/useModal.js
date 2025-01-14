import { useState } from 'react';

/**
 * Custom hook to handle the state of the modals in the Admin component.
 * @function useModal
 * @returns {Object} - The state and functions to open and close the modals.
 */
const useModal = () => {
  // State to manage the visibility of the edit modal.
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // State to manage the visibility of the add word modal.
  const [isAddWordModalOpen, setIsAddWordModalOpen] = useState(false);
  // State to store the word being edited.
  const [editWord, setEditWord] = useState(null);
  // State to manage the visibility of the error modal.
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  // State to manage the visibility of the delete modal.
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  /**
   * Function to open the edit modal and set the word to be edited.
   * @param {Object} word - The word object to be edited.
   */
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

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  }

  return {
    isEditModalOpen,
    isAddWordModalOpen,
    isErrorModalOpen,
    isDeleteModalOpen,
    editWord,
    setEditWord,
    openEditModal,
    closeEditModal,
    openAddWordModal,
    closeAddWordModal,
    openErrorModal,
    closeErrorModal,
    openDeleteModal,
    closeDeleteModal,
  };
};

export default useModal;