import { useState, useEffect } from 'react';
import { addWord, deleteWord, getAllWords, updateWord } from '../api';
import { filterWordsByTag, getUniqueTags } from '../utils/wordUtils';
import useModal from '../hooks/useModal';

/**
 * Admin component for managing words in the Learn Words app.
 * Allows adding, editing, deleting, and filtering words.
 */
function Admin() {
  // State to store the list of words
  const [words, setWords] = useState([]);
  // State to store the new word being added
  const [newWord, setNewWord] = useState({ english: '', finnish: '', swedish: '', tags: '' });
  // State to store the selected tag for filtering words
  const [selectedTag, setSelectedTag] = useState('');
  // State to store error messages
  const [errorMessage, setErrorMessage] = useState('');
  // State to store the ID of the word to be deleted
  const [deleteWordId, setDeleteWordId] = useState(null);

  // Destructure the state and functions from the useModal custom hook
  const {
    isEditModalOpen, isAddWordModalOpen, isErrorModalOpen, isDeleteModalOpen,
    editWord, setEditWord,
    openEditModal, closeEditModal,
    openAddWordModal, closeAddWordModal,
    openErrorModal, closeErrorModal,
    openDeleteModal, closeDeleteModal,
  } = useModal();

  // Fetch words from the database when the component mounts
  useEffect(() => {
    fetchWords();
  }, []);

  /**
   * Function to fetch words from the database and update the state.
   * @async
   * @function fetchWords
   * @param {JSON} words - The list of words fetched from the database.
   * @throws Will throw an error if there is an issue fetching the words.
   */
  const fetchWords = async () => {
    try {
      // Fetch all words from the database
      const words = await getAllWords();
      // Update the state with the fetched words
      setWords(words);
      // Reset the error message
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  /**
 * Function to handle changes in the add word form inputs.
 * Updates the state with the new values entered by the user.
 * @function handleAddWordChange
 * @param {Object} e - The event object from the input change event.
 */
  const handleAddWordChange = (e) => {
    const { name, value } = e.target;
    setNewWord({ ...newWord, [name]: value });
  };

  /**
 * Function to handle the submission of the add word form.
 * Adds a new word to the database and updates the state.
 * @async
 * @function handleAddWordSubmit
 * @param {Object} e - The event object from the form submission.
 */
  const handleAddWordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add the new word to the database
      await addWord(newWord);
      // Close the add word modal
      closeAddWordModal();
      console.log('Word added successfully');
      // Reset the new word state
      setNewWord({ english: '', finnish: '', swedish: '', tags: '' });
      // Fetch the updated list of words
      fetchWords();
      // Clear any error messages
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding word:', error);
      // Set the error message
      setErrorMessage('Error adding word. Please try again.');
      // Close the add word modal
      closeAddWordModal();
      // Open the error modal
      openErrorModal();
    }
  };

  /**
   * Function to handle the deletion of a word.
   * Sets the ID of the word to be deleted and opens the delete confirmation modal.
   * @function handleDeleteWord
   * @param {number} id - The ID of the word to be deleted.
   */
  const handleDeleteWord = (id) => {
    setDeleteWordId(id);
    openDeleteModal();
  };

  /**
 * Function to confirm the deletion of a word.
 * Deletes the word from the database and updates the state.
 * @async
 * @function confirmDeleteWord
 */
  const confirmDeleteWord = async () => {
    try {
      // Delete the word from the database
      await deleteWord(deleteWordId);
      // Close the delete confirmation modal
      closeDeleteModal();
      console.log('Word deleted successfully');
      // Fetch the updated list of words
      fetchWords();
      // Clear any error messages
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting word:', error);
      // Set the error message
      setErrorMessage('Error deleting word. Please try again.');
      // Close the delete confirmation modal
      closeDeleteModal();
      // Open the error modal
      openErrorModal();
    }
  };

  /**
 * Function to handle changes in the edit word form inputs.
 * Updates the state with the new values entered by the user.
 * @function handleEditWordChange
 * @param {Object} e - The event object from the input change event.
 */
  const handleEditWordChange = (e) => {
    const { name, value } = e.target;
    setEditWord({ ...editWord, [name]: value });
  };

  /**
 * Function to handle the submission of the edit word form.
 * Updates the word in the database and updates the state.
 * @async
 * @function handleEditWordSubmit
 * @param {Object} e - The event object from the form submission.
 */
  const handleEditWordSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the word in the database
      await updateWord(editWord.id, editWord);
      console.log('Word updated successfully');
      // Close the edit word modal
      closeEditModal();
      // Fetch the updated list of words
      fetchWords();
      // Clear any error messages
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating word:', error);
      // Set the error message
      setErrorMessage('Error updating word. Please try again.');
      // Close the edit word modal
      closeEditModal();
      // Open the error modal
      openErrorModal();
    }
  };

  /**
 * Function to handle changes in the tag selection.
 * Updates the state with the selected tag value.
 * @function handleTagChange
 * @param {Object} e - The event object from the select change event.
 */
  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  // Filter the words based on the selected tag
  const filteredWords = filterWordsByTag(words, selectedTag);
  // Get the unique tags from the list of words
  const uniqueTags = getUniqueTags(words);

  return (
    <div className='container'>
      <header>
        <h1>Admin view</h1>
        <h3>Here you can add, edit and delete words</h3>
      </header>
      <button onClick={openAddWordModal}>Add New Word</button>
      <section className='filter-tag'>
        {/* Dropdown to select a tag for filtering words */}
        <h2>Filter words by tag/theme</h2>
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="">All</option>
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </section>
      <h2>Words</h2>
      <section className='words'>
        {/* Display the filtered words */}
        {filteredWords.map((word) => (
          <article key={word.id} className='word-box'>
            <p>English: {word.english}</p>
            <p>Finnish: {word.finnish}</p>
            <p>Swedish: {word.swedish}</p>
            <p>Tags: {word.tags}</p>
            <button onClick={() => openEditModal(word)}>Edit</button>
            <button onClick={() => handleDeleteWord(word.id)}>Delete</button>
          </article>
        ))}
      </section>
      {/* Add Word Modal */}
      {isAddWordModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Word</h2>
            <form onSubmit={handleAddWordSubmit}>
              <div className='form-group'>
                <div className='form-row'>
                  <label htmlFor="add-english">English:</label>
                  <input
                    type="text"
                    id="add-english"
                    name="english"
                    placeholder="English"
                    value={newWord.english}
                    onChange={handleAddWordChange}
                    required
                  />
                </div>
                <div className='form-row'>
                  <label htmlFor="add-finnish">Finnish:</label>
                  <input
                    type="text"
                    id="add-finnish"
                    name="finnish"
                    placeholder="Finnish"
                    value={newWord.finnish}
                    onChange={handleAddWordChange}
                    required
                  />
                </div>
                <div className='form-row'>
                  <label htmlFor="add-swedish">Swedish:</label>
                  <input
                    type="text"
                    id="add-swedish"
                    name="swedish"
                    placeholder="Swedish"
                    value={newWord.swedish}
                    onChange={handleAddWordChange}
                    required
                  />
                </div>
                <div className='form-row'>
                  <label htmlFor="add-tags">Tag:</label>
                  <input
                    type="text"
                    id="add-tags"
                    name="tags"
                    placeholder="Tags"
                    value={newWord.tags}
                    onChange={handleAddWordChange}
                  />
                </div>
              </div>
              <button type="submit">Add Word</button>
              <button type="button" onClick={closeAddWordModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {/* Error Modal */}
      {isErrorModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <p className="error-message">{errorMessage}</p>
            <button onClick={closeErrorModal}>Close</button>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Word</h2>
            <form onSubmit={handleEditWordSubmit}>
              <div className='form-group'>
                <div className='form-row'>
                  <label htmlFor="edit-english">English:</label>
                  <input
                    type="text"
                    id="edit-english"
                    name="english"
                    placeholder="English"
                    value={editWord.english}
                    onChange={handleEditWordChange}
                    required
                  />
                </div>
                <div className='form-row'>
                  <label htmlFor="edit-finnish">Finnish:</label>
                  <input
                    type="text"
                    id="edit-finnish"
                    name="finnish"
                    placeholder="Finnish"
                    value={editWord.finnish}
                    onChange={handleEditWordChange}
                    required
                  />
                </div>
                <div className='form-row'>
                  <label htmlFor="edit-swedish">Swedish:</label>
                  <input
                    type="text"
                    id="edit-swedish"
                    name="swedish"
                    placeholder="Swedish"
                    value={editWord.swedish}
                    onChange={handleEditWordChange}
                    required
                  />
                </div>
                <div className='form-row'>
                  <label htmlFor="edit-tags">Tags:</label>
                  <input
                    type="text"
                    id="edit-tags"
                    name="tags"
                    placeholder="Tags"
                    value={editWord.tags}
                    onChange={handleEditWordChange}
                  />
                </div>
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={closeEditModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Action</h2>
            <p>Are you sure you want to delete this word?</p>
            <button type='button' onClick={confirmDeleteWord}>Yes</button>
            <button type='button' onClick={() => {closeDeleteModal(); setDeleteWordId(null)}}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;