const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pathToFile = path.join(__dirname, 'answer.txt');

fs.writeFile(pathToFile, '', (error) => {
  if (error) return console.log(error.message);
  const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  process.stdout.write('What is your favorite videogame?\nType your answer to proceed or type "exit"(press control + C) to quit\n');
  readlineInterface.on('line', (answer) => {
    if (answer === 'exit') {
      readlineInterface.close();
    } else {
      fs.appendFile(pathToFile, `${answer}\n`, (error) => {
        if (error) return console.error(error.message);
      });
    }
  });
  readlineInterface.on('close', () => process.stdout.write('WOW! This is my favorite game too! What a twist!'));
});