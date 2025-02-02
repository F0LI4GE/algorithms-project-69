import search from '../index.js';

const doc1 = { id: 'doc1', text: "I can't shoot straight unless I've had a pint!" };
const doc2 = { id: 'doc2', text: "Don't shoot shoot shoot that thing at me." };
const doc3 = { id: 'doc3', text: "I'm your shooter." };
const doc4 = { id: 'doc4', text: "I'm your shooter." };
const doc5 = { id: 'doc5', text: "I'm your shooter. shoot shoot shoot shoot shoot" };
const docs = [doc1, doc2, doc3, doc4, doc5];

test('search', () => {
  expect(search(docs, 'shoot')).toStrictEqual(['doc5', 'doc2', 'doc1']);
  expect(search(docs, 'DOESNOTEXIST')).toStrictEqual([]);
  expect(search(docs, 'pint!')).toStrictEqual(['doc1']);
  expect(search(docs, 'pint')).toStrictEqual(['doc1']);
});
