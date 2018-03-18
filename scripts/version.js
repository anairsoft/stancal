const crc32 = require('crc32');
const execSync = require('child_process').execSync;
const fs = require('fs');

const file = '.env.local';
const data = `REACT_APP_BUILD_TIME_STAMP=` + Date.now() + `
REACT_APP_BUILD_TIME_CRC32=` + crc32(String(Date.now())) + `
REACT_APP_GIT_COMMIT_HASH_SHORT=` + execSync("git log --pretty=format:'%h' -n 1") + `
REACT_APP_GIT_COMMIT_HASH_FULL=` + execSync("git log --pretty=format:'%H' -n 1") + `
REACT_APP_GIT_TAG_LAST=` + execSync("git describe --abbrev=0 --tags") + `
`;

fs.writeFile(file, data, function(err) {
  if(err) {
    return console.log(err);
  }
  console.log('File saved: ' + file);
}); 