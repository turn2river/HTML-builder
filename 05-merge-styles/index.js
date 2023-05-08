const fs = require('fs');
const path = require('path');

const pathToFolder = path.join(__dirname, 'styles');
const pathToBundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(pathToFolder, { withFileTypes: true }, (error, styles) => {
  if (error) return console.log(error.message);
  styles.forEach((style) => {
    if (style.isFile() && path.extname(style.name) === '.css') {
      fs.createReadStream(path.join(pathToFolder, style.name), { encoding: 'utf-8' })
        .pipe(pathToBundle, { end: false });
    }
  });
});