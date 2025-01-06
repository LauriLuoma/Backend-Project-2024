import { useState, useEffect } from 'react';
import { getAllWords } from '../../../api';

function Learn() {
  const [words, setWords] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedLanguage1, setSelectedLanguage1] = useState('english');
  const [selectedLanguage2, setSelectedLanguage2] = useState('finnish');

  useEffect(() => {
    fetchWords();
  }, [selectedTag]);

  const fetchWords = async () => {
    try {
      const words = await getAllWords();
      setWords(words);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleTagChange = (e) => {
    setSelectedTag(e.target.value);
  };

  const handleLanguage1Change = (e) => {
    setSelectedLanguage1(e.target.value);
  };

  const handleLanguage2Change = (e) => {
    setSelectedLanguage2(e.target.value);
  };

  const filteredWords = selectedTag
    ? words.filter((word) => word.tags.split(',').map(tag => tag.trim()).includes(selectedTag))
    : words;

  const uniqueTags = [...new Set(words.flatMap((word) => word.tags.split(',').map(tag => tag.trim())))];

  return (
    <div>
      <h1>Learn!</h1>
      <div>
        <label>
          Select Language 1:
          <select value={selectedLanguage1} onChange={handleLanguage1Change}>
            <option value="english">English</option>
            <option value="finnish">Finnish</option>
            <option value="swedish">Swedish</option>
          </select>
        </label>
        <label>
          Select Language 2:
          <select value={selectedLanguage2} onChange={handleLanguage2Change}>
            <option value="english">English</option>
            <option value="finnish">Finnish</option>
            <option value="swedish">Swedish</option>
          </select>
        </label>
        <label>
          Select Tag:
          <select value={selectedTag} onChange={handleTagChange}>
            <option value="">All</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default Learn;