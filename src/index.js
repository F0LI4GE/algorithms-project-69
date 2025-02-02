const calculateTF = (document) => {
  const words = document.text.split(' ').map((token) => token.match(/\w+/g)).flat();
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

const calculateIDF = (documents) => {
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

const invertIndex = (documents) => {
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

const search = (documents, phrase) => {
  const index = invertIndex(documents);
  const ranks = {};
  const parsedTargets = phrase.match(/\w+/g);

  parsedTargets.forEach((target) => {
    if (index[target]) {
      Object.keys(index[target]).forEach((docId) => {
        if (ranks[docId]) {
          ranks[docId] += index[target][docId];
        } else {
          ranks[docId] = index[target][docId];
        }
      });
    }
  });

  return Object.entries(ranks).sort((e1, e2) => e2[1] - e1[1]).map((entry) => entry[0]);
};

export default search;
