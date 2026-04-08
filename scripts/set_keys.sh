#!/bin/bash
# Run this once to save your API keys to ~/.zshrc

echo ""
echo "=== API Key Setup ==="
echo ""

read -p "ElevenLabs API key: " el_key
read -p "Pexels API key: " px_key

# Remove any old entries
sed -i '' '/ELEVENLABS_API_KEY/d' ~/.zshrc
sed -i '' '/PEXELS_API_KEY/d' ~/.zshrc

# Write new entries
echo "export ELEVENLABS_API_KEY=\"$el_key\"" >> ~/.zshrc
echo "export PEXELS_API_KEY=\"$px_key\"" >> ~/.zshrc

source ~/.zshrc

echo ""
echo "Done. Keys saved to ~/.zshrc"
echo "ElevenLabs: ${#el_key} characters"
echo "Pexels: ${#px_key} characters"
