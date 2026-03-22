import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUsers, FiCheck, FiX, FiDollarSign, FiPackage } from 'react-icons/fi';
import Layout from '../components/Layout';
import { useAuthStore } from '../store';
import { adminAPI } from '../services/api';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const statsRes = await adminAPI.getDashboardStats();
      setStats(statsRes.data.stats);

      const usersRes = await adminAPI.getAllUsers();
      setUsers(usersRes.data.users);

      const sellersRes = await adminAPI.getTopSellers();
      setSellers(sellersRes.data.sellers);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveSeller = async (userId) => {
    try {
      await adminAPI.approveSeller(userId);
      toast.success('Seller approved successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to approve seller');
    }
  };

  const handleToggleUserStatus = async (userId, isActive) => {
    try {
      await adminAPI.toggleUserStatus(userId, { isActive: !isActive });
      toast.success(`User ${!isActive ? 'activated' : 'blocked'} successfully`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update user status');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Layout>
      <div className="min-h-screen pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
              <p className="text-slate-400">Platform Management & Analytics</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/40 transition-colors"
            >
              Logout
            </motion.button>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-4 mb-8 border-b border-slate-700 overflow-x-auto"
          >
            {[
              { id: 'stats', label: 'Dashboard' },
              { id: 'users', label: 'Users Management' },
              { id: 'sellers', label: 'Top Sellers' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-all duration-300 border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              variants={containerVariants}
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12"
              >
                {[
                  {
                    icon: FiUsers,
                    label: 'Total Users',
                    value: stats.totalUsers || 0,
                    color: 'cyan',
                  },
                  {
                    icon: FiUsers,
                    label: 'Customers',
                    value: stats.totalCustomers || 0,
                    color: 'blue',
                  },
                  {
                    icon: FiPackage,
                    label: 'Sellers',
                    value: stats.totalSellers || 0,
                    color: 'purple',
                  },
                  {
                    icon: FiPackage,
                    label: 'Total Products',
                    value: stats.totalProducts || 0,
                    color: 'green',
                  },
                  {
                    icon: FiDollarSign,
                    label: 'Total Revenue',
                    value: `₹${stats.totalRevenue || 0}`,
                    color: 'pink',
                  },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className="card-glass p-6 text-center"
                    >
                      <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center mb-4 mx-auto`}>
                        <Icon className={`text-${stat.color}-400`} size={24} />
                      </div>
                      <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="card-glass p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Order Statistics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Total Orders</span>
                      <span className="text-2xl font-bold text-cyan-400">{stats.totalOrders || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Orders This Month</span>
                      <span className="text-2xl font-bold text-purple-400">{stats.ordersThisMonth || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="card-glass p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Platform Health</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300">System Status</span>
                        <span className="text-emerald-400 font-semibold">Operational</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-lg h-2">
                        <div className="bg-emerald-500 h-2 rounded-lg w-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Users Management Tab */}
          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Manage Users</h2>
              {loading ? (
                <p className="text-slate-400">Loading...</p>
              ) : users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-slate-700">
                      <tr className="text-slate-400 text-sm">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Email</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((userItem) => (
                        <motion.tr
                          key={userItem._id}
                          whileHover={{ backgroundColor: 'rgba(30, 41, 59, 0.5)' }}
                          className="border-b border-slate-700 transition-colors"
                        >
                          <td className="py-4 px-4 text-white">{userItem.name}</td>
                          <td className="py-4 px-4 text-slate-400 text-sm">{userItem.email}</td>
                          <td className="py-4 px-4">
                            <span className={`badge ${
                              userItem.role === 'seller' ? 'badge-info' :
                              userItem.role === 'admin' ? 'badge-warning' :
                              'badge-success'
                            }`}>
                              {userItem.role}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`badge ${userItem.isActive ? 'badge-success' : 'badge-danger'}`}>
                              {userItem.isActive ? 'Active' : 'Blocked'}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              {userItem.role === 'seller' && !userItem.isVerified && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  onClick={() => handleApproveSeller(userItem._id)}
                                  className="p-2 bg-emerald-500/20 text-emerald-400 rounded hover:bg-emerald-500/40"
                                >
                                  <FiCheck size={16} />
                                </motion.button>
                              )}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                onClick={() => handleToggleUserStatus(userItem._id, userItem.isActive)}
                                className={`p-2 rounded ${
                                  userItem.isActive
                                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/40'
                                    : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40'
                                }`}
                              >
                                {userItem.isActive ? <FiX size={16} /> : <FiCheck size={16} />}
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-slate-400">No users found</p>
              )}
            </motion.div>
          )}

          {/* Top Sellers Tab */}
          {activeTab === 'sellers' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Top Sellers</h2>
              {loading ? (
                <p className="text-slate-400">Loading...</p>
              ) : sellers.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {sellers.map((seller) => (
                    <motion.div
                      key={seller._id}
                      variants={itemVariants}
                      className="card-glass p-6"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">
                          {seller.shopName?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{seller.shopName}</p>
                          <p className="text-sm text-slate-400">{seller.category}</p>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t border-slate-700">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Orders</span>
                          <span className="font-semibold text-cyan-400">{seller.totalOrders}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Revenue</span>
                          <span className="font-semibold text-green-400">₹{seller.totalRevenue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Rating</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="font-semibold text-white">{seller.ratings}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <p className="text-slate-400">No sellers found</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
