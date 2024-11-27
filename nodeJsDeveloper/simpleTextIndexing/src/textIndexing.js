import fs from "node:fs";
import {Transform} from "node:stream";

const separators = [' ', '\n', '\r', '\t'];
const result = {};

export default function (inFile, outFile) {
    if (!fs.existsSync(inFile) || !fs.statSync(inFile).isFile()) {
        throw Error('Path does not exist');
    }

    const readStream = fs.createReadStream(inFile, {encoding: 'utf8'})
    const writeStream = fs.createWriteStream(outFile, {encoding: 'utf8'});

    const textIndexingTransform = new Transform({
        transform(chunk, encoding, callback) {
            let message = chunk.toString();

            for (const separator of separators) {
                message = message.replace(new RegExp(separator, 'ig'), ',');
            }

            let phrases = message.split(',');
            phrases = phrases.filter((phrase) => phrase).sort();

            for (const phrase of phrases) {
                result[phrase] = (result[phrase] || 0) + 1;
            }

            callback();
        },
    });

    readStream
        .pipe(textIndexingTransform)
        .on('finish', () => {
            const outMessage = JSON.stringify(Object.values(result));
            writeStream.write(outMessage);
        });
}
