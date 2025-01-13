import { useState, useEffect } from 'react';
import { getAllWords } from '../api';
import { filterWordsByTag, getUniqueTags, shuffleArray } from '../utils/wordUtils';

function Learn() {
  // State to store the list of words
  const [words, setWords] = useState([]);
  // State to store the selected tag for filtering words
  const [selectedTag, setSelectedTag] = useState('');
  // State to store the first selected language for translation
  const [selectedLanguage1, setSelectedLanguage1] = useState('english');
  // State to store the second selected language for translation
  const [selectedLanguage2, setSelectedLanguage2] = useState('finnish');
  // State to store the index of the current word being practiced
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  // State to store the user's translation input
  const [userTranslation, setUserTranslation] = useState('');
  // State to store whether the user's translation is correct
  const [isCorrect, setIsCorrect] = useState(null);
  // State to store whether the user is currently practicing
  const [isPracticing, setIsPracticing] = useState(false);
  // State to store the user's score
  const [score, setScore] = useState(0);
  // State to store whether the user's translation has been checked
  const [isChecked, setIsChecked] = useState(false);
  // State to store whether the user has tried to translate the word
  const [hasTried, setHasTried] = useState(false);
  // State to store the list of words in a randomized order
  const [randomizedWords, setRandomizedWords] = useState([]);

  // Fetch words from the database when the component mounts or when the selected tag changes
  useEffect(() => {
    fetchWords();
  }, [selectedTag]);

  /**
   * Function to fetch words from the database and update the state.
   * @async
   * @function fetchWords
   * @param {JSON} words - The list of words fetched from the database.
   * @throws Will throw an error if there is an issue fetching the words.
   */
  const fetchWords = async () => {
    try {
      const words = await getAllWords();
      setWords(words);
    } catch (error) {
      console.error('Error fetching words:', error);
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

  /**
   * Function to handle changes in the first selected language for translation.
   * Updates the state with the selected language value.
   * @function handleLanguage1Change
   * @param {Object} e - The event object from the select change event.
   */
  const handleLanguage1Change = (e) => {
    setSelectedLanguage1(e.target.value);
  };

  /**
   * Function to handle changes in the second selected language for translation.
   * Updates the state with the selected language value.
   * @function handleLanguage2Change
   * @param {Object} e - The event object from the select change event.
   */
  const handleLanguage2Change = (e) => {
    setSelectedLanguage2(e.target.value);
  };

  /**
   * Function to handle changes in the user's translation input.
   * Updates the state with the user's translation value.
   * @function handleTranslationChange
   * @param {Object} e - The event object from the input change event.
   */
  const handleTranslationChange = (e) => {
    setUserTranslation(e.target.value);
  };

  /**
 * Function to handle key down events.
 * Checks the translation when the Enter key is pressed.
 * @function handleKeyDown
 * @param {Object} e - The event object from the key down event.
 */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      checkTranslation();
    }
  }

  /**
 * Function to check the user's translation.
 * Compares the user's translation with the correct translation and updates the state.
 * @function checkTranslation
 * @param {string} currentWord - The current word being practiced.
 * @param {string} selectedLanguage2 - The second selected language for translation.
 * @param {string} userTranslation - The user's translation input.
 * @param {boolean} hasTried - Whether the user has tried to translate the word.
 * @param {number} score - The user's score.
 */
  const checkTranslation = () => {
    // Get the current word being practiced
    const currentWord = randomizedWords[currentWordIndex];

    // Check if the user's translation matches the correct translation
    if (currentWord[selectedLanguage2].toLowerCase() === userTranslation.toLowerCase()) {
      setIsCorrect(true);
      // Increment the score if the user has not tried this word before
      if (!hasTried) {
        setScore(score + 1);
      }
    } else {
      setIsCorrect(false);
    }

    // Mark the translation as checked and set that the user has tried to translate the word
    setIsChecked(true);
    setHasTried(true);
  };

  /**
 * Function to reset the state for trying the current word again.
 * Clears the user's translation input and resets the correctness and checked state.
 * Sets that the user has tried to translate the word so the score does not increase.
 * @function tryAgain
 */
  const tryAgain = () => {
    setUserTranslation('');
    setIsCorrect(null);
    setIsChecked(false);
    setHasTried(true);
  }

  /**
 * Function to move to the next word in the list.
 * Updates the current word index and resets the state for the new word.
 * @function nextWord
 */
  const nextWord = () => {
    // Goes to the next word in the list and loops back to the beginning if at the end
    setCurrentWordIndex((prevIndex) => (prevIndex + 1) % filteredWords.length);
    setUserTranslation('');
    setIsCorrect(null);
    setIsChecked(false);
    setHasTried(false);
  };

  /**
 * Function to start the practice session.
 * Filters and shuffles the words, then initializes the state for practicing.
 * @function startPractice
 * @param {Array} filteredWords - The list of words filtered by the selected tag.
 * @param {Array} shuffledWords - The list of words shuffled in a random order.
 */
  const startPractice = () => {
    const filteredWords = filterWordsByTag(words, selectedTag);
    const shuffledWords = shuffleArray(filteredWords);
    setRandomizedWords(shuffledWords);
    setIsPracticing(true);
    setCurrentWordIndex(0);
    setUserTranslation('');
    setIsCorrect(null);
    setIsChecked(false);
    setHasTried(false);
  };

  /**
 * Function to start the practice session.
 * Filters and shuffles the words, then initializes the state for practicing.
 * @function startPractice
 */
  const stopPractice = () => {
    setIsPracticing(false);
  };

  // Filter the words based on the selected tag
  const filteredWords = filterWordsByTag(words, selectedTag);
  // Get the unique tags from the list of words
  const uniqueTags = getUniqueTags(words);

  return (
    <div className='container'>
      <div className='learn-container'>
        <header>
          <h1>Learn words!</h1>
          <h2>Translate the words from the first language to the second language</h2>
        </header>
        <section className='learn-options'>
          {/* Dropdown to select the language to translate from */}
          <label className='language-select' htmlFor="language1">
            Select the language to translate from:
            <select id="language1" value={selectedLanguage1} onChange={handleLanguage1Change} disabled={isPracticing}>
              <option value="english">English</option>
              <option value="finnish">Finnish</option>
              <option value="swedish">Swedish</option>
            </select>
          </label>
          {/* Dropdown to select the language to translate to */}
          <label className='language-select' htmlFor="language2">
            Select the language to translate to:
            <select id="language2" value={selectedLanguage2} onChange={handleLanguage2Change} disabled={isPracticing}>
              <option value="english">English</option>
              <option value="finnish">Finnish</option>
              <option value="swedish">Swedish</option>
            </select>
          </label>
          {/* Dropdown to select a tag/theme for the words */}
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
        {/* Display the user's score */}
        <p>Words translated correctly on first try: {score}</p>
        {/* Button to start the practice session */}
        <button onClick={startPractice} disabled={isPracticing}>Start Practice</button>
        {isPracticing && randomizedWords.length > 0 && (
          <section className='practice-container'>
            {/* Display the word to be translated */}
            <p>
              Translate the word: <strong>{randomizedWords[currentWordIndex][selectedLanguage1]}</strong>
            </p>
            {/* Input for the user's translation */}
            <input
              type="text"
              value={userTranslation}
              onChange={handleTranslationChange}
              onKeyDown={handleKeyDown}
              placeholder={`Translate to ${selectedLanguage2}`}
            />
            <div>
              {/* Button to check the user's translation */}
              <button onClick={checkTranslation} disabled={isChecked}>Check</button>
            </div>
            {isCorrect !== null && (
              <div>
                {/* Display the result of the translation check */}
                <p>{isCorrect ? 'Correct!' : `Incorrect! The correct translation is ${filteredWords[currentWordIndex][selectedLanguage2]}`}</p>
                {/* Button to try the translation again if incorrect */}
                {!isCorrect && <button onClick={tryAgain}>Try Again</button> }
              </div>
            )}
            <div>
              {/* Button to move to the next word */}
              <button onClick={nextWord} disabled={!isChecked}>Next Word</button>
            </div>
          </section>
        )}
        {/* Button to stop the practice session */}
        <button onClick={stopPractice} disabled={!isPracticing}>Stop Practice</button>
      </div>
    </div>
  );
}

export default Learn;