const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8080;

console.log('=== Azure App Service Startup ===');
console.log('Node.js version:', process.version);
console.log('Port:', port);
console.log('Working directory:', process.cwd());
console.log('Environment NODE_ENV:', process.env.NODE_ENV);

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
console.log('Checking for dist directory at:', distPath);

if (!fs.existsSync(distPath)) {
  console.error('❌ CRITICAL ERROR: dist directory does not exist!');
  console.error('Files in current directory:', fs.readdirSync(__dirname));
  
  // Try to build if package.json exists
  if (fs.existsSync('package.json')) {
    console.log('📦 Attempting to build the application...');
    const { execSync } = require('child_process');
    try {
      execSync('npm run build', { stdio: 'inherit' });
      console.log('✅ Build completed successfully');
    } catch (error) {
      console.error('❌ Build failed:', error.message);
      process.exit(1);
    }
  } else {
    console.error('❌ No package.json found');
    process.exit(1);
  }
}

// Check if index.html exists
const indexPath = path.join(distPath, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.error('❌ CRITICAL ERROR: dist/index.html does not exist!');
  console.error('Files in dist directory:', fs.readdirSync(distPath));
  process.exit(1);
}

console.log('✅ dist directory found:', distPath);
console.log('✅ index.html found:', indexPath);

// Serve static files from the dist directory
app.use(express.static(distPath));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

// API endpoint to check environment
app.get('/api/env', (req, res) => {
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    hasViteEntraClientId: !!process.env.VITE_ENTRA_CLIENT_ID,
    hasViteEntraTenantId: !!process.env.VITE_ENTRA_TENANT_ID
  });
});

// Handle client-side routing by serving index.html for all non-API routes
app.get('*', (req, res) => {
  console.log('📄 Serving index.html for route:', req.path);
  res.sendFile(indexPath);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).send('Internal Server Error');
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log('🚀 Server started successfully!');
  console.log(`🌐 Server running on: http://0.0.0.0:${port}`);
  console.log('🏥 Health check available at: /health');
  console.log('🔧 Environment info available at: /api/env');
  console.log('=== Startup Complete ===');
});

server.on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📤 SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('📤 SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
