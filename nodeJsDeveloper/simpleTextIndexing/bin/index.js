#!/usr/bin/env node

import {program} from 'commander';
import fs from 'node:fs';
import textIndexing from '../src/textIndexing.js';

program
    .version('1.0.0')
    .description('Simple text indexing CLI')
    .option('-in, --input <string>', 'Input file')
    .option('-out, --output <string>', 'Output file')
    .action((options) => {
        const {input, output} = options;

        if (!fs.existsSync(input)) {
            console.log('This path does not exist');
            return;
        }

        textIndexing(input, output)
    });

program.parse(process.argv);
