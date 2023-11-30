const fs = require('fs');

const videoFolder = './videos'; 

fs.readdir(videoFolder, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach((file) => {
    const encodedFilename = encodeURIComponent(file);
    const videoURL = `/videos/${encodedFilename}`;
    console.log(videoURL);
  });
});

