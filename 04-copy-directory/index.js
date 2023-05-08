const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'files');
const pathToFolderCopy = path.join(__dirname, 'files-copy');

fs.mkdir(pathToFolderCopy, {recursive: true}, (error) => {
  if (error) return console.error(error.message);
});

fs.readdir(pathToFolder, {withFileTypes: true}, function (error, files) {
  if (error) return console.error(error.message);

  files.forEach((file) => {
    if (file.isFile()) {
      fs.copyFile(path.join(pathToFolder, file.name), path.join(pathToFolderCopy, file.name), (error) => {
        if (error) return console.error(error.message);
      });
    }
  });
});