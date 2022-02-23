const fs = require('fs');
const superagent = require('superagent');

// Promisifying readFile
const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`Couldn't find that file 🙁`);
      resolve(data);
    });
  });
};

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`Breed: ${data}`);

  // superagent
  //   .get(`https://dog.ceo/api/breed/${data}/images/random`)
  //   .end((err, res) => {
  //     if (err) return console.log(err.message);
  //     console.log(res.body.message);

  //     fs.writeFile('dog-img.txt', res.body.message, (err) => {
  //       if (err) return console.log(err.message);
  //       console.log('Random dog image saved to file!');
  //     });
  //   });

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('Random dog image saved to file!');
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
});
