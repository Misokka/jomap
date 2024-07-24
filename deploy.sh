#!/bin/bash

# Variables
USER="root"
SERVER="jso-paris.fr"
REMOTE_DIR="/var/www/html"
LOCAL_BUILD_DIR="src/dist"

# Build the project
echo "Building the project..."
vite build

# Copy images to the build directory
echo "Copying images..."
cp -r src/images $LOCAL_BUILD_DIR/images

# Copy built files to the server
echo "Deploying to the server..."
scp -r $LOCAL_BUILD_DIR/* $USER@$SERVER:$REMOTE_DIR

echo "Deployment completed successfully!"
