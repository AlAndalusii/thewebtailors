const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

// Create a canvas for the favicon (multiple sizes for better quality)
const sizes = [16, 32, 48, 64];
const mainSize = 64; // Use largest size for initial creation

const canvas = createCanvas(mainSize, mainSize);
const ctx = canvas.getContext('2d');

// Create outer gradient background circle (indigo to rose gradient)
const gradient = ctx.createLinearGradient(0, 0, mainSize, mainSize);
gradient.addColorStop(0, '#6366F1'); // indigo-500
gradient.addColorStop(1, '#F43F5E'); // rose-500
ctx.fillStyle = gradient;

// Draw the outer circle with blur effect
ctx.beginPath();
ctx.arc(mainSize/2, mainSize/2, mainSize/2, 0, Math.PI * 2);
ctx.fill();

// Apply a slight blur to match the logo design
ctx.filter = 'blur(1px)';
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(mainSize/2, mainSize/2, mainSize/2, 0, Math.PI * 2);
ctx.fill();
ctx.filter = 'none';

// Draw inner black circle 
ctx.fillStyle = '#000000';
ctx.beginPath();
ctx.arc(mainSize/2, mainSize/2, mainSize/2 * 0.65, 0, Math.PI * 2);
ctx.fill();

// Add the "T" letter in Pacifico-style cursive font
ctx.fillStyle = 'white';
ctx.font = 'bold 36px Pacifico, cursive';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('T', mainSize/2, mainSize/2);

// Save PNG in multiple sizes
const outputDir = path.join(__dirname, '..', 'public');
const pngPath = path.join(outputDir, 'favicon.png');

// Save the main PNG
const pngBuffer = canvas.toBuffer('image/png');
fs.writeFileSync(pngPath, pngBuffer);

// Also save an SVG version for better scaling
const svgContent = `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Gradient background -->
  <circle cx="32" cy="32" r="32" fill="url(#gradient)" />
  
  <!-- Inner black circle -->
  <circle cx="32" cy="32" r="20.8" fill="black" />
  
  <!-- T letter -->
  <text x="32" y="32" font-size="36" font-family="Pacifico, cursive" fill="white" dominant-baseline="middle" text-anchor="middle">T</text>
  
  <!-- Gradient definition -->
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#6366F1" />
      <stop offset="1" stop-color="#F43F5E" />
    </linearGradient>
  </defs>
</svg>`;

const svgPath = path.join(outputDir, 'favicon.svg');
fs.writeFileSync(svgPath, svgContent);

// Convert PNG to ICO and save to public directory
const icoPath = path.join(outputDir, 'favicon.ico');

pngToIco([pngPath])
  .then(buf => {
    fs.writeFileSync(icoPath, buf);
    console.log('Favicon files created successfully at:', outputDir);
  })
  .catch(err => {
    console.error('Error creating favicon.ico:', err);
  }); 