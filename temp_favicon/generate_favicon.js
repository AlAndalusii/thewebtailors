const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

// Create a canvas for the favicon (32x32 pixels)
const canvas = createCanvas(32, 32);
const ctx = canvas.getContext('2d');

// Create gradient background (similar to the SVG)
const gradient = ctx.createLinearGradient(0, 0, 32, 32);
gradient.addColorStop(0, '#818CF8');  // Indigo-400
gradient.addColorStop(1, '#FB7185');  // Rose-400
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(16, 16, 16, 0, Math.PI * 2);
ctx.fill();

// Add the "T" letter
ctx.fillStyle = 'white';
ctx.font = 'bold 20px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('T', 16, 16);

// Save as PNG first (required for ico conversion)
const pngBuffer = canvas.toBuffer('image/png');
const pngPath = path.join(__dirname, 'favicon.png');
fs.writeFileSync(pngPath, pngBuffer);

// Convert PNG to ICO and save to public directory
const outputPath = path.join(__dirname, '..', 'public', 'favicon.ico');

pngToIco([pngPath])
  .then(buf => {
    fs.writeFileSync(outputPath, buf);
    console.log('Favicon.ico created successfully at:', outputPath);
  })
  .catch(err => {
    console.error('Error creating favicon.ico:', err);
  }); 