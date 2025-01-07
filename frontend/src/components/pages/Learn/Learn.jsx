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
    <div className='container'>
      <header>
        <h1>Learn words!</h1>
        <h2>Translate the words from the first language to the second language</h2>
      </header>
      <section className='learn-options'>
        <label className='language-select' htmlFor="language1">
          Select the language to translate from:
          <select id="language1" value={selectedLanguage1} onChange={handleLanguage1Change} disabled={isPracticing}>
            <option value="english">English</option>
            <option value="finnish">Finnish</option>
            <option value="swedish">Swedish</option>
          </select>
        </label>
        <label className='language-select' htmlFor="language2">
          Select the language to translate to:
          <select id="language2" value={selectedLanguage2} onChange={handleLanguage2Change} disabled={isPracticing}>
            <option value="english">English</option>
            <option value="finnish">Finnish</option>
            <option value="swedish">Swedish</option>
          </select>
        </label>
        <label className='tag-select' htmlFor="tag">
          Select a theme for the words:
          <select id="tag" value={selectedTag} onChange={handleTagChange} disabled={isPracticing}>
            <option value="">All</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </section>
      <section>
        <button onClick={startPractice} disabled={isPracticing}>Start Practice</button>
      </section>
      {isPracticing && filteredWords.length > 0 && (
        <section className='practice-container'>
          <p>
            Translate the word: <strong>{filteredWords[currentWordIndex][selectedLanguage1]}</strong>
          </p>
          <input
            type="text"
            value={userTranslation}
            onChange={handleTranslationChange}
            placeholder={`Translate to ${selectedLanguage2}`}
          />
          <div>
            <button onClick={checkTranslation}>Check</button>
          </div>
          {isCorrect !== null && (
            <p>{isCorrect ? 'Correct!' : `Incorrect! The correct translation is ${filteredWords[currentWordIndex][selectedLanguage2]}`}</p>
          )}
          <div>
            <button onClick={nextWord}>Next Word</button>
          </div>
        </section>
      )}
      <section>
        <button onClick={stopPractice} disabled={!isPracticing}>Stop Practice</button>
      </section>
    </div>
  );
}

export default Learn;