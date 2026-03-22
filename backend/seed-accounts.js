/**
 * Seed test accounts into MongoDB
 * Run: node backend/seed-accounts.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import User model
const User = require('./models/User');

const seedAccounts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/localhub');
    console.log('✅ Connected to MongoDB');

    // Test accounts to create
    const testAccounts = [
      {
        name: 'Admin User',
        email: 'admin@localhub.com',
        password: 'password123',
        phone: '1111111111',
        role: 'admin',
      },
      {
        name: 'Seller User',
        email: 'seller@localhub.com',
        password: 'password123',
        phone: '2222222222',
        role: 'seller',
        shopName: 'Test Shop',
        category: 'Electronics',
      },
      {
        name: 'Kamla Printers',
        email: 'kamla@localhub.com',
        password: 'password123',
        phone: '3333333333',
        role: 'seller',
        shopName: 'Kamla Printers',
        category: 'Wedding Cards',
      },
      {
        name: 'Pioneer Shoes',
        email: 'pioneer@localhub.com',
        password: 'password123',
        phone: '5555555555',
        role: 'seller',
        shopName: 'Pioneer Shoes',
        category: 'Footwear',
      },
      {
        name: '24/7 Medicine',
        email: 'medicine@localhub.com',
        password: 'password123',
        phone: '6666666666',
        role: 'seller',
        shopName: '24/7 Medicine',
        category: 'Medicine',
      },
      {
        name: 'Sharma Electronics',
        email: 'sharma@localhub.com',
        password: 'password123',
        phone: '7777777777',
        role: 'seller',
        shopName: 'Sharma Electronics',
        category: 'Electronics',
      },
      {
        name: 'Customer User',
        email: 'customer@localhub.com',
        password: 'password123',
        phone: '4444444444',
        role: 'customer',
      },
    ];

    // Clear existing test accounts
    await User.deleteMany({
      email: { $in: testAccounts.map(acc => acc.email) }
    });
    console.log('🗑️  Cleared existing test accounts');

    // Hash passwords and create accounts
    for (const account of testAccounts) {
      const user = new User(account);
      await user.save();
      console.log(`✅ Created ${account.role}: ${account.email}`);
    }

    console.log('\n🎉 All test accounts created successfully!\n');
    console.log('Test Credentials:');
    console.log('─────────────────────────────────────────');
    testAccounts.forEach(acc => {
      console.log(`${acc.role.toUpperCase().padEnd(10)} | ${acc.email.padEnd(25)} | password123`);
    });
    console.log('─────────────────────────────────────────\n');

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding accounts:', error.message);
    process.exit(1);
  }
};

seedAccounts();
