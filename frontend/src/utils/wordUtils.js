const filterWordsByTag = (words, selectedTag) => {
  if (!selectedTag) {
    return words;
  }

  return words.filter((word) => {
    const tags = word.tags.split(',').map(tag => tag.trim());
    return tags.includes(selectedTag);
  });
};

const getUniqueTags = (words) => {
  const allTags = words.flatMap((word) => word.tags.split(',').map(tag => tag.trim()));
  return [...new Set(allTags)];
};

const shuffleArray = (array) => {
  const shuffledArray = [...array]
  for (let currentIndex = shuffledArray.length - 1; currentIndex >= 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[currentIndex]];
  }
  return shuffledArray;
}

export { filterWordsByTag, getUniqueTags, shuffleArray };