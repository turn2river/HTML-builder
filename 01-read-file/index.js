const fs = require('fs');
const path = require('path');

const pathToFile = path.join(__dirname, 'text.txt');
const stream = new fs.ReadStream(pathToFile, { encoding: 'utf8' });

stream.pipe(process.stdout);
