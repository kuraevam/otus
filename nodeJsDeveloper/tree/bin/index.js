#!/usr/bin/env node

import { program } from 'commander';
import fs from 'fs';
import { getTreeByDirectory, getTreeByJson } from '../src/structure.js';

program
  .version('1.0.0')
  .description('Tree CLI')
  .option('-s, --source <string>', 'Add type json|directory')
  .option('-p, --path <string>', 'Add path')
  .option('-d, --depth <string>', 'Add display depth')
  .action((options) => {
    const { source, path, depth } = options;

    if (!['json', 'directory'].includes(source)) {
      console.log(`This source does not exist: ${source}. Add type file|directory`);
      return;
    }

    if (!fs.existsSync(path)) {
      console.log('This path does not exist');
      return;
    }

    if (source === 'json' && !fs.lstatSync(path).isFile()) {
      console.log('This file does not exist');
      return;
    }

    if (source === 'directory' && !fs.lstatSync(path).isDirectory()) {
      console.log('This directory does not exist');
      return;
    }

    const depthInt = Number.parseInt(depth, 10);
    if (Number.isNaN(depthInt) || depthInt <= 0) {
      console.log('Display depth must be greater than 0');
      return;
    }

    if (source === 'json') {
      const tree = getTreeByJson(path, depthInt);
      console.log(tree);
    }

    if (source === 'directory') {
      const tree = getTreeByDirectory(path, depthInt);
      console.log(tree);
    }
  });

program.parse(process.argv);
