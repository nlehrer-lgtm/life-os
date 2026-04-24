#!/bin/bash
cd "$(dirname "$0")"
echo "Starting Home Base..."
node server.js &
sleep 1
open http://localhost:3000
echo "Home Base running at http://localhost:3000"
