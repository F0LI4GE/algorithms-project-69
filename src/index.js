const parseDocumentContent = (document) => document.text.split(' ').map((token) => token.match(/\w+/g)).flat();

export const calculateTF = (document) => {
  const words = parseDocumentContent(document);
  const wordCounts = {};

  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    wordCounts[word] = (wordCounts[word] || 0) + 1;
  }

  const termFreqs = {};

  Object.keys(wordCounts).forEach((word) => {
    termFreqs[word] = wordCounts[word] / words.length;
  });

  return termFreqs;
};

export const calculateIDF = (documents) => {
  const docCount = documents.length;
  const wordDocCount = {};

  documents.forEach((doc) => {
    const words = new Set(doc.text.match(/\w+/g));
    words.forEach((word) => {
      wordDocCount[word] = (wordDocCount[word] || 0) + 1;
    });
  });

  const idf = {};
  Object.keys(wordDocCount).forEach((word) => {
    idf[word] = Math.log(docCount / wordDocCount[word]);
  });

  return idf;
};

export const invertIndex = (documents) => {
  const index = {};

  const IDF = calculateIDF(documents);

  for (let i = 0; i < documents.length; i += 1) {
    const doc = documents[i];
    const words = doc.text.match(/\w+/g);

    const TF = calculateTF(doc);

    for (let j = 0; j < words.length; j += 1) {
      const word = words[j];
      const wordFreq = TF[word];
      const wordInverseDocumentFreq = IDF[word];
      const wordTfIdf = wordFreq * wordInverseDocumentFreq;

      if (!index[word]) {
        index[word] = {};
      }
      index[word][doc.id] = wordTfIdf;
    }
  }

  return index;
};

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
