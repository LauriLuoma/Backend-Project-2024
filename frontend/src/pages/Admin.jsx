import { useState, useEffect } from 'react';
import { addWord, deleteWord, getAllWords, updateWord } from '../api';
import { filterWordsByTag, getUniqueTags } from '../utils/wordUtils';
import useModal from '../hooks/useModal';


function Admin() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({english: '', finnish: '', swedish: '', tags: ''});
  const [selectedTag, setSelectedTag] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteWordId, setDeleteWordId] = useState(null);
  const {
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
  } = useModal();

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const words = await getAllWords();
      setWords(words);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleAddWordChange = (e) => {
    const { name, value } = e.target;
    setNewWord({ ...newWord, [name]: value });
  };

  const handleAddWordSubmit = async (e) => {
    e.preventDefault();
    try {
      await addWord(newWord);
      closeAddWordModal();
      console.log('Word added successfully');
      setNewWord({ english: '', finnish: '', swedish: '', tags: '' });
      fetchWords();
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding word:', error);
      setErrorMessage('Error adding word. Please try again.');
      closeAddWordModal();
      openErrorModal();
    }
  };

  const handleDeleteWord = (id) => {
    setDeleteWordId(id);
    openDeleteModal();
  };

  const confirmDeleteWord = async () => {
    try {
      await deleteWord(deleteWordId);
      closeDeleteModal();
      console.log('Word deleted successfully');
      fetchWords();
      setErrorMessage('');
    } catch (error) {
      console.error('Error deleting word:', error);
      setErrorMessage('Error deleting word. Please try again.');
      closeDeleteModal();
      openErrorModal();
    }
  };

  const handleEditWordChange = (e) => {
    const { name, value } = e.target;
    setEditWord({ ...editWord, [name]: value });
  };

  const handleEditWordSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateWord(editWord.id, editWord);
      console.log('Word updated successfully');
      closeEditModal();
      fetchWords();
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating word:', error);
      setErrorMessage('Error updating word. Please try again.');
      closeEditModal();
      openErrorModal();
    }
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredWords = filterWordsByTag(words, selectedTag);
  const uniqueTags = getUniqueTags(words);

  return (
    <div className='container'>
      <header>
        <h1>Admin view</h1>
        <h3>Here you can add, edit and delete words</h3>
      </header>
      <button onClick={openAddWordModal}>Add New Word</button>
      <section className='filter-tag'>
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