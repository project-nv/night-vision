import fs from 'fs';
import path from 'path';

// Convert the import.meta.url to a URL object to handle file protocol
const currentDir = new URL('.', import.meta.url).pathname;

const dirPath = path.resolve(currentDir, '../dist/cdn');
const fileToKeep = 'night-vision.min.js';

export default function cleanDist() {
  fs.readdirSync(dirPath).forEach(file => {
    if (file !== fileToKeep) {
      fs.unlinkSync(path.join(dirPath, file));
    }
  });
}
