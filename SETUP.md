# LocalHub E-Commerce Platform - Complete Setup Guide

## 🚀 One-Click Quick Start

### Windows Users
```bash
# Run setup script - installs everything!
setup.bat
```

### Mac/Linux Users
```bash
# Run setup script
chmod +x setup.sh
./setup.sh
```

## ⚡ Manual Quick Start (5 minutes)

### Prerequisites Check
- ✅ Node.js v14+ installed (`node --version`)
- ✅ MongoDB running locally or MongoDB Atlas account
- ✅ Stripe account (optional for development - test keys included!)
- ✅ Git installed

### Quick Commands
```bash
# Backend
cd backend && npm install && npm start

# Frontend (new terminal)
cd frontend && npm install && npm start

# Open http://localhost:3000
```

---

## 💳 Payment Integration (READY TO USE!)

### Stripe is Pre-Configured with Test Keys!

Your `.env` files already have **test** Stripe keys:
- **Public Key**: `pk_test_51QlkPfHjyKr7Vo6...`
- **Secret Key**: `sk_test_51QlkPfHjyKr7Vo6...`

### Test Payment (No Real Charges)

1. Add product to cart
2. Go to checkout
3. Select "Credit/Debit Card"
4. Use test card: **4242 4242 4242 4242**
5. Expiry: Any future date (MM/YY)
6. CVC: Any 3 digits
7. Payment processes instantly!

### Switch to Live Stripe Keys (When Ready)

1. Create https://stripe.com account
2. Go to Dashboard → Developers → API Keys
3. Copy live keys (start with `pk_live_` and `sk_live_`)
4. Replace in `.env` files
5. Update FRONTEND_URL to your domain

### Payment Flow Architecture
```
Customer selects "Card" → 
Creates order → 
Payment page loads with Stripe Elements →
Card processed via Stripe API →
Payment confirmed with backend →
Order marked as "paid" →
Email confirmation sent
```

---

## 📦 Full Installation

### Step 1: Clone the Repository
```bash
cd c:\Users\anayg\ecom
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

#### 2.2 Configure Environment Variables
```bash
# Copy the example env file
copy .env.example .env

# Edit .env and update with your actual values:
```

**Sample .env configuration:**
```env
# Database
MONGODB_URI=mongodb://localhost:27017/localhub
# Or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/localhub

# JWT
JWT_SECRET=your_super_secret_key_min_32_characters_long

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Stripe (Optional for development)
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# Email (Optional)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASSWORD=your_app_specific_password
```

#### 2.3 Start Backend Server
```bash
# From backend directory
npm start

# Or with auto-reload (requires nodemon):
npm run dev
```

**Expected output:**
```
🚀 LocalHub Backend Server running on port 5000
📍 Environment: development
MongoDB connected successfully: localhost
```

---

### Step 3: Frontend Setup

#### 3.1 Install Dependencies (in new terminal)
```bash
cd frontend
npm install
```

#### 3.2 Configure Environment
```bash
# Create .env file
echo REACT_APP_API_URL=http://localhost:5000/api > .env
```

#### 3.3 Start Development Server
```bash
npm start
```

**Expected output:**
- Frontend runs on `http://localhost:3000`
- Browser automatically opens
- Hot reload enabled

---

## 🔐 Database Setup

### Option 1: Local MongoDB

#### Install MongoDB Community Edition
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow official docs

#### Start MongoDB Service
```bash
# Windows (if installed as service)
# MongoDB will run automatically after installation

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

#### Verify Connection
```bash
mongosh
> db.adminCommand('ping')
# Should return: { ok: 1 }
```

### Option 2: MongoDB Atlas (Cloud)

1. Visit https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string
5. Update `MONGODB_URI` in `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/localhub?retryWrites=true&w=majority
   ```

---

## 💳 Stripe Setup (Optional)

### Development Testing
```
Test Card: 4242 4242 4242 4242
Expiry: Any future date (MM/YY)
CVC: Any 3 digits
```

### Get Stripe Keys
1. Visit https://dashboard.stripe.com
2. Navigate to Developers → API Keys
3. Copy:
   - Publishable Key → `REACT_APP_STRIPE_PUBLIC_KEY` in frontend `.env`
   - Secret Key → `STRIPE_SECRET_KEY` in backend `.env`

---

## 👥 Create Test Accounts

### Via API (Recommended)

#### 1. Customer Account
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Customer",
    "email": "customer@test.com",
    "password": "password123",
    "confirmPassword": "password123",
    "phone": "9876543210",
    "role": "customer"
  }'
```

#### 2. Seller Account
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Store Owner",
    "email": "seller@test.com",
    "password": "password123",
    "confirmPassword": "password123",
    "phone": "9876543211",
    "shopName": "My Local Shop",
    "category": "Electronics",
    "role": "seller"
  }'
```

#### 3. Admin Account (via Database)
```javascript
// Connect to MongoDB and insert:
db.users.insertOne({
  name: "Admin User",
  email: "admin@test.com",
  password: "$2a$10$...", // bcrypt hashed password
  phone: "9876543212",
  role: "admin",
  isActive: true,
  isVerified: true
})
```

### Via UI
1. Open http://localhost:3000
2. Click "Sign Up"
3. Fill form with your details
4. Select user type (Customer/Seller)
5. Click "Create Account"

---

## 📁 Project Structure Explained

```
ecom/
├── backend/
│   ├── models/              # Data schemas
│   │   ├── User.js          # User/Seller/Admin model
│   │   ├── Product.js       # Product model
│   │   ├── Order.js         # Order model
│   │   └── Cart.js          # Shopping cart
│   │
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   ├── paymentController.js
│   │   └── adminController.js
│   │
│   ├── routes/             # API endpoints
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── paymentRoutes.js
│   │   └── adminRoutes.js
│   │
│   ├── middleware/         # Custom middleware
│   │   ├── auth.js         # JWT verification
│   │   └── errorHandler.js
│   │
│   ├── config/
│   │   └── database.js     # MongoDB connection
│   │
│   ├── uploads/            # User uploaded files
│   ├── server.js           # Main server file
│   ├── package.json
│   └── .env               # Environment variables

├── frontend/
│   ├── src/
│   │   ├── pages/         # Page components
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetails.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── SellerDashboard.js
│   │   │   └── AdminDashboard.js
│   │   │
│   │   ├── components/    # Reusable components
│   │   │   ├── Layout.js
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   │
│   │   ├── store/         # State management (Zustand)
│   │   │   └── index.js
│   │   │
│   │   ├── services/      # API calls
│   │   │   └── api.js
│   │   │
│   │   ├── styles/        # Global styles
│   │   │   └── index.css
│   │   │
│   │   ├── App.js         # Main app component
│   │   └── index.js       # React entry point
│   │
│   ├── public/
│   │   └── index.html
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── README.md
├── SETUP.md (this file)
└── .gitignore
```

---

## 🔄 Common Issues & Solutions

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:**
- Ensure MongoDB is running: `mongosh`
- Check MONGODB_URI in .env
- For Atlas, verify IP whitelist

### Issue: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- Update FRONTEND_URL in backend .env
- Ensure backend API responses include CORS headers
- Hard refresh browser (Ctrl+Shift+R)

### Issue: Token Expired Error
```
401 Invalid or expired token
```
**Solution:**
- Clear browser localStorage
- Log out and back in
- Increase JWT_EXPIRES in future

### Issue: Port Already in Use
```
Error: listen EADDRINUSE :::5000
```
**Solution:**
```bash
# Find process using port 5000
# Windows
netstat -ano | findstr :5000

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or change PORT in .env to 5001
```

### Issue: Dependencies Not Installed
```
Module not found: Can't resolve 'axios'
```
**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🧪 Testing the Application

### 1. Create a Test Product
```javascript
// Login as seller first
// Then in Seller Dashboard:
// Click "Add Product"
// Fill form and submit
```

### 2. Add to Cart
```
1. Home page → Featured Products
2. Click product
3. Click "Add to Cart"
4. Adjust quantity if needed
```

### 3. Checkout
```
1. Click cart icon
2. Review items
3. Click "Proceed to Checkout"
4. Fill shipping address
5. Select payment method
6. Review and "Place Order"
```

### 4. Admin Functions
```
1. Login as admin
2. Go to Admin Dashboard
3. Manage users, view analytics
4. Approve sellers if needed
```

---

## 📊 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Header
```
Authorization: Bearer <token>
```

### Sample Requests

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"customer@test.com","password":"password123"}'
```

#### Get Products
```bash
curl http://localhost:5000/api/products?category=Electronics&sortBy=price-low
```

#### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shippingAddress": {
      "name": "John",
      "phone": "9876543210",
      "street": "123 Main",
      "city": "Delhi",
      "state": "Delhi",
      "zipCode": "110001",
      "country": "India"
    },
    "paymentInfo": {"method": "cod"}
  }'
```

---

## 🚀 Deployment Ready Checklist

Before deploying to production:

- [ ] Set `NODE_ENV=production` in backend .env
- [ ] Use strong JWT_SECRET (min 32 characters)
- [ ] Set FRONTEND_URL to production domain
- [ ] Get Stripe live keys (not test keys)
- [ ] Configure MongoDB production database
- [ ] Set up email service for notifications
- [ ] Enable HTTPS
- [ ] Set up proper logging
- [ ] Configure backups for database
- [ ] Set rate limiting on API
- [ ] Hide `.env` file from repository

---

## 📱 Testing on Different Devices

### Local Network
```bash
# Get your machine IP
ipconfig getifaddr en0  # Mac
ipconfig               # Windows

# Access from another device
http://<YOUR_IP>:3000
```

### Mobile Testing
```bash
# Using ngrok to expose local server
npm install -g ngrok
ngrok http 3000

# Use ngrok URL on mobile
https://xxxx-xxx-xx-xx-x.ngrok.io
```

---

## 📚 Useful Resources

- **Monographdb Docs**: https://docs.mongodb.com
- **Express.js**: https://expressjs.com
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion/
- **Stripe Docs**: https://stripe.com/docs

---

## 🎯 Next Steps

1. **Explore the Home Page**: See all features
2. **Create Test Accounts**: Try different user roles
3. **Add Products**: As a seller
4. **Make a Purchase**: As a customer
5. **View Orders**: From multiple user perspectives
6. **Customize**: Colors, content, features

---

## 💡 Tips & Tricks

- **Hot Reload**: Changes auto-reflect without restart
- **Redux DevTools**: Debug state changes
- **MongoDB Compass**: GUI for database
- **Postman**: Test API endpoints
- **Tailwind Intellisense**: VS Code extension for styling

---

## 🆘 Need Help?

1. Check existing issues in documentation
2. Review error messages carefully
3. Check browser console (F12)
4. Check backend server console
5. Enable debug logging

---

**Happy Coding! 🎉**

*Last Updated: March 2024*
