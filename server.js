import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

console.log('Starting server...');
console.log('Port:', port);
console.log('Directory:', __dirname);

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  console.error('CRITICAL ERROR: dist directory does not exist!');
  console.error('Make sure to run "npm run build" first');
  process.exit(1);
}

// Check if index.html exists
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('CRITICAL ERROR: dist/index.html does not exist!');
  process.exit(1);
}

console.log('dist directory found:', distPath);
console.log('index.html found:', indexPath);

// Serve static files from the dist directory
app.use(express.static(distPath));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Handle client-side routing by serving index.html for all non-static routes
app.get('*', (req, res) => {
  console.log('Serving index.html for route:', req.path);
  res.sendFile(indexPath);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running successfully on port ${port}`);
  console.log(`🌐 Access your app at: http://localhost:${port}`);
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
