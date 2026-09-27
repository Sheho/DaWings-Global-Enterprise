import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, KeyRound, Mail, Eye, EyeOff, Loader2, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MagneticButton from '../components/ui/MagneticButton';
import { loginDesignerAPI } from '../services/api';
import { TEST_DESIGNER_ACCOUNT } from '../data/mockDesigner';

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check test account or API
      if (
        (emailOrUsername.toLowerCase() === TEST_DESIGNER_ACCOUNT.email.toLowerCase() ||
          emailOrUsername.toLowerCase() === TEST_DESIGNER_ACCOUNT.username.toLowerCase()) &&
        password === TEST_DESIGNER_ACCOUNT.password
      ) {
        localStorage.setItem('dawings_user', JSON.stringify(TEST_DESIGNER_ACCOUNT));
        localStorage.setItem('dawings_token', 'mock_jwt_token_designer_001');
        setTimeout(() => {
          setLoading(false);
          navigate('/dashboard');
        }, 600);
        return;
      }

      // API Call
      const res = await loginDesignerAPI({ emailOrUsername, password });
      if (res.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Invalid login credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fillTestAccount = () => {
    setEmailOrUsername(TEST_DESIGNER_ACCOUNT.email);
    setPassword(TEST_DESIGNER_ACCOUNT.password);
    setError('');
  };

  const inputClass =
    'w-full bg-white dark:bg-black/50 border border-gray-300 dark:border-white/10 rounded-xl px-4 py-3.5 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#C49A45] font-medium transition-all';
  const labelClass = 'block text-gray-700 dark:text-white text-xs font-bold uppercase tracking-widest mb-2';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFFDF8] via-[#FAF6EE] to-[#F5EFE4] dark:from-[#050505] dark:via-[#080808] dark:to-[#050505] flex flex-col font-sans selection:bg-[#C49A45] selection:text-white text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-grow relative flex items-center justify-center py-20 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#C49A45]/15 dark:bg-[#C49A45]/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-md w-full mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/90 dark:bg-white/5 border border-amber-900/10 dark:border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-2xl shadow-xl relative overflow-hidden"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-[#C49A45]/10 border border-[#C49A45]/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-[#C49A45]">
                <KeyRound className="w-7 h-7" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                DESIGNER <span className="text-[#C49A45] italic">LOGIN</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed">
                Log in to access your designer portal, upload new embroidery files, and track your sales.
              </p>
            </div>

            {/* Quick Test Account Banner */}
            <div className="mb-6 p-4 bg-[#C49A45]/10 border border-[#C49A45]/30 rounded-2xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C49A45] flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> Demo Test Account
                </span>
                <button
                  type="button"
                  onClick={fillTestAccount}
                  className="text-[11px] font-bold text-black bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-3 py-1 rounded-lg transition-colors uppercase tracking-wider"
                >
                  Use Test Login
                </button>
              </div>
              <div className="text-[11px] text-gray-700 dark:text-gray-300 font-mono space-y-0.5">
                <div>Email: <span className="text-gray-900 dark:text-white font-bold">{TEST_DESIGNER_ACCOUNT.email}</span></div>
                <div>Pass: <span className="text-gray-900 dark:text-white font-bold">{TEST_DESIGNER_ACCOUNT.password}</span></div>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 dark:text-red-400 text-xs font-semibold uppercase tracking-wider">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className={labelClass}>Email or Username</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder="designer@dawings.com or username"
                    className={inputClass}
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-[52px] bg-[#C49A45] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(196,154,69,0.3)] disabled:opacity-50"
              >
                {loading ? (
                  <>
                    Logging In... <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Log In to Dashboard <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Register Link */}
            <div className="mt-8 text-center pt-6 border-t border-gray-200 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400">
              Don't have a designer account yet?{' '}
              <Link to="/register" className="text-[#C49A45] font-bold hover:underline">
                Register as a Designer
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LoginPage;
