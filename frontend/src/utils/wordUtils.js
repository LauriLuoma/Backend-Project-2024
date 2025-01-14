/**
 * Function to filter words by a selected tag.
 * @function filterWordsByTag
 * @param {Array} words - The list of words to filter.
 * @param {string} selectedTag - The tag to filter words by.
 * @returns {Array} - The filtered list of words.
 */
const filterWordsByTag = (words, selectedTag) => {
  if (!selectedTag) {
    return words;
  }

  return words.filter((word) => {
    const tags = word.tags.split(',').map(tag => tag.trim());
    return tags.includes(selectedTag);
  });
};

/**
 * Function to get unique tags from a list of words.
 * @function getUniqueTags
 * @param {Array} words - The list of words to extract tags from.
 * @returns {Array} - The list of unique tags.
 */
const getUniqueTags = (words) => {
  const allTags = words.flatMap((word) => word.tags.split(',').map(tag => tag.trim()));
  return [...new Set(allTags)];
};

/**
 * Function to shuffle an array. Uses the Fisher-Yates algorithm.
 * @function shuffleArray
 * @param {Array} array - The words to shuffle.
 * @returns {Array} - The shuffled words.
 */
const shuffleArray = (array) => {
  const shuffledArray = [...array]
  for (let currentIndex = shuffledArray.length - 1; currentIndex >= 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }
  return shuffledArray;
}

export { filterWordsByTag, getUniqueTags, shuffleArray };