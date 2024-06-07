#!/usr/bin/env bash

# Update package lists and install dependencies
apt-get update
apt-get install -y wget gnupg ca-certificates

# Add Chrome's signing key and repository
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list'

# Install Chrome
apt-get update
apt-get install -y google-chrome-stable --no-install-recommends

# Clean up
apt-get clean
rm -rf /var/lib/apt/lists/*
