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

export { filterWordsByTag, getUniqueTags };