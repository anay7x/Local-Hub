const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  approveSeller,
  toggleUserStatus,
  getSalesReport,
  getTopSellers,
} = require('../controllers/adminController');
const { authMiddleware, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware, authorizeRoles('admin'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id/approve', approveSeller);
router.put('/users/:id/status', toggleUserStatus);
router.get('/sales-report', getSalesReport);
router.get('/top-sellers', getTopSellers);

module.exports = router;
