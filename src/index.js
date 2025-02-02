export default (documents, target) => {
  const result = new Set();

  for (let i = 0; i < documents.length; i += 1) {
    const words = documents[i].text.split(' ');

    for (let j = 0; j < words.length; j += 1) {
      if (words[j] === target) {
        result.add(documents[i].id);
      }
    }
  }

  return [...result.values()];
};
