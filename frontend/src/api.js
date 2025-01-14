/**
 * This module contains functions to interact with the API.
 */

/**
 * Function to add a new word to the database.
 * @async
 * @param {Object} word - The word object to add.
 * @param {string} word.english - The English translation of the word.
 * @param {string} word.finnish - The Finnish translation of the word.
 * @param {string} word.swedish - The Swedish translation of the word.
 * @param {string} word.tags - The tags associated with the word.
 * @returns {Promise<Object>} - A promise that resolves to the added word.
 * @throws Will throw an error if the add request fails.
 */
const addWord = async (word) => {
  const response = await fetch('/api/words', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });

  if (!response.ok) {
    throw new Error('Failed to add word');
  }

  return response.json();
};

/**
 * Function to delete a word from the database.
 * @function deleteWord
 * @async
 * @param {number} id - The ID of the word to delete.
 * @returns {Promise<Object>} - A promise that resolves to the response of the delete operation.
 * @throws Will throw an error if the delete request fails.
 */
const deleteWord = async (id) => {
  const response = await fetch(`/api/words/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete word');
  }

  return response.json();
};

/**
 * Function to fetch all words from the API.
 * @function getAllWords
 * @async
 * @returns {Promise<Array>} - A promise that resolves to an array of words.
 * @throws Will throw an error if the fetch request fails.
 */
const getAllWords = async () => {
  const response = await fetch('/api/words');
  if (!response.ok) {
    throw new Error('Failed to fetch words');
  }
  return response.json();
};

/**
 * Function to update a word in the database.
 * @function updateWord
 * @async
 * @param {number} id - The ID of the word to update.
 * @param {Object} word - The word object with updated values.
 * @returns {Promise<Object>} - A promise that resolves to the updated word.
 * @throws Will throw an error if the update request fails.
 */
const updateWord = async (id, word) => {
  const response = await fetch(`/api/words/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  if (!response.ok) {
    throw new Error('Failed to update word');
  }
  return response.json();
};

export { addWord, deleteWord, getAllWords, updateWord };