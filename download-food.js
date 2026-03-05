const https = require('https');
const fs = require('fs');

const files = [
  {
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3b7e34d0-a214-4dcd-b631-ed48708cfa21/image-1772726052594.png?width=8000&height=8000&resize=contain',
    dest: 'C:/Users/HP Elitebook/orchids-projects/black-porcupine/micho-app/public/food-chicken.png'
  },
  {
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3b7e34d0-a214-4dcd-b631-ed48708cfa21/image-1772726060152.png?width=8000&height=8000&resize=contain',
    dest: 'C:/Users/HP Elitebook/orchids-projects/black-porcupine/micho-app/public/food-lamb.png'
  },
  {
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3b7e34d0-a214-4dcd-b631-ed48708cfa21/image-1772726064593.png?width=8000&height=8000&resize=contain',
    dest: 'C:/Users/HP Elitebook/orchids-projects/black-porcupine/micho-app/public/food-kofte.png'
  },
  {
    url: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3b7e34d0-a214-4dcd-b631-ed48708cfa21/image-1772726076125.png?width=8000&height=8000&resize=contain',
    dest: 'C:/Users/HP Elitebook/orchids-projects/black-porcupine/micho-app/public/food-pide.png'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(res.statusCode); });
    }).on('error', reject);
  });
}

(async () => {
  for (const f of files) {
    const code = await download(f.url, f.dest);
    console.log(code, f.dest.split('/').pop());
  }
})();
