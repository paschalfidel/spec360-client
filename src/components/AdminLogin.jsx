// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/admin/products');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-[#080808] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto"
      >
        <div className="text-center mb-10">
          <div className="font-display font-bold text-white text-2xl tracking-tight mb-2">
            Spec<span className="text-accent">360</span>
          </div>
          <h1 className="font-display font-bold text-white text-3xl tracking-tight">Admin Portal</h1>
          <p className="font-body text-[#6e6e73] text-[15px] mt-2">Sign in to manage your store</p>
        </div>

        <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-[#6e6e73] text-[12px] uppercase tracking-wider block mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a3a3a]" strokeWidth={1.5} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-11"
                  placeholder="admin@spec360.com.ng"
                  required
                />
              </div>
            </div>
            <div>
              <label className="font-body text-[#6e6e73] text-[12px] uppercase tracking-wider block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a3a3a]" strokeWidth={1.5} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-11"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-body text-red-400 text-[14px] bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 group disabled:opacity-50 mt-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default AdminLogin;
