import { useState, useEffect } from 'react';
import { addWord, deleteWord, getAllWords, updateWord } from '../../../api';


function Admin() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({english: '', finnish: '', swedish: '', tags: ''});
  const [editWord, setEditWord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const words = await getAllWords();
      setWords(words);
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
      console.log('Word added successfully');
      setNewWord({ english: '', finnish: '', swedish: '', tags: '' });
      fetchWords();
    } catch (error) {
      console.error('Error adding word:', error);
    }
  };

  const handleDeleteWord = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this word?');
    if (!confirmed) {
      return;
    }

    try {
      await deleteWord(id);
      console.log('Word deleted successfully');
      fetchWords();
    } catch (error) {
      console.error('Error deleting word:', error);
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
      setIsModalOpen(false);
      fetchWords();
    } catch (error) {
      console.error('Error updating word:', error);
    }
  };

  const openEditModal = (word) => {
    setEditWord(word);
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setEditWord(null);
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const filteredWords = selectedTag
    ? words.filter((word) => word.tags.split(',').map(tag => tag.trim()).includes(selectedTag))
    : words;

  const uniqueTags = [...new Set(words.flatMap((word) => word.tags.split(',').map(tag => tag.trim())))];

  return (
    <div>
      <h1>Admin</h1>
      <div>
        <h2>Add Word</h2>
        <form onSubmit={handleAddWordSubmit}>
          <input
            type="text"
            name="english"
            placeholder="English"
            value={newWord.english}
            onChange={handleAddWordChange}
            required
          />
          <input
            type="text"
            name="finnish"
            placeholder="Finnish"
            value={newWord.finnish}
            onChange={handleAddWordChange}
            required
          />
          <input
            type="text"
            name="swedish"
            placeholder="Swedish"
            value={newWord.swedish}
            onChange={handleAddWordChange}
            required
          />
          <input
            type="text"
            name="tags"
            placeholder="Tags"
            value={newWord.tags}
            onChange={handleAddWordChange}
          />
          <button type="submit">Add Word</button>
        </form>
      </div>
      <div>
        <h2>Filter by Tag</h2>
        <select value={selectedTag} onChange={handleTagChange}>
          <option value="">All</option>
          {uniqueTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h2>Words</h2>
        {filteredWords.map((word) => (
          <div key={word.id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            <p>English: {word.english}</p>
            <p>Finnish: {word.finnish}</p>
            <p>Swedish: {word.swedish}</p>
            <p>Tags: {word.tags}</p>
            <button onClick={() => handleDeleteWord(word.id)}>Delete</button>
            <button onClick={() => openEditModal(word)}>Edit</button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Word</h2>
            <form onSubmit={handleEditWordSubmit}>
              <input
                type="text"
                name="english"
                placeholder="English"
                value={editWord.english}
                onChange={handleEditWordChange}
                required
              />
              <input
                type="text"
                name="finnish"
                placeholder="Finnish"
                value={editWord.finnish}
                onChange={handleEditWordChange}
                required
              />
              <input
                type="text"
                name="swedish"
                placeholder="Swedish"
                value={editWord.swedish}
                onChange={handleEditWordChange}
                required
              />
              <input
                type="text"
                name="tags"
                placeholder="Tags"
                value={editWord.tags}
                onChange={handleEditWordChange}
              />
              <button type="submit">Save Changes</button>
              <button type="button" onClick={closeEditModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;