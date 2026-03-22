@echo off
REM LocalHub - Quick Start Reference Guide
REM This batch file displays startup instructions

cls
color 0B

echo.
echo ╔════════════════════════════════════════════╗
echo ║     LocalHub E-Commerce Platform          ║
echo ║         Complete Setup Guide              ║
echo ╚════════════════════════════════════════════╝
echo.

echo 📋 SYSTEM REQUIREMENTS:
echo   ✓ Node.js v14+ (check: node --version)
echo   ✓ npm v6+ (check: npm --version)
echo   ✓ MongoDB v4.4+ (local or MongoDB Atlas)
echo   ✓ Modern Web Browser (Chrome, Firefox, Edge)
echo.

echo 🚀 QUICK START (Easiest Way):
echo.
echo   Step 1: Run setup.bat
echo   Step 2: Follow the prompts
echo   Step 3: Open http://localhost:3000
echo.

echo 🚀 MANUAL QUICK START (5 minutes):
echo.
echo   Terminal 1 (Backend):
echo   ─────────────────────
echo   cd backend
echo   npm install
echo   npm start
echo.
echo   Terminal 2 (Frontend):
echo   ─────────────────────
echo   cd frontend
echo   npm install
echo   npm start
echo.

echo 📱 ACCESS THE WEBSITE:
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:5000/api
echo   Health Check: http://localhost:5000/api/health
echo.

echo 👤 TEST ACCOUNTS (password: password123):
echo   Admin: admin@localhub.com
echo   Seller: seller@localhub.com
echo   Customer: customer@localhub.com
echo.

echo 💳 PAYMENT TESTING (Stripe - No Real Charges):
echo   Card Number: 4242 4242 4242 4242
echo   Expiry Date: Any future date (MM/YY)
echo   CVC: Any 3 digits
echo   Name: Anything
echo.

echo ✅ VERIFICATION CHECKLIST:
echo   □ Node.js and npm installed
echo   □ MongoDB running (mongod)
echo   □ Backend running on :5000
echo   □ Frontend running on :3000
echo   □ Can login with test accounts
echo   □ Can add products to cart
echo   □ Can complete checkout
echo   □ Test payment works
echo.

echo 📁 PROJECT STRUCTURE:
echo   ecom/
echo   ├── backend/           (Node.js + Express)
echo   ├── frontend/          (React + Tailwind)
echo   ├── README.md          (Project overview)
echo   ├── SETUP.md           (Detailed guide)
echo   └── setup.bat          (Auto-setup script)
echo.

echo ⚙️ CONFIGURATION FILES:
echo   Backend Config: backend\.env
echo   Frontend Config: frontend\.env
echo   (Already pre-configured with test Stripe keys!)
echo.

echo 🔧 COMMON COMMANDS:
echo.
echo   Start Backend:
echo   cd backend
echo   npm start
echo.
echo   Start Frontend:
echo   cd frontend
echo   npm start
echo.
echo   Install Dependencies:
echo   cd backend
echo   npm install
echo.
echo   Reset Database:
echo   mongosh
echo   use localhub
echo   db.dropDatabase()
echo.

echo 📊 API ENDPOINTS (Backend):
echo   POST   /api/auth/register         - Create account
echo   POST   /api/auth/login            - Login
echo   GET    /api/products              - List products
echo   POST   /api/products              - Add product (seller)
echo   POST   /api/orders                - Create order
echo   POST   /api/payment/payment-intent - Stripe payment
echo.

echo 🌐 DATABASE OPTIONS:
echo.
echo   Option 1: Local MongoDB
echo   -----------------------
echo   mongod                   (start server)
echo   MongoDB running on localhost:27017
echo   Update MONGODB_URI in .env if using different port
echo.
echo   Option 2: MongoDB Atlas (Cloud)
echo   ------•-----------
echo   Create account at: mongodb.com/cloud/atlas
echo   Copy connection string
echo   Update MONGODB_URI in backend/.env
echo.

echo 🆘 TROUBLESHOOTING:
echo.
echo   MongoDB Connection Failed?
echo   ──────────────────────────
echo   1. Ensure MongoDB is running: mongod
echo   2. Check MONGODB_URI in backend\.env
echo   3. For Atlas, verify IP whitelist
echo   4. Test: mongosh
echo.
echo   Port 5000 Already in Use?
echo   ─────────────────────────
echo   1. Change PORT in backend\.env to 5001
echo   2. Or kill process: netstat -ano ^| findstr :5000
echo   3. taskkill /PID ^<PID^> /F
echo.
echo   CORS Error?
echo   ───────────
echo   1. Update FRONTEND_URL in backend/.env
echo   2. Ensure REACT_APP_API_URL is correct in frontend/.env
echo   3. Restart both servers
echo   4. Clear browser cache (Ctrl+Shift+Delete)
echo.
echo   Payment Not Working?
echo   ────────────────────
echo   1. Verify Stripe keys in both .env files
echo   2. Ensure backend server is running
echo   3. Check browser console (F12) for errors
echo   4. Use test card: 4242 4242 4242 4242
echo.

echo 💡 TIPS:
echo   • Use separate terminal windows for backend/frontend
echo   • Changes auto-reload in development
echo   • Use Ctrl+C to stop servers
echo   • Delete node_modules if issues: npm install
echo   • Check console errors (F12 in browser)
echo.

echo 📚 DETAILED DOCUMENTATION:
echo   Setup Instructions: SETUP.md
echo   Project Overview: README.md
echo   Quick Reference: This file
echo.

echo 🎯 NEXT STEPS:
echo   1. Run: setup.bat
echo   2. Wait for installation
echo   3. Open: http://localhost:3000
echo   4. Login with test account
echo   5. Add products (as seller)
echo   6. Make a purchase (as customer)
echo   7. Test Stripe payment
echo   8. View admin dashboard
echo.

echo 💼 CUSTOMIZE:
echo   Colors: tailwind.config.js
echo   Layout: src/components/
echo   Pages: src/pages/
echo   API: src/services/api.js
echo   Store: src/store/index.js
echo.

echo 🚀 DEPLOYMENT:
echo   Frontend: npm run build → Deploy to Vercel/Netlify
echo   Backend: Deploy to Heroku/AWS/Render
echo   Database: Use MongoDB Atlas cloud
echo.

echo 🔐 SECURITY (Before Prod):
echo   □ Change JWT_SECRET in backend/.env
echo   □ Get live Stripe keys (not test)
echo   □ Use strong passwords
echo   □ Enable HTTPS
echo   □ Keep .env out of git
echo   □ Update package dependencies
echo.

echo ═════════════════════════════════════════════
echo   🎉 LocalHub is Ready to Use!
echo   Questions? Check SETUP.md
echo ═════════════════════════════════════════════
echo.

pause
