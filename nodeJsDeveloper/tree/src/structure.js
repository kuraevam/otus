import fs from 'node:fs';
import path from 'node:path';
import renderStructure from './utils/renderStructure.js';

function getStructureDirectory(folderPath, depth) {
  const structure = {
    name: path.basename(folderPath),
  };

  if (depth === 0) {
    return structure;
  }
  depth -= 1;

  const childPaths = fs.readdirSync(folderPath).map((fileName) => path.join(folderPath, fileName));

  const items = [];
  for (const childPath of childPaths) {
    if (fs.lstatSync(childPath).isFile()) {
      items.push({
        name: path.basename(childPath),
      });
    }

    if (fs.lstatSync(childPath).isDirectory()) {
      const structureChild = getStructureDirectory(childPath, depth);
      items.push(structureChild);
    }
  }

  if (items.length) {
    structure.items = items;
  }

  return structure;
}

function getJsonFromFile(filePath) {
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    throw Error('path does not exist');
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function getStructureJson(json, depth) {
  const structure = {
    name: json.name,
  };

  if (depth === 0 || !Array.isArray(json.items)) {
    return structure;
  }
  depth -= 1;

  structure.items = [];
  for (const item of json.items) {
    const structureChild = getStructureJson(item, depth);
    structure.items.push(structureChild);
  }

  return structure;
}

export function showDirectoryFileStructure(folderPath, depth) {
  const structure = getStructureDirectory(folderPath, depth);
  renderStructure(structure);
}

export function showJsonStructure(folderPath, depth) {
  const json = getJsonFromFile(folderPath);
  const structure = getStructureJson(json, depth);
  renderStructure(structure);
}
