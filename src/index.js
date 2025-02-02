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
