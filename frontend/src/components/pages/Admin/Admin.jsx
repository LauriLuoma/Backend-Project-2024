import React, { useState, useEffect } from 'react';
import { addWord, deleteWord } from '../../api';


function Admin() {
  const [newWord, setNewWord] = useState({english: '', finnish: '', swedish: '', tags: ''});
  const [deleteId, setDeleteId] = useState('');

  const handleAddWordChange = (e) => {
    const { name, value } = e.target;
    setNewWord({ ...newWord, [name]: value });
  };

  const handleDeleteIdChange = (e) => {
    setDeleteId(e.target.value);
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

  const handleDeleteWordSubmit = async (e) => {
    e.preventDefault();
    try {
      await deleteWord(deleteId);
      console.log('Word deleted successfully');
      setDeleteId('');
    } catch (error) {
      console.error('Error deleting word:', error);
    }
  };

  return (
    <div>
      <h1>Admin</h1>
    </div>
  );
}

export default Admin;