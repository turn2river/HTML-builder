const { readdir, copyFile,  mkdir, rm, } = require('fs/promises');
const path = require('path');

const pathToFiles = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

async function copyFiles(source, destination) {
  await rm(destination, { force: true, recursive: true });
  await mkdir(destination, { recursive: true });
  const files = await readdir(source, { withFileTypes: true });
  try {
    for (let file of files) {
      const fileSource = path.join(source, file.name);
      const fileDestination = path.join(destination, file.name);

      if (file.isFile()) {
        copyFile(fileSource, fileDestination);
      } else {
        await copyFiles(fileSource, fileDestination);
      }
    }
  } catch (error) {
    return console.log(error.message);
  }
}

copyFiles(pathToFiles, copyPath);
