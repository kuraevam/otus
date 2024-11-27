import renderStructure from './renderStructure.js';

describe('renderStructure', () => {
  test('it should return the tree structure', async () => {
    const data = {
      name: 1,
      items: [{ name: 2, items: [{ name: 3 }, { name: 4 }] }, {
        name: 5,
        items: [{ name: 6, items: [{ name: 7, items: [{ name: 8, items: [{ name: 9 }] }] }] }],
      }],
    };

    const result = renderStructure(data);

    expect(result).toMatchSnapshot();
  });
});
