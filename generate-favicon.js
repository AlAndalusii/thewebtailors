const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const svgPath = path.join(__dirname, 'public', 'favicon.svg');
const pngPath = path.join(__dirname, 'public', 'favicon.png');
const icoPath = path.join(__dirname, 'public', 'favicon.ico');

// Read the SVG file
const svgBuffer = fs.readFileSync(svgPath);

// Generate PNG file
sharp(svgBuffer)
  .resize(64, 64)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log(`PNG favicon created at ${pngPath}`);
    
    // Generate ICO file (which is just a PNG with .ico extension for our purposes)
    // For a proper ICO file with multiple sizes you'd need a specialized library
    fs.copyFileSync(pngPath, icoPath);
    console.log(`ICO favicon created at ${icoPath}`);
  })
  .catch(err => {
    console.error('Error creating favicon:', err);
  }); 