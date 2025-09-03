#!/bin/bash

# Azure startup script
echo "Starting Azure deployment..."

# Build the application
echo "Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "ERROR: Build failed - dist directory not found"
    exit 1
fi

# Start the server
echo "Starting server..."
npm start
