const addWord = async (word) => {
  const response = await fetch('http://localhost:3000/api/words', {
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

const deleteWord = async (id) => {
  const response = await fetch(`http://localhost:3000/api/words/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete word');
  }

  return response.json();
};

export { addWord, deleteWord };