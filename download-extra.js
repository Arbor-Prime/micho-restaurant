const https = require('https')
const http = require('http')
const fs = require('fs')

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    const lib = url.startsWith('https') ? https : http
    lib.get(url, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        file.close()
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      res.pipe(file)
      file.on('finish', () => { file.close(); console.log('done', dest.split('\\').pop()); resolve() })
    }).on('error', err => { fs.unlink(dest, () => {}); reject(err) })
  })
}

const base = 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3b7e34d0-a214-4dcd-b631-ed48708cfa21/'
const out = 'C:\\Users\\HP Elitebook\\orchids-projects\\black-porcupine\\micho-app\\public\\'

Promise.all([
  download(base + 'a706a1dc-c1c2-4eda-b3e0-cbcb0b6cf897-1772732139142.jpg?width=2000&height=2000&resize=contain', out + 'food-salad.jpg'),
  download(base + '39cb3841-27c3-42c2-a7b9-ae12dd4e9e82-1772732152638.jpg?width=2000&height=2000&resize=contain', out + 'food-koftecigar.jpg'),
]).then(() => console.log('ALL DONE')).catch(console.error)
