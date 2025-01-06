import { useState, useEffect } from 'react';
import { getAllWords } from '../../../api';

function Learn() {
  const [words, setWords] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedLanguage1, setSelectedLanguage1] = useState('english');
  const [selectedLanguage2, setSelectedLanguage2] = useState('finnish');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [userTranslation, setUserTranslation] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [isPracticing, setIsPracticing] = useState(false);

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

  const handleTranslationChange = (e) => {
    setUserTranslation(e.target.value);
  };

  const checkTranslation = () => {
    const currentWord = filteredWords[currentWordIndex];
    if (currentWord[selectedLanguage2].toLowerCase() === userTranslation.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextWord = () => {
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % filteredWords.length);
    setUserTranslation('');
    setIsCorrect(null);
  };

  const startPractice = () => {
    setIsPracticing(true);
    setCurrentWordIndex(0);
    setUserTranslation('');
    setIsCorrect(null);
  };

  const stopPractice = () => {
    setIsPracticing(false);
    setUserTranslation('');
    setIsCorrect(null);
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
          <select value={selectedLanguage1} onChange={handleLanguage1Change} disabled={isPracticing}>
            <option value="english">English</option>
            <option value="finnish">Finnish</option>
            <option value="swedish">Swedish</option>
          </select>
        </label>
        <label>
          Select Language 2:
          <select value={selectedLanguage2} onChange={handleLanguage2Change} disabled={isPracticing}>
            <option value="english">English</option>
            <option value="finnish">Finnish</option>
            <option value="swedish">Swedish</option>
          </select>
        </label>
        <label>
          Select Tag:
          <select value={selectedTag} onChange={handleTagChange} disabled={isPracticing}>
            <option value="">All</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
        <button onClick={startPractice} disabled={isPracticing}>Start Practice</button>
      </div>
      {isPracticing && filteredWords.length > 0 && (
        <div>
          <p>
            Translate the word: <strong>{filteredWords[currentWordIndex][selectedLanguage1]}</strong>
          </p>
          <input
            type="text"
            value={userTranslation}
            onChange={handleTranslationChange}
            placeholder={`Translate to ${selectedLanguage2}`}
          />
          <button onClick={checkTranslation}>Check</button>
          {isCorrect !== null && (
            <p>{isCorrect ? 'Correct!' : `Incorrect! The correct translation is ${filteredWords[currentWordIndex][selectedLanguage2]}`}</p>
          )}
          <button onClick={nextWord}>Next Word</button>
        </div>
      )}
      <button onClick={stopPractice} disabled={!isPracticing}>Stop Practice</button>
    </div>
  );
}

export default Learn;