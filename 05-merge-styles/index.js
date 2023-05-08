const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

const pathToFolder = path.join(__dirname, 'styles');

async function mergeStyles() {
  const pathToBundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
  try {
    const styles = await readdir(pathToFolder, { withFileTypes: true });
    styles.forEach((style) => {
      if (style.isFile() && path.extname(style.name) === '.css') {
        const input = fs.createReadStream(path.join(pathToFolder, style.name), 'utf-8');
        input.pipe(pathToBundle, { end: false });
      }
    });
  } catch (error) {
    return console.log(error.message);
  }
}

mergeStyles();