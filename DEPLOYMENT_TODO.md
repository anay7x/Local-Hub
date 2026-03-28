# LocalHub E-commerce Deployment TODO

## Plan Overview
1. **MongoDB Atlas Setup** ✅ Guide provided
2. **Environment Variables** - Create .env files
3. **GitHub Repository** - Init, commit, push
4. **Deploy Backend** - Render.com
5. **Deploy Frontend** - Vercel
6. **Update Configs & Seed Data**
7. **Test Live Site**

## Step 1: MongoDB Atlas (Done - user to create cluster)
- Sign up at https://mongodb.com/atlas
- Create free M0 cluster
- Whitelist IP 0.0.0.0/0 (security later)
- Get connection string: mongodb+srv://<user>:<pass>@cluster...
- DB name: localhub

## Step 2: Environment Files
### backend/.env
```
MONGODB_URI=your_atlas_uri
JWT_SECRET=your_super_secret_key_32chars_min
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

### frontend/.env (for local build)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

## Step 3: Git Setup
```bash
cd ecom
git init
echo "node_modules/
.DS_Store
uploads/
.env
build/
backend/uploads/" > .gitignore
git add .
git commit -m "Initial commit"
git branch -M main
gh repo create localhub-ecom --public --source=. --remote=origin --push
```

## Step 4: Backend Deploy (Render)
1. render.com signup (GitHub)
2. New Web Service → Connect GitHub repo → backend/ folder
3. Build: `npm install`
4. Start: `npm start`
5. Env vars from above
6. Get URL: https://localhub-backend.onrender.com

## Step 5: Frontend Deploy (Vercel)
1. vercel.com signup (GitHub)
2. Import repo → frontend/ root or use overrides
3. Framework: Other
4. Build: `npm run build`
5. Output: `build`
6. Env: REACT_APP_API_URL=backend_url/api
7. Get URL

## Step 6: Post-Deploy
- Update backend CORS FRONTEND_URL
- cd backend && node seed-products.js (update for prod DB)
- Test registration, products, checkout

**Next Action: User create Atlas DB and share MONGODB_URI (privately or placeholder). Confirm git/remote setup.**
