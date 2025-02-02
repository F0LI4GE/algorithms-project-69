export default (documents, phrase) => {
  const ranks = {};
  const parsedTargets = phrase.match(/\w+/g);

  for (let i = 0; i < documents.length; i += 1) {
    const document = documents[i];
    const words = document.text.split(' ').map((token) => token.match(/\w+/g)).flat();

    for (let j = 0; j < words.length; j += 1) {
      if (parsedTargets.includes(words[j])) {
        if (ranks[document.id]) {
          ranks[document.id] += 1;
        } else {
          ranks[document.id] = 1;
        }
      }
    }
  }

  return Object.entries(ranks).sort((e1, e2) => e2[1] - e1[1]).map((entry) => entry[0]);
};

export const invertIndex = (documents) => {
  const index = {};

  for (let i = 0; i < documents.length; i += 1) {
    const doc = documents[i];
    const words = doc.text.match(/\w+/g);

    for (let j = 0; j < words.length; j += 1) {
      const word = words[j];

      if (!index[word]) {
        index[word] = [doc.id];
      } else if (!index[word].includes(doc.id)) {
        index[word].push(doc.id);
      }
    }
  }

  return index;
};
