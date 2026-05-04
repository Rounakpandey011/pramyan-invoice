import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FilePlus2, FileText } from 'lucide-react';
import logo from "../assets/logo.jpeg";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className=" rounded-xl  flex items-center justify-center shadow-soft">
              <img src={logo} alt="Pramyan" className="w-15 h-12" />
            </div>
          </div>

          <nav className="flex gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive ? 'bg-pramyan-700 text-white shadow-soft' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <FilePlus2 size={16} /> <span className="hidden sm:inline">New Invoice</span>
            </NavLink>
            <NavLink
              to="/invoices"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive ? 'bg-pramyan-700 text-white shadow-soft' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              <FileText size={16} /> <span className="hidden sm:inline">All Invoices</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
