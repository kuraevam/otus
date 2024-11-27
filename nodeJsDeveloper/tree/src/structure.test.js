import path from 'node:path';
import { getTreeByDirectory, getTreeByJson } from './structure.js';

describe('getTreeByJson', () => {
  test('it should return the tree', async () => {
    const folderPath = path.join(__dirname, '..', './resources/index.json');
    const result = getTreeByJson(folderPath, 4);
    expect(result).toMatchSnapshot();
  });
});

describe('getTreeByDirectory', () => {
  test('it should return the tree', async () => {
    const folderPath = path.join(__dirname, '..', './resources/tree');
    const result = getTreeByDirectory(folderPath, 4);
    expect(result).toMatchSnapshot();
  });
});
