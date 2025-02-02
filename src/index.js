export default (documents, target) => {
  const result = new Set();
  const parsedTarget = target.match(/\w+/g)[0];

  for (let i = 0; i < documents.length; i += 1) {
    const words = documents[i].text.split(' ').map((token) => token.match(/\w+/g)).flat();

    for (let j = 0; j < words.length; j += 1) {
      if (words[j] === parsedTarget) {
        result.add(documents[i].id);
      }
    }
  }

  return [...result.values()];
};
