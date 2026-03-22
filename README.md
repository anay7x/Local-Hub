# LocalHub - E-commerce Marketplace for Local Vendors

Welcome to **LocalHub** - A modern, dark-themed e-commerce platform that connects local vendors with customers. Shop from trusted local businesses and support your community!

## 🌟 Features

### For Customers
- ✅ Dark & futuristic UI with smooth animations
- ✅ Browse products from multiple local vendors
- ✅ Advanced filtering and search
- ✅ Secure user authentication
- ✅ Shopping cart management
- ✅ Multiple payment options (Stripe, COD, UPI)
- ✅ Order tracking
- ✅ Product reviews and ratings
- ✅ Responsive design (Mobile, Tablet, Desktop)

### For Sellers
- ✅ Seller dashboard
- ✅ Product management (Add, Edit, Delete)
- ✅ Image upload support
- ✅ Order management
- ✅ Analytics and sales reports
- ✅ Vendor profile management
- ✅ Revenue tracking

### For Admins
- ✅ Admin dashboard
- ✅ User management
- ✅ Seller approval system
- ✅ Sales & revenue reports
- ✅ Top sellers analytics
- ✅ Order oversight

### Featured Vendors
🎴 **Kamla Printers** - Wedding Cards
👟 **Pioneer Shoe Shop** - Footwear
💊 **24/7 Medicine Shop** - Medicine & Healthcare
📱 **Sharma Electronics** - Electronics

## 💳 Payment Integration

### Stripe Payment Processing (Production Ready)
- ✅ **Secure Card Payments**: Process credit/debit cards via Stripe
- ✅ **Test Mode**: Pre-configured with test keys for development
- ✅ **PCI Compliant**: All sensitive data handled by Stripe
- ✅ **Multiple Cards**: Support for Visa, Mastercard, Amex, Discover
- ✅ **3D Secure Ready**: Enhanced security for supported cards

### Active Payment Methods
1. **💳 Stripe** - Credit/Debit Card (Fully Integrated)
2. **📦 Cash on Delivery** - Pay when order arrives
3. **📱 UPI** - Coming Soon!

### Test Payment Flow
```
1. Add product to cart
2. Go to checkout
3. Select "Credit/Debit Card"
4. Use test card: 4242 4242 4242 4242
5. Any future date for expiry
6. Any 3 digits for CVC
7. Payment processes instantly
8. Order confirmed!
```

### Test Card Numbers
| Type | Card Number | Status |
|------|------------|--------|
| Success | 4242 4242 4242 4242 | ✅ Approved |
| Declined | 4000 0000 0000 0002 | ❌ Declined |
| 3D Secure | 4000 0025 0000 3155 | 🔐 Requires Auth |

### Production Deployment
When deploying to production:
1. Create Stripe account at https://stripe.com
2. Get live API keys (pk_live_*, sk_live_*)
3. Replace test keys in environment files
4. Enable HTTPS
5. Configure webhook handlers for payment events

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Payment**: Stripe API
- **File Upload**: Multer
- **Email**: Nodemailer

### Frontend
- **UI Framework**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: React Icons, Lucide React
- **Notifications**: React Hot Toast
- **Payment Integration**: @stripe/react-stripe-js
- **Routing**: React Router v6

## 📁 Project Structure

```
ecom/
├── backend/
│   ├── models/           # MongoDB schemas
│   ├── controllers/       # Business logic
│   ├── routes/           # API endpoints
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── uploads/          # User uploaded files
│   ├── server.js         # Main server file
│   ├── package.json      # Dependencies
│   └── .env.example      # Environment variables template
│
├── frontend/
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # Reusable components
│   │   ├── store/        # Zustand stores
│   │   ├── services/     # API services
│   │   ├── styles/       # Global styles
│   │   ├── utils/        # Utility functions
│   │   ├── App.js        # Main app
│   │   └── index.js      # React entry point
│   ├── public/           # Static files
│   ├── package.json      # Dependencies
│   └── tailwind.config.js
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or MongoDB Atlas)
- npm or yarn
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Update .env with your details**
```env
MONGODB_URI=mongodb://localhost:27017/localhub
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Stripe Keys
STRIPE_PUBLIC_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key

# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

5. **Start the backend server**
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

4. **Start the development server**
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (Seller)
- `PUT /api/products/:id` - Update product (Seller)
- `DELETE /api/products/:id` - Delete product (Seller)
- `POST /api/products/:id/review` - Add review

### Cart
- `POST /api/cart/add` - Add to cart
- `GET /api/cart` - Get cart
- `DELETE /api/cart/:productId` - Remove from cart
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin/Seller)
- `PUT /api/orders/:id/cancel` - Cancel order (Customer)

### Payments
- `POST /api/payment/payment-intent` - Create Stripe payment intent
- `POST /api/payment/confirm` - Confirm payment
- `GET /api/payment/methods` - Get payment methods

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/approve` - Approve seller
- `PUT /api/admin/users/:id/status` - Toggle user status
- `GET /api/admin/sales-report` - Sales report
- `GET /api/admin/top-sellers` - Top sellers

## 🔐 Authentication & Authorization

The application uses JWT (JSON Web Tokens) for authentication:

- **Customer**: Can browse, search, purchase products, leave reviews
- **Seller**: Can add/edit products, manage inventory, view orders
- **Admin**: Can manage users, approve sellers, view analytics

## 🎨 UI/UX Features

- **Dark Futuristic Theme**: Slate and gradient colors
- **Smooth Animations**: Framer Motion effects on all interactions
- **Responsive Design**: Mobile-first approach
- **Glassmorphism**: Modern glass-effect cards
- **Gradient Text**: Eye-catching headings
- **Floating Elements**: Interactive animations
- **Glow Effects**: Cyan and purple neon effects

## 💳 Payment Integration

### Stripe
- Secure card payments
- PCI compliance
- Real-time payment processing

### Alternative Methods (In development)
- Cash on Delivery (COD)
- UPI payments

## 📊 Database Schema Overview

### User Model
- name, email, password (hashed)
- phone, address
- role (customer/seller/admin)
- shop details (for sellers)
- ratings, totalOrders, totalRevenue

### Product Model
- name, description, price
- category, stock
- seller reference
- images, specifications
- ratings, reviews

### Order Model
- user reference
- orderItems (products with quantities)
- shippingAddress
- paymentInfo
- orderStatus, paymentStatus
- totalPrice, shipping, tax

### Cart Model
- user reference
- cartItems (products with quantities)
- totalPrice

## 🧪 Testing

Test accounts are provided:

### Customer Account
- Email: `customer@test.com`
- Password: `password123`

### Seller Account
- Email: `seller@test.com`
- Password: `password123`

### Admin Account
- Email: `admin@test.com`
- Password: `password123`

## 🚨 Common Issues & Solutions

### MongoDB Connection Error
```
Fix: Ensure MongoDB is running and MONGODB_URI is correct
```

### CORS Error
```
Fix: Update FRONTEND_URL in backend .env
```

### JWT Token Error
```
Fix: Change JWT_SECRET in .env and clear browser storage
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔄 Future Enhancements

- ✅ Email notifications
- ✅ Product recommendations
- ✅ Wish list feature
- ✅ Advanced analytics
- ✅ Real-time notifications
- ✅ Inventory management
- ✅ Multi-currency support
- ✅ Social login
- ✅ User reviews photos
- ✅ Cart abandonment emails

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@localhub.com or open an issue on GitHub.

## 👨‍💻 Developer

Created with ❤️ for local vendors and their customers.

---

**Happy Shopping! Support Local! 🛍️**
