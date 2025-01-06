import { useState, useEffect } from 'react';
import { addWord, deleteWord, getAllWords } from '../../../api';


function Admin() {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({english: '', finnish: '', swedish: '', tags: ''});

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
        <h2>Words</h2>
        {words.map((word) => (
          <div key={word.id} style={{ border: '1px solid black', padding: '10px', margin: '10px 0' }}>
            <p>English: {word.english}</p>
            <p>Finnish: {word.finnish}</p>
            <p>Swedish: {word.swedish}</p>
            <p>Tags: {word.tags}</p>
            <button onClick={() => handleDeleteWord(word.id)}>Delete</button>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;