const { readdir, stat } = require('fs/promises');
const path = require('path');

const getName = (pathToFile, extName) => {
  return path.basename(pathToFile, extName);
};

const getExtension = (pathToFile) => {
  return path.extname(pathToFile).slice(1);
};

const getSize = (file) => {
  return file.size;
};

const readDirectory = async () => {
  const pathToFolder = path.join(__dirname, 'secret-folder');
  try {
    const files = await readdir(pathToFolder);
    files.forEach(async (item) => {
      const pathToFile = path.join(pathToFolder, item);
      const file = await stat(pathToFile);

      if (file.isFile()) {
        const extName = path.extname(pathToFile);
        const name = getName(pathToFile, extName);
        const extension = getExtension(pathToFile);
        const fileSize = getSize(file);
        const output = `${name} - ${extension} - ${fileSize / 1024}kb`;
        return console.log(output);
      }
    });
  } catch (error) {
    return console.error(error.message);
  }
};

readDirectory();