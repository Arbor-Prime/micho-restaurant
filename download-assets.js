const https = require('https');
const fs = require('fs');

const assets = [
  {
    url: 'https://michoturkishbarandgrill.co.uk/wp-content/uploads/2025/11/favicon_micho.png',
    out: 'C:/Users/HP Elitebook/orchids-projects/black-porcupine/micho-app/public/favicon.png'
  },
  {
    url: 'https://michoturkishbarandgrill.co.uk/wp-content/uploads/2025/11/micho-logo-3-340-x-156-piksel-1.png',
    out: 'C:/Users/HP Elitebook/orchids-projects/black-porcupine/micho-app/public/micho-logo.png'
  }
];

function download(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => { file.close(); console.log('OK:', dest); resolve(); });
      } else if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        console.log('Redirected to:', res.headers.location);
        download(res.headers.location, dest).then(resolve);
      } else {
        file.close();
        fs.unlink(dest, () => {});
        console.log('SKIP (' + res.statusCode + '):', url);
        resolve();
      }
    }).on('error', (e) => { console.log('ERROR:', url, e.message); resolve(); });
  });
}

(async () => {
  for (const a of assets) await download(a.url, a.out);
})();
