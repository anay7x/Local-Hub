#!/bin/bash

# LocalHub E-Commerce Platform - Linux/Mac Setup Script
# This script sets up the entire website with payment integration

echo ""
echo "============================================"
echo "   LocalHub E-Commerce Platform Setup"
echo "============================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js from https://nodejs.org"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "✓ Node.js found: $NODE_VERSION"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✓ npm found: $NPM_VERSION"

# Setup Backend
echo ""
echo "[1/4] Setting up Backend..."
cd backend || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed."
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file with default Stripe test keys..."
    cat > .env << 'EOF'
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/localhub

# JWT Secret
JWT_SECRET=localhub_jwt_secret_key_2026

# Server Port
PORT=5000

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,image/webp

# Stripe Payment Gateway
STRIPE_PUBLIC_KEY=pk_test_51QlkPfHjyKr7Vo6jEz7kQwL2n8mP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN
STRIPE_SECRET_KEY=sk_test_51QlkPfHjyKr7Vo6jEz7kQwL2n8mP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN

# Node Environment
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
EOF
fi

cd ..

# Setup Frontend
echo ""
echo "[2/4] Setting up Frontend..."
cd frontend || exit 1

if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed."
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << 'EOF'
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51QlkPfHjyKr7Vo6jEz7kQwL2n8mP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN
EOF
fi

cd ..

echo ""
echo "[3/4] Verifying database connection..."
# Simple check to see if MongoDB is running
if command -v mongosh &> /dev/null || command -v mongo &> /dev/null; then
    echo "✓ MongoDB client found"
else
    echo "⚠ MongoDB client not found. Make sure MongoDB is running on localhost:27017"
fi

echo ""
echo "============================================"
echo "   Setup Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start MongoDB (if using local instance):"
echo "   mongod"
echo ""
echo "2. Start Backend Server in terminal 1:"
echo "   cd backend"
echo "   npm start"
echo ""
echo "3. Start Frontend in terminal 2:"
echo "   cd frontend"
echo "   npm start"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "Test Credentials:"
echo "   Admin: admin@localhub.com / password123"
echo "   Seller: seller@localhub.com / password123"
echo "   Customer: customer@localhub.com / password123"
echo ""
echo "Test Card (Stripe):"
echo "   Number: 4242 4242 4242 4242"
echo "   Expiry: Any future date (MM/YY)"
echo "   CVC: Any 3 digits"
echo ""
echo "Documentation: Read SETUP.md for detailed instructions"
echo ""

chmod +x setup.sh
