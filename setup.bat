@echo off
REM LocalHub E-Commerce Platform - Windows Setup Script
REM This script sets up the entire website with payment integration

echo.
echo ============================================
echo   LocalHub E-Commerce Platform Setup
echo ============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js from https://nodejs.org
    pause
    exit /b 1
)

REM Check if MongoDB is running or available
echo.
echo [1/5] Checking MongoDB connection...
REM For now, we'll just warn the user
echo Make sure MongoDB is running on localhost:27017 or configure MONGODB_URI in .env

REM Setup Backend
echo.
echo [2/5] Setting up Backend...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
) else (
    echo Backend dependencies already installed.
)

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file with default Stripe test keys...
    (
        echo # MongoDB Connection
        echo MONGODB_URI=mongodb://localhost:27017/localhub
        echo.
        echo # JWT Secret
        echo JWT_SECRET=localhub_jwt_secret_key_2026
        echo.
        echo # Server Port
        echo PORT=5000
        echo.
        echo # Stripe Payment Gateway
        echo STRIPE_PUBLIC_KEY=pk_test_51QlkPfHjyKr7Vo6jEz7kQwL2n8mP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN
        echo STRIPE_SECRET_KEY=sk_test_51QlkPfHjyKr7Vo6jEz7kQwL2n8mP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN
        echo.
        echo # Node Environment
        echo NODE_ENV=development
        echo.
        echo # Frontend URL
        echo FRONTEND_URL=http://localhost:3000
    ) > .env
)

cd ..

REM Setup Frontend
echo.
echo [3/5] Setting up Frontend...
cd frontend
if not exist node_modules (
    echo Installing frontend dependencies...
    call npm install
) else (
    echo Frontend dependencies already installed.
)

REM Create .env if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
        echo REACT_APP_STRIPE_PUBLIC_KEY=pk_test_51QlkPfHjyKr7Vo6jEz7kQwL2n8mP9qR0sT1uV2wX3yZ4aB5cD6eF7gH8iJ9kL0mN
    ) > .env
)

cd ..

echo.
echo ============================================
echo   Setup Complete!
echo ============================================
echo.
echo Next steps:
echo.
echo 1. Start MongoDB (if using local instance):
echo    mongod
echo.
echo 2. Start Backend Server in a new terminal:
echo    cd backend
echo    npm start
echo.
echo 3. Start Frontend in another new terminal:
echo    cd frontend
echo    npm start
echo.
echo 4. Open http://localhost:3000 in your browser
echo.
echo Test Credentials:
echo   Admin: admin@localhub.com / password123
echo   Seller: seller@localhub.com / password123
echo   Customer: customer@localhub.com / password123
echo.
echo Test Card (Stripe):
echo   Number: 4242 4242 4242 4242
echo   Expiry: Any future date (MM/YY)
echo   CVC: Any 3 digits
echo.
echo Documentation: Read SETUP.md for detailed instructions
echo.
pause
